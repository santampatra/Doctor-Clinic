"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Calendar, FileSpreadsheet } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

export default function ReportGenerator() {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [exporting, setExporting] = useState(false);
  const [message, setMessage] = useState("");
  const [analyticsData, setAnalyticsData] = useState([]);

  // ✅ (Future Integration)
  // Replace with your backend API later
  useEffect(() => {
    setAnalyticsData([
      { name: "Total Patients", value: 2148 },
      { name: "New Patients (Month)", value: 53 },
      { name: "New Patients (Year)", value: 589 },
      { name: "Revenue (Month)", value: 1654 },
      { name: "Revenue (Year)", value: 2796 },
      { name: "Pending Payments", value: 1040 },
    ]);
  }, []);

  // ✅ Handle Excel export
  const handleExport = async () => {
    if (!month || !year) {
      setMessage("⚠️ Please select both month and year.");
      return;
    }

    setExporting(true);
    setMessage("");

    try {
      // Future API integration
      // await fetch("http://localhost:5000/api/reports/export", { ... })

      setTimeout(() => {
        setExporting(false);
        setMessage(`✅ Report exported successfully for ${month}, ${year}!`);
      }, 1000);
    } catch {
      setMessage("❌ Export failed. Please try again.");
      setExporting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-century">
      {/* HEADER */}
      <div className="fixed top-0 left-0 w-full z-20">
        <Header showLogout />
      </div>

      {/* SIDEBAR */}
      <div className="fixed top-[64px] left-0 w-60 h-[calc(100vh-64px)] bg-white shadow-md overflow-y-auto">
        <Sidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-60 mt-[64px] p-8 flex flex-col md:flex-row gap-8 justify-between">
        {/* LEFT - ANALYTICS CARD */}
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full md:w-[60%] transition-all hover:shadow-2xl">
          <h2 className="text-[#00b3a4] text-2xl font-semibold mb-6 tracking-wide">
            Analytics Overview
          </h2>

          {/* BEAUTIFIED CHART */}
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analyticsData}
                margin={{ top: 10, right: 30, left: 10, bottom: 60 }}
              >
                <defs>
                  <linearGradient id="tealGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00d5c0" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#00b3a4" stopOpacity={0.9} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#4b5563" }}
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#4b5563" }}
                  tickFormatter={(v) =>
                    v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v
                  }
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                    fontSize: "12px",
                    color: "#333",
                  }}
                  cursor={{ fill: "rgba(0,179,164,0.05)" }}
                />
                <Legend
                  wrapperStyle={{
                    paddingTop: "10px",
                    fontSize: "12px",
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="url(#tealGradient)"
                  radius={[10, 10, 0, 0]}
                  barSize={40}
                >
                  {analyticsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.name === "Pending Payments"
                          ? "#ff6b6b"
                          : "url(#tealGradient)"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RIGHT - EXPORT CARD */}
        <div className="bg-[#00b3a4] rounded-3xl shadow-lg p-8 w-full md:w-[35%] text-white">
          <h2 className="text-2xl font-semibold mb-3">Export Reports</h2>
          <p className="text-white/90 text-sm mb-6 leading-relaxed">
            Download diagnostic, billing, and financial summaries in Excel
            format for backup or reporting purposes.
          </p>

          {/* Select Inputs */}
          <div className="space-y-4">
            <div className="relative">
              <Calendar
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
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

            <div className="relative">
              <Calendar
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
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

          {/* Message */}
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
