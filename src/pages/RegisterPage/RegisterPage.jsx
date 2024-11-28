import React, { useState } from "react";
import "./RegisterPage.css";

export default function RegisterPage() {
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
        <h1>Register</h1>
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

