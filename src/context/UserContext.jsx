import { useState, createContext, useContext } from "react";
import { toast } from "react-toastify";
import * as userService from "../services/userService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(userService.getUser());

  const login = async (email, password) => {
    try {
      const user = await userService.login(email, password);
      setUser(user);
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error.response?.data || "Login failed!");
    }
  };

  const register = async (data) => {
    try {
      const user = await userService.register(data);
      setUser(user);
      toast.success("Registration successful!");
    } catch (error) {
      toast.error(error.response?.data || "Registration failed!");
    }
  };

  const updateProfile = async ({ name, email, password }) => {
    try {
      // Make an API call to update the profile
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`, // Include authentication token
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const updatedUser = await response.json();
      setUser(updatedUser); // Update user state in context
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message || "Profile update failed!");
    }
  };

  const changePassword = async (passwords) => {
    try {
      await userService.changePassword(passwords);
      logout();
      toast.success("Password changed successfully! Please log in again.");
    } catch (error) {
      toast.error(error.response?.data || "Password change failed!");
    }
  };

  const logout = () => {
    userService.logout();
    setUser(null);
    toast.success("Logout successful!");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, updateProfile, changePassword, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
