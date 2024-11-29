import React, { useState, useEffect, useRef } from "react";
import { IconMoon, IconSun, IconSearch, IconDeviceTvOld, IconMovie } from "@tabler/icons-react";
import { useTheme } from "../../context/useThemeContext";
import { Link, useNavigate } from "react-router-dom";
import "./navBar.css";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef(null); // Reference to the dropdown menu
  const navigate = useNavigate();

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

  const handleClick = () => {
    navigate('/');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left Section */}
        <div className="navbar-left">
          <div className="navbar-brand">
            <span onClick={handleClick} className="netflix-text">NETFLIX</span>
          </div>
          <ul className="navbar-links">
            <li><Link to="/search"><IconSearch /> Search</Link></li>
            <li><Link to="/movie"><IconMovie /> Movies</Link></li>
            <li><Link to="/tv"><IconDeviceTvOld /> TV Shows</Link></li>
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
            <div className="dropdown" ref={dropdownRef}>
              <button className="dropdown-toggle" onClick={toggleDropdown}>
                User
              </button>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to='/profile'><a href="#">Profile</a></Link>
                  <Link to='/favorites'><a href="#">Favorite</a></Link>
                  <Link to='/watchlist'><a href="#">WatchList</a></Link>
                  <Link><a href="#" onClick={handleLogout}>Logout</a></Link>
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
