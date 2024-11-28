import React, { useState, useEffect } from "react";
import { IconMoon, IconSun, IconSearch, IconDeviceTvOld, IconMovie, IconHome } from "@tabler/icons-react";
import { useTheme } from "../../context/useThemeContext";
import { Link } from "react-router-dom";
import "./navBar.css";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    setIsLoggedIn(!!userToken);
  }, []);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const handleLogin = () => {
    localStorage.setItem("userToken", "your-jwt-token");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left Section */}
        <div className="navbar-left">
          <div className="navbar-brand">
            {/* Netflix Text instead of logo */}
            <span className="netflix-text">NETFLIX</span>
          </div>
          <ul className="navbar-links">
            <li><Link to="/search"><IconSearch /> Search</Link></li>
            <li><Link to="/movie"><IconMovie /> Movies</Link></li>
            <li><Link to="/tvshow"><IconDeviceTvOld /> TV Shows</Link></li>
          </ul>
        </div>

        {/* Middle Spacer */}
        <div className="navbar-middle"></div>

        {/* Right Section */}
        <div className="navbar-right">
          {/* Theme Toggle */}
          <div className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
            {theme === "light" ? (
              <IconMoon size={24} title="Switch to Dark Mode" />
            ) : (
              <IconSun size={24} title="Switch to Light Mode" />
            )}
          </div>

          {/* Conditionally render Login or User button */}
          {isLoggedIn ? (
            <div className="dropdown">
              <button className="dropdown-toggle" onClick={toggleDropdown}>
                User
              </button>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <a href="#">Profile</a>
                  <a href="#" onClick={handleLogout}>Logout</a>
                </div>
              )}
            </div>
          ) : (
            <button onClick={handleLogin}>
              Sign in
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
