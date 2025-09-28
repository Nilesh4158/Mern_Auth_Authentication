import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer, toast } from 'react-toastify';
// import 'react-tostify/dist/ReactTostify.css';


const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />



{/* 404 Page Styling with Tailwind */}
        <Route
          path="*"
          element={
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
              <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
              <p className="text-2xl text-gray-700 mb-6">Page Not Found</p>
              <a
                href="/"
                className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
              >
                Go Home
              </a>
            </div>
          }
        />



      </Routes>
    </div>
  );
};

export default App;
