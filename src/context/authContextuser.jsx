import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (input, userType) => {
    const url = "http://localhost:5000/api/writer/login" 
    try {
      const res = await axios.post(url, input, { withCredentials: true });
      setCurrentUser(res.data)
      return { success: true, data: res.data };
    } catch (error) {
      console.error("Error in login:", error);
      return { success: false, error: error.response ? error.response.data : "An error occurred" };
    }
    
  };
  // const navigate = useNavigate()
  const logout = async () => {
    localStorage.removeItem("user");
    if(currentUser){
      setCurrentUser(null);
    }
    axios.post("http://localhost:5000/api/writer/logout",{},{withCredentials: true});
    
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
