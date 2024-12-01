import React, { useState, useEffect, useRef } from "react";
import { IconMoon, IconSun, IconSearch, IconDeviceTvOld, IconMovie } from "@tabler/icons-react";
import { useTheme } from "../../context/useThemeContext";
import { useAuth } from "../../context/UserContext"; // Import your useAuth hook
import { Link, useNavigate } from "react-router-dom";
import "./navBar.css";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth(); // Get user details and logout from useAuth
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    logout();
    navigate("/login");
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
            <span onClick={() => navigate('/')} className="netflix-text">NETFLIX</span>
          </div>
          <ul className="navbar-links">
            <li><Link to="/search"><IconSearch /> Search</Link></li>
            <li><Link to="/movie"><IconMovie /> Movies</Link></li>
            <li><Link to="/tv"><IconDeviceTvOld /> TV Shows</Link></li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="navbar-right">
          {/* Theme Toggle */}
          <div className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
            {theme === "light" ? (
              <IconSun size={24} title="Switch to Dark Mode" />
            ) : (
              <IconMoon size={24} title="Switch to Light Mode" />
            )}
          </div>

          {/* User Dropdown */}
          {user ? (
            <div className="dropdown" ref={dropdownRef}>
              <button className="dropdown-toggle" onClick={toggleDropdown}>
                {user.name}
              </button>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/favorites">Favorites</Link>
                  <Link to="/watchlist">Watchlist</Link>
                  <Link onClick={handleLogout}>Logout</Link>
                </div>
              )}
            </div>
          ) : (
            <button className="signinbtn" onClick={() => navigate("/login")}>Sign in</button>
          )}
        </div>
      </div>
    </nav>
  );
}
