// src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      const response = await axiosInstance.post("/users/login", credentials, {
        withCredentials: true,
      });
      if (response.data?.data?.user) {
        setUserInfo(response.data.data.user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const signup = async (credentials) => {
    try {
      const response = await axiosInstance.post("/users/signup", credentials);

      // Handle successful registration response
      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }

      navigate("/dashboard");
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/users/get-user");
      if (response.status === 200) {
        setUserInfo(response.data.data.data);
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    console.log("from second useEffect");
    getUserInfo();
  }, []);

  return (
    <AuthContext.Provider value={{ userInfo, login, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
