import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/UserContext"; // Import useAuth to access AuthContext
import { toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

export default function LoginPage() {
  const auth = useAuth(); // Access login function and user from AuthContext
  const {user} = auth;
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const returnUrl = params.get("returnUrl");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      // Redirect user after successful login
      returnUrl ? navigate(returnUrl) : navigate("/");
    }
  }, [user, returnUrl, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning("Please fill in all fields.");
      return;
    }

    try {
      await user.login(email, password); // Call the login function from AuthContext
      toast.success("Logged in successfully!");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error.response?.data || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
        <p className="sign-up-text">
          New to Netflix?{" "}
          <Link to="/register">
            Sign up now.
          </Link>
        </p>
      </div>
    </div>
  );
}
