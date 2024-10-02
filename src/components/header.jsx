import React from "react";
import { useAuth } from "../context/user-auth";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { User } from "lucide-react";
const Header = () => {
  const { isAuthenticated, logout, isAuthenticating } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-between py-4 px-4 mb-4">
      <a href="/">
        <h1 className="text-white font-extrabold text-4xl">sm-url</h1>
      </a>
      {isAuthenticated() ? (
        <div className="flex gap-2 items-center">
          <div
            onClick={() => navigate("/dashboard")}
            className="rounded-full font-bold text-xl cursor-pointer shadow shadow-gray-400 bg-white w-8 h-8 flex items-center justify-center"
          >
            {<User />}
          </div>
          <button
            className="bg-red-600 text-white font-bold text-sm p-2 rounded-md"
            onClick={() => {
              logout();
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          className="bg-emerald-500 text-white font-bold text-sm p-2 rounded-md"
          onClick={() => {
            navigate("/auth");
          }}
        >
          {isAuthenticating ? <BeatLoader color="gray" /> : "Login"}
        </button>
      )}
    </div>
  );
};

export default Header;
