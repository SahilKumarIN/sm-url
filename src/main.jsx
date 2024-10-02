import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/user-auth.jsx";
import { DbProvider } from "./context/db-context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="container h-screen flex flex-col items-center bg-slate-700 ">
    <AuthProvider>
      <DbProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <App />
      </DbProvider>
    </AuthProvider>
  </div>
);
