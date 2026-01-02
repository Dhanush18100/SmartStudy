import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Set token in axios header
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["x-auth-token"] = token;
    } else {
      delete axios.defaults.headers.common["x-auth-token"];
    }
  };

  // Load user on app start
  const loadUser = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    setAuthToken(token);

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKENDURL}/api/auth/user`
      );
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (err) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, [token]);

  // Register
  const register = async (formData) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKENDURL}/api/auth/register`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      toast.success("Registration successful!");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Registration failed");
    }
  };

  // Login
  const login = async (formData) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKENDURL}/api/auth/login`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      toast.success("Logged in successfully!");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Invalid credentials");
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
