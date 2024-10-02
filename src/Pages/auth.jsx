import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Eye, EyeOffIcon, Info } from "lucide-react";
import { BarLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/user-auth";
import toast from "react-hot-toast";
const Auth = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [passwordHidden, setPasswordHidden] = useState(true);
  const { isAuthenticating, register, login, error, isAuthenticated, user } =
    useAuth();
  const [isLoggingIn, setIsLogingIn] = useState(true);
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/dashboard");
    }
  }, [user]);

  useEffect(() => {
    if (error?.message) {
      toast.error(error?.message);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = userData;
    isLoggingIn ? login(email, password) : register(username, email, password);
  };

  return (
    <>
      <Header />
      <div className="bg-gray-600 transition-all shadow-md shadow-emerald-300 hover:shadow-pink-500 text-white p-4 w-2/5 h-3/5 rounded-md">
        <form onSubmit={handleSubmit}>
          <div className="flex py-2 px-4 gap-4 rounded-md bg-black">
            <div
              className={`flex-1 cursor-pointer text-center font-bold text-xl ${isLoggingIn ? "bg-slate-400" : ""} py-2 px-4 rounded-md`}
              onClick={() => setIsLogingIn(true)}
            >
              Login
            </div>
            <div
              className={`flex-1 cursor-pointer text-center font-bold text-xl ${!isLoggingIn ? "bg-slate-400" : ""}  py-2 px-4 rounded-md`}
              onClick={() => setIsLogingIn(false)}
            >
              Signup
            </div>
          </div>
          {!isLoggingIn && (
            <input
              type="text"
              className="w-full my-4 p-2 rounded-md bg-transparent border border-gray-300 text-white"
              placeholder="Your Name"
              value={userData.username}
              onChange={(e) => {
                setUserData((prev) => ({ ...prev, username: e.target.value }));
              }}
            />
          )}
          <input
            type="email"
            className="w-full my-4 p-2 rounded-md bg-transparent border border-gray-300 text-white"
            placeholder="Your email"
            value={userData.email}
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, email: e.target.value }));
            }}
          />
          <div className="w-full my-4 flex gap-2">
            <span
              className="bg-white px-2 flex items-center justify-center w-fit rounded-md border border-gray-300 text-black font-bold"
              onClick={() => {
                setPasswordHidden(!passwordHidden);
              }}
            >
              {passwordHidden ? (
                <Eye color="black" />
              ) : (
                <EyeOffIcon color="black" />
              )}
              Password
            </span>
            <input
              type={passwordHidden ? "password" : "text"}
              className="flex-auto p-2 rounded-md bg-transparent border border-gray-300 text-white"
              placeholder="(min. 8 chars - including A-Z , a-z , 0-9 & special symbols)"
              value={userData.password}
              onChange={(e) => {
                setUserData((prev) => ({ ...prev, password: e.target.value }));
              }}
            />
          </div>
          <button
            type="submit"
            disabled={isAuthenticating}
            className="w-full my-4 transition-all hover:shadow-md hover:shadow-emerald-400 bg-white p-2 rounded-md text-black font-bold"
          >
            {isAuthenticating ? (
              <BarLoader color="gray" />
            ) : isLoggingIn ? (
              "Login"
            ) : (
              "Singup"
            )}
          </button>
        </form>
        <span className="text-center text-gray-200 flex items-center gap-2">
          <Info color="white" /> You'll be automatically registered if account
          not found.
        </span>
      </div>
      <Footer />
    </>
  );
};

export default Auth;
