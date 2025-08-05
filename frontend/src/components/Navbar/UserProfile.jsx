import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

const getFirstTwoLetters = (str) => {
  if (!str || typeof str !== "string") return "";
  return str.substring(0, 2).toUpperCase(); // Optional: uppercase it
};

const UserProfile = ({ onLogout }) => {
  const { userInfo } = useContext(AuthContext);
  let letteredName = getFirstTwoLetters(userInfo?.name);

  return (
    <div className="flex items-center gap-3 px-5 py-2 border rounded-4xl bg-slate-500">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-light font-medium bg-darkBlue">
        {letteredName}
      </div>

      <div className="flex flex-col items-center justify-center">
        <p className="text-md font-medium">{userInfo?.name || ""}</p>
        <button
          className="text-xs text-white-500 cursor-pointer hover:text-darkBlue "
          onClick={onLogout}
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
