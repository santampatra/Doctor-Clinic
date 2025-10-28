"use client";
import React, { useState, useEffect } from "react";
import { Users, FilePlus2, Bell, FileBarChart2, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("");
  const [isOpen, setIsOpen] = useState(false); // ✅ Mobile toggle state

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

  // ✅ Auto highlight active item
  useEffect(() => {
    const currentItem = menuItems.find((item) =>
      location.pathname.startsWith(item.path)
    );
    setActive(currentItem ? currentItem.key : "");
  }, [location.pathname]);

  // ✅ Handle navigation
  const handleSelect = (item) => {
    setActive(item.key);
    navigate(item.path);
    setIsOpen(false); // ✅ Close sidebar after clicking (mobile)
  };

  return (
    <>
      {/* ✅ Mobile Topbar Toggle Button */}
      <div className="md:hidden fixed top-[70px] left-4 z-40 bg-[#00b3a4] p-2 rounded-md shadow-md">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <X size={22} className="text-white" />
          ) : (
            <Menu size={22} className="text-white" />
          )}
        </button>
      </div>

      {/* ✅ Sidebar */}
      <aside
        className={`fixed top-[64px] left-0 h-[calc(100vh-64px)] bg-white shadow-md font-century transition-all duration-300 z-30
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:w-60 w-64`}
      >
        <div className="flex flex-col space-y-5 w-full px-4 py-6">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleSelect(item)}
              className={`flex items-center space-x-3 w-full text-left px-3 py-2 rounded-md transition-all duration-200 ${
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

      {/* ✅ Dark Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
