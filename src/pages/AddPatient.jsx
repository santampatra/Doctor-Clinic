"use client";
import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function AddPatient() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    dob: "",
    regDate: "",
    phone: "",
    email: "",
    address: "",
    bloodGroup: "",
    heightWeight: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // ✅ Future Integration (MongoDB API)
      // await fetch("http://localhost:5000/api/patients", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });

      console.log("Patient Added:", formData);

      setTimeout(() => {
        setLoading(false);
        setMessage("✅ Patient added successfully!");
        navigate("/allpatients");
      }, 800);
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to add patient. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-[Raleway]">
      {/* HEADER */}
      <div className="fixed top-0 left-0 w-full z-20">
        <Header showLogout />
      </div>

      {/* SIDEBAR */}
      <div className="fixed top-[64px] left-0 w-60 h-[calc(100vh-64px)] bg-white shadow-md overflow-y-auto">
        <Sidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-60 mt-[64px] p-8">
        <div className="bg-[#00b3a4] rounded-3xl shadow-lg text-center py-8 px-8 sm:px-12 md:px-16 max-w-4xl mx-auto">
          <h2 className="text-white text-3xl sm:text-4xl font-semibold mb-6">
            Add A New Patient
          </h2>

          {/* FORM GRID */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left justify-center"
          >
            {/* LEFT COLUMN */}
            <div className="space-y-3.5">
              <input
                type="text"
                name="name"
                placeholder="Patient Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2.5 rounded-full bg-white text-gray-800 placeholder-gray-500 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004d46]"
              />
              <input
                type="text"
                name="gender"
                placeholder="Patient Gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full p-2.5 rounded-full bg-white text-gray-800 placeholder-gray-500 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004d46]"
              />
              <input
                type="number"
                name="age"
                placeholder="Patient Age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full p-2.5 rounded-full bg-white text-gray-800 placeholder-gray-500 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004d46]"
              />
              <input
                type="date"
                name="dob"
                placeholder="Patient Date Of Birth"
                value={formData.dob}
                onChange={handleChange}
                required
                className="w-full p-2.5 rounded-full bg-white text-gray-800 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004d46]"
              />
              <input
                type="date"
                name="regDate"
                placeholder="Registration Date"
                value={formData.regDate}
                onChange={handleChange}
                required
                className="w-full p-2.5 rounded-full bg-white text-gray-800 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004d46]"
              />
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-3.5">
              <input
                type="text"
                name="phone"
                placeholder="Mobile Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-2.5 rounded-full bg-white text-gray-800 placeholder-gray-500 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004d46]"
              />
              <input
                type="email"
                name="email"
                placeholder="Patient Email (if applicable)"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2.5 rounded-full bg-white text-gray-800 placeholder-gray-500 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004d46]"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full p-2.5 rounded-full bg-white text-gray-800 placeholder-gray-500 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004d46]"
              />
              <input
                type="text"
                name="bloodGroup"
                placeholder="Blood Group"
                value={formData.bloodGroup}
                onChange={handleChange}
                required
                className="w-full p-2.5 rounded-full bg-white text-gray-800 placeholder-gray-500 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004d46]"
              />
              <input
                type="text"
                name="heightWeight"
                placeholder="Height or Weight"
                value={formData.heightWeight}
                onChange={handleChange}
                required
                className="w-full p-2.5 rounded-full bg-white text-gray-800 placeholder-gray-500 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004d46]"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <div className="col-span-1 sm:col-span-2 text-center mt-6">
              <button
                type="submit"
                disabled={loading}
                className={`${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                } bg-[#004d46] hover:bg-[#003a36] text-white px-10 py-2.5 rounded-md text-base transition-all shadow-md`}
              >
                {loading ? "Adding..." : "Add Patient →"}
              </button>
            </div>
          </form>

          {/* MESSAGE */}
          {message && (
            <p className="mt-5 text-white/90 bg-white/10 px-3 py-2 rounded-md text-sm w-64 sm:w-80 md:w-96 mx-auto">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
