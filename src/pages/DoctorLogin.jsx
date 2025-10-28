"use client";
import React, { useState } from "react";
import { UserCog } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DoctorLogin() {
  const [doctorId, setDoctorId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    setTimeout(() => {
      if (doctorId === "abcd" && password === "1234") {
        localStorage.setItem("doctorAuth", "true");
        navigate("/allpatients");
      } else {
        setMessage("Invalid Doctor ID or Password");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-century">

      {/* HEADER */}
      <header className="bg-white shadow-md py-4 px-8 flex items-center justify-center sm:justify-start">
        <div className="flex items-center space-x-3">
          <img
            src="/doctoricon.png" // <-- Replace with your logo path
            className="w-10 h-10"
          />
          <div className="flex flex-col leading-tight">
            <h1 className="text-gray-800 text-xl sm:text-2xl font-semibold tracking-wide">
              Doctor Consultation
            </h1>
          </div>
        </div>
      </header>

      {/* MAIN LOGIN SECTION */}
      <main className="flex flex-1 justify-center items-center px-4 py-10 sm:py-16">
        <div className="bg-[#00b3a4] w-full max-w-5xl rounded-3xl shadow-2xl text-center py-10 sm:py-16 px-6 sm:px-10 md:px-16 flex flex-col items-center justify-center transition-all duration-300">
          
          {/* ICON + TITLE */}
          <div className="flex justify-center items-center space-x-3 sm:space-x-4 mb-8 sm:mb-10">
            <UserCog className="text-white" size={44} />
            <h2 className="text-white text-3xl sm:text-5xl md:text-6xl font-light tracking-wide">
              Doctor Login
            </h2>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleLogin}
            className="flex flex-col items-center space-y-4 sm:space-y-6 w-full"
          >
            <input
              type="text"
              placeholder="Enter Doctor Id"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              className="w-64 sm:w-80 md:w-96 p-3 rounded-full bg-white text-gray-800 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004d46] transition-all"
              required
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-64 sm:w-80 md:w-96 p-3 rounded-full bg-white text-gray-800 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004d46] transition-all"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "opacity-70 cursor-not-allowed" : ""
              } bg-[#004d46] hover:bg-[#003a36] text-white px-8 sm:px-10 py-2 sm:py-2.5 rounded-md mt-4 transition-all text-sm sm:text-base shadow-sm`}
            >
              {loading ? "Verifying..." : "Login →"}
            </button>
          </form>

          {/* MESSAGE */}
          {message && (
            <p className="mt-6 text-white/90 bg-white/10 px-4 py-2 rounded-md w-64 sm:w-80 md:w-96 mx-auto text-xs sm:text-sm">
              {message}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
