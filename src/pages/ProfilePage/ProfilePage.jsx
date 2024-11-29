import React, { useState } from "react";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name,setName] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      alert("Logged in successfully!");
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Profile</h1>
        <form onSubmit={handleLogin}>
           
          <div className="input-group">
            <input
              type="name"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          <div className="input-group">
            <input
              type="password"
              placeholder="confirmPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">
           UpdateProfile
          </button>
        </form>
      </div>
    </div>
  );
};

