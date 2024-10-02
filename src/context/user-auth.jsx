import React, { createContext, useContext, useState, useEffect } from "react";
import { account } from "../db/appwrite.js";
import toast from "react-hot-toast";

// Create a context for authentication
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Function to fetch the current session
  const fetchCurrentSession = async () => {
    setIsAuthenticating(true);
    try {
      const session = await account.get();
      setUser(session);
    } catch (error) {
      console.error("Error fetching session:", error);
      setUser(null);
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Register function
  const register = async (username, email, password) => {
    setIsAuthenticating(true);
    try {
      const newUser = await account.create(
        "unique()",
        email,
        password,
        username
      );
      console.log("User Registered:", newUser);
      // Automatically log in the user after successful registration
      const response = await account.createEmailPasswordSession(
        email,
        password
      );
      console.log("User Response after registration:", response);
      setUser(response);
      toast.success("Registration and login successful!");
    } catch (registerError) {
      console.error("Registration Error:", registerError);
      setError(registerError);
      toast.error("Registration failed!");
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Login function
  const login = async (email, password) => {
    setIsAuthenticating(true);
    setError(null);
    try {
      const response = await account.createEmailPasswordSession(
        email,
        password
      );
      console.log("User Response:", response); // Success
      setUser(response);
      toast.success("Login successful!");
    } catch (loginError) {
      console.error("Login Error:", loginError); // Failure

      setError(loginError);
      toast.error("Login failed!");
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsAuthenticating(true);
    try {
      await account.deleteSessions();
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Logout failed");
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Check if the user is authenticated
  const isAuthenticated = () => {
    return user !== null;
  };

  useEffect(() => {
    fetchCurrentSession();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated,
        isAuthenticating,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
