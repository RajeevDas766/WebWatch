import React, { useEffect, useState } from "react";
import { navbarStyles } from "./../assets/dummyStyles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BaggageClaim, Clock,Menu,User, X } from "lucide-react";
import { useCart } from "../CartContext";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Watches", href: "/watches" },
  { name: "Contact", href: "/contact" },
  { name: "My Orders", href: "/my-orders" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  // const navigation = useNavigate();
  const navigate = useNavigate();

  const [active, setActive] = useState(location.pathname || "/");

  const { totalItems, clearCart, reloadCart } = useCart();
  const [loggedIn, setLoggedIn] = useState(() => {
    try {
      return (
        localStorage.getItem("isLoggedIn") === "true" ||
        !!localStorage.getItem("authToken")
      );
    } catch {
      return false;
    }
  });

  useEffect(() => {
    setActive(location.pathname || "/");
  }, [location]);

  // to keep user logged in for all the pages

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "isLoggedIn" || e.key === "authToken") {
        try {
          const isNowLoggedIn =
            localStorage.getItem("isLoggedIn") === "true" ||
            !!localStorage.getItem("authToken");
          isNowLoggedIn(isNowLoggedIn);
        } catch {
          setLoggedIn(false);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleNavClick = (href) => {
    setActive(href);
    setOpen(false);
  };

  useEffect(()=>{
    try{
      reloadCart();
    }catch(e){
      // ignore
    }
  },[loggedIn]);

  // to logout
  const handleLogout = () => {
    try {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
      localStorage.removeItem("cartItems");
    } catch(e){}

    try {
      clearCart && clearCart();
    } catch (error) {
      // ignore
    }
      setLoggedIn(false);
      setOpen(false);
      navigate("/");
  };
  return (
    <header className={navbarStyles.header}>
      <nav className={navbarStyles.nav} role="navigation">
        <div className={navbarStyles.navContent}>
          <div className={navbarStyles.brandContainer}>
            <div className={navbarStyles.logoContainer}>
              <Clock className={navbarStyles.logoIcon} />
            </div>
            <Link
              to="/"
              onClick={() => handleNavClick("/")}
              className={navbarStyles.logoLink}
            >
              <span
                style={navbarStyles.logoTextStyle}
                className={navbarStyles.logoText}
              >
               WebWatch
              </span>
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className={navbarStyles.desktopNav}>
            {navItems.map((item) => {
              const isActive = active === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`${navbarStyles.navItemBase} ${
                    isActive
                      ? navbarStyles.navItemActive
                      : navbarStyles.navItemInactive
                  }`}
                >
                  <span>{item.name}</span>
                  <span
                    className={`${navbarStyles.activeIndicator} ${
                      isActive
                        ? navbarStyles.activeIndicatorVisible
                        : navbarStyles.activeIndicatorHidden
                    }`}
                  ></span>
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className={navbarStyles.rightActions}>
            <Link to="/cart" className={navbarStyles.cartLink}>
              <BaggageClaim className={navbarStyles.cartIcon} />
              {totalItems > 0 && (
                <span className={navbarStyles.cartBadge}>{totalItems}</span>
              )}
            </Link>

            {/* mobile-only account icon */}
            <div className="md:hidden flex items-center ml-2">
              {!loggedIn ? (
                <Link to="/login" className={navbarStyles.mobileAccountLink} aria-label="account">
                  <User className={navbarStyles.accountIcon} />
                </Link>
              ) : (
                <button onClick={handleLogout} className={navbarStyles.mobileAccountLink} aria-label="logout">
                  <User className={navbarStyles.accountIcon} />
                </button>
              )}
            </div>

            {!loggedIn ? (
              <Link to="/login" className={navbarStyles.accountLink}>
                <User className={navbarStyles.accountIcon} />
                <span className={navbarStyles.accountText}>Account</span>
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className={navbarStyles.accountLink}
              >
                <User className={navbarStyles.accountIcon} />
                <span className={navbarStyles.accountText}>Logout</span>
              </button>
            )}

            {/* mobile toggle */}
            <div className={navbarStyles.mobileMenuButton}>
              <button onClick={()=> setOpen(!open)}
                className={navbarStyles.menuButton}
                >
                  {open ? (
                    <X className={navbarStyles.menuIcon} />
                  ) : (
                    <Menu className={navbarStyles.menuIcon} />
                  )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        {open && (
          <div className={navbarStyles.mobileNav}>
            {navItems.map((item) => {
              const isActive = active === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`${navbarStyles.navItemBase} ${
                    isActive
                      ? navbarStyles.navItemActive
                      : navbarStyles.navItemInactive
                  }`}
                >
                  <span className={navbarStyles.mobileNavItemText}>{item.name}</span>
                </Link>
              );
            })}
            <div className={navbarStyles.mobileIconsContainer}>
              {!loggedIn ? (
                <Link to='/login' onClick={()=>{
                  setOpen(false);
                  handleNavClick('/login')
                }} className={navbarStyles.mobileAccountLink}>

                  <User className={navbarStyles.accountIcon} />
                  <span>Account</span>
                </Link>
              ):(
                <button
                onClick={handleLogout}
                className={navbarStyles.mobileAccountButton}>

                  <User className={navbarStyles.mobileAccountIcon} />
                  <span>Logout</span>
                </button>
              )}
            </div>



          </div>
        )}  
      </nav>
    </header>
  );
};

export default Navbar;