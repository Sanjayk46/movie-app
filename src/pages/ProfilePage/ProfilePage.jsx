import React, { useState } from "react";
import "./ProfilePage.css";
import { useAuth } from "../../context/UserContext"; // Import useAuth for updateProfile
import { useTheme } from "../../context/useThemeContext"; // Import useTheme for theme context
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProfilePage() {
  const auth = useAuth(); // Access register function and user from AuthContext
  const { user } = auth;
  const { theme } = useTheme(); // Access theme from useTheme context
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.warning("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    await auth.updateProfile({ name, email, password });
  };

  return (
    <div className={`profile-container ${theme}`}>
      <div className="profile-box">
        <h1>Profile</h1>
        <form onSubmit={handleUpdateProfile}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="show-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
            </span>
          </div>
          <div className="input-group password-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="show-password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <i className={`fa ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
            </span>
          </div>
          <button type="submit" className="login-button">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
