# ⌚ WebWatch - Premium Watch E-commerce Platform

A modern, responsive e-commerce platform for luxury watches built with React, Node.js, and MongoDB.

## 🚀 Live Demo

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://your-app-url.vercel.app)
[![Backend on Render](https://img.shields.io/badge/Backend-Render-000000?style=for-the-badge&logo=render)](https://your-backend-url.onrender.com)

## 📱 Features

### 🛍️ **Shopping Experience**
- **Product Catalog** - Browse luxury watches with detailed descriptions
- **Shopping Cart** - Add/remove items with real-time updates
- **User Authentication** - Secure login/signup with JWT
- **Order Management** - Track and manage orders
- **Responsive Design** - Perfect on mobile, tablet, and desktop

### 🎨 **UI/UX Features**
- **Modern Design** - Clean, minimalist interface
- **Smooth Animations** - Hover effects and transitions
- **Interactive Navigation** - Mobile-friendly hamburger menu
- **Contact Form** - Get in touch for custom orders
- **Toast Notifications** - User-friendly feedback

### 🔧 **Technical Features**
- **Real-time Cart** - Context-based state management
- **Protected Routes** - Authentication guards
- **API Integration** - RESTful backend communication
- **Database Management** - MongoDB with Mongoose
- **File Uploads** - Product image handling

## 🛠️ Tech Stack

### **Frontend**
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icons
- **React Toastify** - Notification system

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Multer** - File upload handling

### **Infrastructure**
- **Vercel** - Frontend hosting
- **Render** - Backend hosting
- **MongoDB Atlas** - Cloud database
- **Git/GitHub** - Version control

## 📁 Project Structure

```
WATCH_RAJ/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── assets/         # Styles and images
│   │   └── App.jsx         # Main app component
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Node.js backend
│   ├── controllers/         # Route handlers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middlewares/       # Custom middleware
│   ├── config/           # Database configuration
│   ├── uploads/          # File uploads
│   └── server.js         # Express server
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RajeevDas766/WebWatch.git
   cd WebWatch
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Set up environment variables**
   
   **Frontend (.env):**
   ```env
   VITE_API_BASE_URL=http://localhost:4000
   VITE_APP_NAME=WebWatch
   ```
   
   **Backend (.env):**
   ```env
   MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/database
   JWT_SECRET=your-secret-key
   STRIPE_SECRET_KEY=sk_test_...
   FRONTEND_URL=http://localhost:5173
   ```

5. **Start the application**
   
   **Backend:**
   ```bash
   cd backend
   npm start
   ```
   
   **Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000

## 🌐 Deployment

### Frontend (Vercel)
1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login and Deploy**
   ```bash
   cd frontend
   vercel login
   vercel --prod
   ```

3. **Set Environment Variables**
   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Add: `VITE_API_BASE_URL=https://your-backend.onrender.com`

### Backend (Render)
1. **Connect GitHub Repository**
   - Go to Render Dashboard → New → Web Service
   - Connect your GitHub repository
   - Set build command: `npm install`
   - Set start command: `npm start`

2. **Set Environment Variables**
   - Add MongoDB URL, JWT secret, and other backend variables

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/watches` - Get all watches
- `GET /api/watches/:id` - Get specific watch
- `POST /api/watches` - Add new watch (admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `DELETE /api/cart/:id` - Remove item from cart

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order

## 🎨 Customization

### Styling
- **Tailwind CSS** - Utility classes in components
- **dummyStyles.js** - Centralized style definitions
- **Responsive Design** - Mobile-first approach

### Components
- **Modular Architecture** - Reusable components
- **Context API** - State management
- **Custom Hooks** - Logic separation

## 🔧 Development

### Scripts
```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Backend
npm start           # Start production server
npm run dev         # Start with nodemon
```

### Linting
```bash
npm run lint         # Check code quality
npm run lint:fix    # Fix linting issues
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide Icons** - For the beautiful icon set
- **MongoDB Atlas** - For the generous free tier

## 📞 Contact

**Developer:** Rajeev Das  
**Email:** rajeevdas766@example.com  
**GitHub:** [@RajeevDas766](https://github.com/RajeevDas766)

---

⭐ **Star this repository if it helped you!**

🚀 **Happy Coding!**
