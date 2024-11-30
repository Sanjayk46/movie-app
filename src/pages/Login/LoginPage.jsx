import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/UserContext"; 
import "react-toastify/dist/ReactToastify.css"; 
import { useTheme } from "../../context/useThemeContext";

export default function LoginPage() {
  const { user, login } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const returnUrl = params.get("returnUrl");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      returnUrl ? navigate(returnUrl) : navigate("/");
    }
  }, [user, returnUrl, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
      await login(email, password); // Call login API
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className={`login-container ${theme}`}>
      <div className="login-box">
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
        <p className="sign-up-text">
          New to Netflix?{" "}
          <Link className={`sign-up-link ${theme}`} to="/register">
            Sign up now.
          </Link>
        </p>
      </div>
    </div>
  );
}
