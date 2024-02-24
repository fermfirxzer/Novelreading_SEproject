import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (input, userType) => {
    const url = userType === "writer" ? "http://localhost:5000/api/writer/login" : "http://localhost:5000/api/auth/login";
    console.log(url);
    try {
      const res = await axios.post(url, input, { withCredentials: true });
      setCurrentUser(res.data)
      return { success: true, data: res.data };
    } catch (error) {
      console.error("Error in login:", error);
      return { success: false, error: error.response ? error.response.data : "An error occurred" };
    }
    
  };

  const logout = async () => {
    
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  useEffect(() => {
    // Retrieve user data from localStorage when the application initializes
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  useEffect(() => {
    // Update localStorage when currentUser changes
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return <AuthContext.Provider value={{ currentUser, login, logout }}>{children}</AuthContext.Provider>;
};
