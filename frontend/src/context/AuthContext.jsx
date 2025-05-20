// context/AuthContext.js

import { createContext, useState, useEffect } from "react";
import { getUserInfo } from "../services/userService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Store token in state and initialize from localStorage
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data if token exists
  useEffect(() => {
    if (token) {
      fetchUserData(token);
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUserData = async (currentToken) => {
    console.log("Fetching user data with token:", currentToken);
    try {
      const userData = await getUserInfo(currentToken);
      console.log("User data fetched:", userData);
      setUser(userData);
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      setError("Failed to authenticate user");
      logout(); // clear everything if token is bad
    } finally {
      setLoading(false);
    }
  };

  // Login function: store token, fetch user
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    fetchUserData(newToken);
  };

  // Logout function: clear token and user info
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
