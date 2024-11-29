import React, { useState,useEffect } from "react";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UserContext"; // Import useAuth to access AuthContext
import { toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

export default function LoginPage() {
  const { user, login } = useAuth(); // Access login function from AuthContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    returnUrl ? navigate(returnUrl) : navigate('/');
  }, [user]);

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        title: 'Please fill all the fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }

    try {
      await login(email, password); // Call the login function from AuthContext
      toast.success("Logged in successfully!");
      navigate("/"); // Redirect to home or a dashboard upon successful login
    } catch (error) {
      toast.error(error.response?.data || "Login failed. Please try again.");
      console.error("Login failed", error);
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
            <a href="#">Sign up now.</a>
          </Link>
        </p>
      </div>
    </div>
  );
}
