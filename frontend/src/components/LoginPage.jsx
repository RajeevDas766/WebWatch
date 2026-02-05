import React, { useState } from "react";
import { loginPageStyles } from "../assets/dummyStyles";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ArrowLeft, EyeOff, Eye, Lock, User } from "lucide-react";
import axios from "axios";
import { useCart } from "../CartContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const { loadCart } = useCart();

  const API_BASE = "http://localhost:4000";

  // to submit the data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!email || !password) {
      toast.error("Please fill in all fields.", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
      return;
    }

    if (!rememberMe) {
      toast.error("You must agree to remember me.", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
      return;
    }

    setSubmitting(true);

    try {
      const resp = await axios.post(
        `${API_BASE}/api/auth/login`,
        {
          email: email.trim().toLowerCase(),
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      const data = resp.data;
      console.log(data);

      if (data && data.token) {
        if (rememberMe) {
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("user", JSON.stringify(data.user ?? {}));
          localStorage.setItem("isLoggedIn", "true");
        } else {
          sessionStorage.setItem("authToken", data.token);
          sessionStorage.setItem("user", JSON.stringify(data.user ?? {}));
          sessionStorage.setItem("isLoggedIn", "true");
        }
        try {
          window.dispatchEvent(
            new CustomEvent("authChanged", { detail: { loggedIn: true } }),
          );
        } catch (err) {
          // ignore
        }
        // Show success toast
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 1200,
          theme: "light",
        });

        // Redirect to home after short delay so user sees the toast
        setTimeout(() => {
          navigate("/");
        }, 1250);
      } else {
              toast.error(data.message || "Unexpected error from server", {
                position: "top-right",
                autoClose: 4000,
                theme: "light",
              });
            }
    } catch (err) {
      const serverMsg = err?.response?.data?.message;
      const status = err?.response?.status;

      if (status === 401) {
        toast.error(serverMsg || "Invalid email or password.", {
          position: "top-right",
          autoClose: 4000,
          theme: "light",
        });
      } else if (status === 409) {
        toast.error(serverMsg || "Conflict: user exists.", {
          position: "top-right",
          autoClose: 4000,
          theme: "light",
        });
      } else if (serverMsg) {
        toast.error(serverMsg, {
          position: "top-right",
          autoClose: 4000,
          theme: "light",
        });
      } else {
        toast.error("Server error. Please try again later.", {
          position: "top-right",
          autoClose: 4000,
          theme: "light",
        });
      }
      console.error("Login error:", err?.response ?? err);
    } finally{
      setSubmitting(false);
    }
  };

  return (
    <div
      className={loginPageStyles.pageContainer}
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      <ToastContainer />

      <div className={loginPageStyles.mainContent}>
        <button
          onClick={() => navigate("/")}
          className={loginPageStyles.backButton}
        >
          <ArrowLeft className="h-5 w-5 text-gray-800" />
          <span className={loginPageStyles.backButtonText}>Back To Home</span>
        </button>

        <div className={loginPageStyles.loginCard}>
          <div className={loginPageStyles.decorativeTopLeft}></div>
          <div className={loginPageStyles.decorativeBottomRight}></div>

          <h2 className={loginPageStyles.cardTitle}>Welcome Back</h2>
          <p className={loginPageStyles.cardSubtitle}>
            Sign in to your account
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className={loginPageStyles.formField}>
              <label className={loginPageStyles.formLabel}>Email</label>
              <div className={loginPageStyles.inputContainer}>
                <div className={loginPageStyles.inputIconContainer}>
                  <User className={loginPageStyles.inputIcon} />
                </div>
                <input
                  type="email"
                  className={loginPageStyles.inputBase}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                disabled={submitting}

                />
              </div>
            </div>

            {/* Password */}
            <div className={loginPageStyles.formField}>
              <label className={loginPageStyles.formLabel}>Password</label>
              <div className={loginPageStyles.inputContainer}>
                <div className={loginPageStyles.inputIconContainer}>
                  <Lock className={loginPageStyles.inputIcon} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={loginPageStyles.passwordInputBase}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                disabled={submitting}

                />
                <button
                  type="button"
                  className={loginPageStyles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                disabled={submitting}

                >
                  {showPassword ? (
                    <EyeOff className={loginPageStyles.inputIcon} />
                  ) : (
                    <Eye className={loginPageStyles.inputIcon} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className={loginPageStyles.rememberMeContainer}>
              <input
                type="checkbox"
                id="rememberMe"
                className={loginPageStyles.checkbox}
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={submitting}

              />
              <label
                htmlFor="rememberMe"
                className={loginPageStyles.checkboxLabel}
              >
                Remember Me{" "}
                <span className={loginPageStyles.requiredStar}>*</span>
              </label>
            </div>

            <button type="submit" className={`${loginPageStyles.submitButton} ${submitting ? loginPageStyles.submitButtonDisabled : ""}`} disabled={submitting}>
              {submitting ? "Signing in.." : "Login"}
            </button>

            <div className={loginPageStyles.signupContainer}>
              <span className={loginPageStyles.signupText}>
                Don't have an account?{" "}
              </span>
              <a href="/signup" className={loginPageStyles.signupLink}>
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
