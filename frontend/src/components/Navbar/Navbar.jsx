import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router";
import UserProfile from "./UserProfile";
import axiosInstance from "../../utils/axiosInstance";
import { CloudCog, Zap } from "lucide-react";

const Navbar = ({ userInfo }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // const navItems = [
  //   { path: "/dashboard", label: "Dashboard" },
  //   { path: "/about", label: "About" },
  //   { path: "/scoreboard", label: "Scoreboard" },
  // ];

  const onLogout = async () => {
    try {
      const response = await axiosInstance.get("/users/logout");
      navigate("/login");
    } catch (err) {
      console.log("logout failed", err);
    }
  };

  return (
    <div className="">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-primary p-2 rounded-xl mt-1 text-white ">
                <Zap />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white bg-clip-text">
                  TaskMaster
                </h1>
                <h2 className="text-sm text-muted-foreground">
                  Supercharge your productivity with modern task management
                </h2>
              </div>
            </div>
          </div>
          {/* <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link key={item.path} to={item.path}>
                  <button
                    className={`
          px-4 py-2 cursor-pointer rounded-md transition-all ease-in-out duration-200
          ${
            isActive
              ? "bg-primary text-primary-foreground shadow-lg"
              : "text-foreground hover:bg-accent/50 hover:opacity-70"
          }
        `}
                  >
                    {item.label}
                  </button>
                </Link>
              );
            })}
          </nav> */}
          <UserProfile userInfo={userInfo} onLogout={onLogout} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
