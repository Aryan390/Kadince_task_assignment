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
        localStorage.setItem("signedIn", "Yes");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed", error);
      localStorage.setItem("signedIn", "No");
      throw error;
    }
  };

  const signup = async (credentials) => {
    try {
      const response = await axiosInstance.post("/users/signup", credentials, {
        withCredentials: true,
      });

      // Handle successful registration response
      if (response.data?.data?.user) {
        setUserInfo(response.data.data.user);
        localStorage.setItem("signedIn", "Yes");
        navigate("/dashboard");
        return;
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
        localStorage.setItem("signedIn", "No");
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
    try {
      const signedInStatus = localStorage?.getItem("signedIn");
      if (!signedInStatus || signedInStatus === "No") {
        console.log("some");
        localStorage.setItem("signedIn", "No");
      }
    } catch (err) {
      setError("An unexpected error occured. Please try again.");
    }
    getUserInfo();
  }, []);

  return (
    <AuthContext.Provider value={{ userInfo, login, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
