import React, { createContext, useContext, useState, useEffect } from "react";

// Create ThemeContext
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Fetch theme from localStorage or default to "dark"
  const getInitialTheme = () => localStorage.getItem("theme") || "dark";

  const [theme, setTheme] = useState(getInitialTheme);

  // Update CSS variables dynamically based on the theme
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.style.setProperty("--background-color", "#141414");
      root.style.setProperty("--text-color", "#e5e5e5");
      root.style.setProperty("--text-hover-color", "#e50914");
      root.style.setProperty("--card-background", "#222");
    } else {
      root.style.setProperty("--background-color", "#ffffff");
      root.style.setProperty("--text-color", "#213547");
      root.style.setProperty("--text-hover-color", "#747bff");
      root.style.setProperty("--card-background", "#f9f9f9");
    }

    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle function to switch between "light" and "dark" themes
  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext);
