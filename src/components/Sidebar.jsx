"use client";
import React, { useState, useEffect } from "react";
import { Users, FilePlus2, Bell, FileBarChart2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("");

  // ✅ Set active item based on current route
  useEffect(() => {
    if (location.pathname.startsWith("/allpatients")) setActive("patients");
    else if (location.pathname.startsWith("/add-patient")) setActive("add-patient");
    else if (location.pathname.startsWith("/notifications")) setActive("notifications");
    else if (location.pathname.startsWith("/reports")) setActive("reports");
  }, [location.pathname]);

  // ✅ Define sidebar menu items
  const menuItems = [
    {
      key: "patients",
      label: "All Patients",
      icon: <Users size={20} />,
      path: "/allpatients",
    },
    {
      key: "add-patient",
      label: "Add Patient",
      icon: <FilePlus2 size={20} />,
      path: "/addpatient",
    },
    {
      key: "notifications",
      label: "Notifications",
      icon: <Bell size={20} />,
      path: "/notifications",
    },
    {
      key: "financialreports",
      label: "Report Generator",
      icon: <FileBarChart2 size={20} />,
      path: "/financialreports",
    },
  ];

  // ✅ Handle click to navigate
  const handleSelect = (item) => {
    setActive(item.key);
    navigate(item.path);
  };

  return (
    <aside
      className="fixed top-[64px] left-0 w-60 bg-white shadow-md h-[calc(100vh-64px)] overflow-y-auto font-[Raleway] transition-all duration-300"
    >
      <div className="flex flex-col space-y-5 w-full px-4 py-6">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => handleSelect(item)}
            className={`flex items-center space-x-3 w-full text-left px-3 py-2 rounded-md transition-all duration-200
              ${
                active === item.key
                  ? "bg-[#00b3a4] text-white shadow-sm"
                  : "text-gray-600 hover:text-[#00b3a4] hover:bg-gray-50"
              }`}
          >
            <span
              className={`${
                active === item.key ? "text-white" : "text-gray-500"
              }`}
            >
              {item.icon}
            </span>
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
