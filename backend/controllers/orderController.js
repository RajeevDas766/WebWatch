import Order from "../models/orderModel.js";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

/* =========================================================
   CREATE ORDER
========================================================= */
export const createOrder = async (req, res, next) => {
  try {
    const { name, email, phoneNumber, address, notes, paymentMethod } = req.body;
    let { items } = req.body;

    if (!name || !email || !phoneNumber || !address) {
      return res.status(400).json({
        success: false,
        message: "Name, email, mobile and address are required.",
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order items are required",
      });
    }

    const normalizedItems = items.map((it) => ({
      productId: String(it.productId ?? it.id ?? it._id ?? ""),
      name: String(it.name ?? ""),
      img: it.img ?? null,
      price: Number(it.price ?? 0),
      qty: Number(it.qty ?? it.quantity ?? 1),
      description: it.description ?? "",
    }));

    const subtotal = normalizedItems.reduce(
      (sum, it) => sum + it.price * it.qty,
      0
    );

    const taxRate = 0.08;
    const taxAmount = Number((subtotal * taxRate).toFixed(2));
    const shippingCharge = 0;
    const finalAmount = Number((subtotal + taxAmount).toFixed(2));

    const orderId = `ORD-${uuidv4()}`;

    const orderPayload = {
      orderId,
      user: req.user?._id,
      name,
      email,
      phoneNumber,
      address,
      items: normalizedItems,
      shippingCharge,
      totalAmount: subtotal,
      taxAmount,
      finalAmount,
      paymentMethod: paymentMethod === "Cash on Delivery"
        ? "Cash on Delivery"
        : "Online",
      paymentStatus: "Unpaid",
      orderStatus: "Pending",
      notes,
    };

    /* ===== ONLINE PAYMENT (STRIPE) ===== */
    if (orderPayload.paymentMethod === "Online") {
      const line_items = normalizedItems.map((it) => ({
        price_data: {
          currency: "inr",
          product_data: { name: it.name },
          unit_amount: Math.round(it.price * 100),
        },
        quantity: it.qty,
      }));

      if (taxAmount > 0) {
        line_items.push({
          price_data: {
            currency: "inr",
            product_data: { name: "Tax (8%)" },
            unit_amount: Math.round(taxAmount * 100),
          },
          quantity: 1,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items,
        customer_email: email,
        success_url: `${process.env.FRONTEND_URL}orders/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}orders/cancel`,
        metadata: { orderId },
      });

      const order = await Order.create({
        ...orderPayload,
        sessionId: session.id,
        paymentIntentId: session.payment_intent,
      });

      return res.status(201).json({
        success: true,
        order,
        checkoutUrl: session.url,
      });
    }

    /* ===== CASH ON DELIVERY ===== */
    const order = await Order.create(orderPayload);

    return res.status(201).json({
      success: true,
      order,
      checkoutUrl: null,
    });
  } catch (err) {
    next(err);
  }
};

/* =========================================================
   CONFIRM STRIPE PAYMENT
========================================================= */
export const confirmPayment = async (req, res, next) => {
  try {
    const { session_id } = req.query;

    if (!session_id) {
      return res.status(400).json({
        success: false,
        message: "Session ID missing",
      });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return res.status(400).json({
        success: false,
        message: "Payment not completed",
      });
    }

    const order = await Order.findOneAndUpdate(
      { sessionId: session_id },
      {
        paymentStatus: "Paid",
        paymentIntentId: session.payment_intent,
        orderStatus: "Confirmed",
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.json({ success: true, order });
  } catch (err) {
    next(err);
  }
};

/* =========================================================
   GET ALL ORDERS (ADMIN)
========================================================= */
export const getOrders = async (req, res, next) => {
  try {
    const { search = "", status } = req.query;
    const filter = {};

    if (status) filter.orderStatus = status;

    if (search) {
      const regex = new RegExp(search, "i");
      filter.$or = [
        { orderId: regex },
        { name: regex },
        { email: regex },
        { "items.name": regex },
      ];
    }

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    return res.json({
      success: true,
      orders,
    });
  } catch (err) {
    next(err);
  }
};

/* =========================================================
   GET USER ORDERS
========================================================= */
export const getUserOrders = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    return res.json({
      success: true,
      orders,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* =========================================================
   UPDATE ORDER STATUS (ADMIN)
========================================================= */
export const updateOrder = async (req, res, next) => {
  try {
    const { orderStatus } = req.body;

    if (!orderStatus) {
      return res.status(400).json({
        success: false,
        message: "OrderStatus is required",
      });
    }

    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.json({ success: true, order: updated });
  } catch (err) {
    next(err);
  }
};

/* =========================================================
   DELETE ORDER (ADMIN)
========================================================= */
export const deleteOrder = async (req, res, next) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
