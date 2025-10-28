"use client";
import React, { useState } from "react";
import { Bell, Search, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header({ showLogout = false }) {
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState("");
  const [showSearch, setShowSearch] = useState(false); // ✅ Mobile search toggle

  // ✅ Logout and clear session
  const handleLogout = () => {
    localStorage.removeItem("doctorAuth");
    navigate("/");
  };

  // ✅ Handle search
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchId.trim() !== "") {
      const searchValue = searchId.trim().toUpperCase();
      navigate(`/patient/${searchValue}`);
      setSearchId("");
      setShowSearch(false);
    }
  };

  return (
    <header className="bg-white shadow-sm px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between font-century sticky top-0 z-20">
      {/* LEFT: LOGO & TITLE */}
      <div className="flex items-center space-x-2">
        <img
          src="/doctoricon.png"
          className="w-8 h-8 object-contain"
          alt="Doctor Icon"
        />
        <h1 className="text-gray-900 text-base sm:text-lg font-semibold tracking-wide">
          Doctor Consultation
        </h1>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center space-x-3 sm:space-x-4 mt-2 sm:mt-0">
        {/* 🔍 Search Section */}
        <div
          className={`flex items-center bg-gray-100 border border-gray-300 rounded-full px-3 py-1.5 transition-all ${
            showSearch ? "w-56" : "w-10 sm:w-56"
          }`}
        >
          <Search
            size={18}
            className="text-gray-500 cursor-pointer"
            onClick={() => setShowSearch(!showSearch)}
          />
          <input
            type="text"
            placeholder="Search Patient Code (e.g., P1001)"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            onKeyDown={handleSearch}
            className={`bg-transparent border-none outline-none text-sm text-gray-700 ml-2 w-full placeholder-gray-500 transition-all ${
              showSearch ? "opacity-100 visible" : "hidden sm:block sm:opacity-100"
            }`}
          />
        </div>

        {/* 🔘 Logout Button */}
        {showLogout && (
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 bg-[#00b3a4] hover:bg-[#009589] text-white px-3 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        )}
      </div>
    </header>
  );
}
