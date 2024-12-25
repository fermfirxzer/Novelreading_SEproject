import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (input, userType) => {
    const url = `${process.env.REACT_APP_API_URL}/api/writer/login` 
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
    axios.post(`${process.env.REACT_APP_API_URL}/api/writer/logout`,{},{withCredentials: true});
    
  };

  useEffect(() => {
    // Retrieve user data from localStorage when the application initializes
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return <AuthContext.Provider value={{ currentUser, login, logout }}>{children}</AuthContext.Provider>;
};
