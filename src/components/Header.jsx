"use client";
import React, { useState } from "react";
import { Bell, Search, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header({ showLogout = false }) {
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState("");

  // ✅ Logout and clear session
  const handleLogout = () => {
    localStorage.removeItem("doctorAuth");
    navigate("/");
  };

  // ✅ Handle search — navigate to patient profile by ID or Code
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchId.trim() !== "") {
      const searchValue = searchId.trim().toUpperCase();

      // 🟩 Future Integration:
      // Later, you can replace this with a MongoDB search API call.
      // Example:
      // fetch(`http://localhost:5000/api/patients/search/${searchValue}`)
      //   .then((res) => res.json())
      //   .then((data) => navigate(`/patient/${data.patientCode}`, { state: data }))
      //   .catch((err) => console.error(err));

      navigate(`/patient/${searchValue}`); // temporary static redirect
      setSearchId("");
    }
  };

  return (
    <header className="bg-white shadow-sm px-6 py-3 flex items-center justify-between font-century sticky top-0 z-20">
      {/* LEFT SIDE: LOGO + TITLE */}
      <div className="flex items-center space-x-2">
        <img
          src="/doctoricon.png"
          className="w-8 h-8 object-contain"
        />
        <div className="flex flex-col leading-tight">
          <h1 className="text-gray-900 text-sm sm:text-base font-semibold tracking-wide">
            Doctor Consultation
          </h1>
        </div>
      </div>

      {/* RIGHT SIDE CONTROLS */}
      <div className="flex items-center space-x-3 sm:space-x-4">
  
        {/* Search Input */}
        <div className="flex items-center bg-gray-100 border border-gray-300 rounded-full px-3 py-1.5 w-36 sm:w-56 focus-within:ring-2 focus-within:ring-[#00b3a4] transition-all">
          <Search size={16} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search Patient Code (e.g., P1001)"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            onKeyDown={handleSearch}
            className="bg-transparent border-none outline-none text-sm text-gray-700 ml-2 w-full placeholder-gray-500"
          />
        </div>

        {/* Logout Button */}
        {showLogout && (
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 bg-[#00b3a4] hover:bg-[#009589] text-white px-3 py-1 rounded-md text-sm transition-all"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        )}
      </div>
    </header>
  );
}
