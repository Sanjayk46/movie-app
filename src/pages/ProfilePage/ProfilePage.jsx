import React, { useState } from "react";
import "./ProfilePage.css";
import { useAuth } from "../../context/UserContext"; // Import useAuth for updateProfile
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProfilePage() {
  const auth = useAuth(); // Access updateProfile function from AuthContext
  const {user} = auth;
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

    try {
      await auth.updateProfile({ name, email, password });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.response?.data || "Profile update failed. Please try again.");
      console.error("Profile update error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
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
