"use client";
import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Calendar, FileSpreadsheet } from "lucide-react";

export default function ReportGenerator() {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [exporting, setExporting] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Simulate Excel export
  const handleExport = async () => {
    if (!month || !year) {
      setMessage("⚠️ Please select both month and year.");
      return;
    }

    setExporting(true);
    setMessage("");

    try {
      // ✅ Future Integration:
      // await fetch("http://localhost:5000/api/reports/export", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ month, year }),
      // });

      console.log(`Export report for: ${month} ${year}`);
      setTimeout(() => {
        setExporting(false);
        setMessage(`✅ Report exported successfully for ${month}, ${year}!`);
      }, 1200);
    } catch (error) {
      console.error(error);
      setMessage("❌ Export failed. Please try again.");
      setExporting(false);
    }
  };

  // ✅ Temporary static data (to be fetched later from backend)
  const analyticsData = [
    { label: "Total Patients", value: 2148, color: "#00b3a4" },
    { label: "New Patients (Month)", value: 53, color: "#00b3a4" },
    { label: "New Patients (Year)", value: 589, color: "#00b3a4" },
    { label: "Total Revenue Generated (Month)", value: "16534 Rs", color: "#00b3a4" },
    { label: "Total Revenue Generated (Year)", value: "275096 Rs", color: "#00b3a4" },
    { label: "Total Pending Payments", value: "10340 Rs", color: "#ff5b5b" },
  ];

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
      <div className="flex-1 ml-60 mt-[64px] p-8 flex flex-col md:flex-row gap-6 justify-center items-start">
        {/* LEFT SIDE - ANALYTICS */}
        <div className="bg-white rounded-3xl shadow-md p-8 w-full md:w-[60%]">
          <h2 className="text-[#00b3a4] text-2xl font-semibold mb-6">Analytics</h2>

          <div className="space-y-5">
            {analyticsData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center space-x-4 w-full">
                  <div className="w-56 sm:w-64 text-gray-700 text-sm font-medium">
                    {item.label}
                  </div>

                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(
                          typeof item.value === "number" ? item.value / 25 : 100,
                          100
                        )}%`,
                        backgroundColor: item.color,
                      }}
                    ></div>
                  </div>

                  <div
                    className={`text-sm font-semibold text-right w-16 ${
                      item.color === "#ff5b5b" ? "text-[#ff5b5b]" : "text-[#00b3a4]"
                    }`}
                  >
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - EXPORT REPORT */}
        <div className="bg-[#00b3a4] rounded-3xl shadow-lg p-8 w-full md:w-[35%] text-white">
          <h2 className="text-2xl font-semibold mb-3">Export Reports</h2>
          <p className="text-white/90 text-sm mb-6 leading-relaxed">
            Download complete diagnostic records, billing, and financial summaries
            in Excel format for backup or reporting purposes.
          </p>

          <div className="space-y-4">
            {/* Select Month */}
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-full bg-white text-gray-800 text-sm focus:ring-2 focus:ring-[#004d46] focus:outline-none shadow-sm"
              >
                <option value="">Select Month</option>
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Year */}
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-full bg-white text-gray-800 text-sm focus:ring-2 focus:ring-[#004d46] focus:outline-none shadow-sm"
              >
                <option value="">Select Year</option>
                {["2023", "2024", "2025"].map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {/* Export Button */}
            <button
              onClick={handleExport}
              disabled={exporting}
              className={`${
                exporting ? "opacity-70 cursor-not-allowed" : ""
              } bg-[#004d46] hover:bg-[#003a36] text-white w-full py-2.5 rounded-md text-sm font-medium shadow-md flex items-center justify-center space-x-2 transition-all`}
            >
              <FileSpreadsheet size={16} />
              <span>{exporting ? "Exporting..." : "Export To Excel"}</span>
            </button>
          </div>

          {/* Status Message */}
          {message && (
            <p className="mt-6 bg-white/10 text-white text-sm px-4 py-2 rounded-md text-center">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
