import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock authentication - in real app, this would be an API call
    if (email === "superadmin@example.com" && password === "password") {
      const user = { email, role: "superadmin", name: "Super Admin" };
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      return { success: true, role: "superadmin" };
    } 
    else if (email === "admin@example.com" && password === "password") {
      const user = { email, role: "admin", name: "Admin User" };
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      return { success: true, role: "admin" };
    }
    else if (email === "team@example.com" && password === "password") {
      const user = { email, role: "team", name: "Team Member" };
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      return { success: true, role: "team" };
    }
    return { success: false, error: "Invalid credentials" };
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};