"use client";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function AllPatients() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  // ✅ Protect Route: Redirect if not logged in
  useEffect(() => {
    const doctorAuth = localStorage.getItem("doctorAuth");
    if (!doctorAuth) navigate("/");
  }, [navigate]);

  // ✅ Static dummy patient data
  useEffect(() => {
    setPatients([
      {
        patientId: "P1001",
        name: "Mr. Souvik Patra",
        phone: "9999999999",
        email: "example@email.com",
        due: "5500",
        lastVisit: "10/10/2025",
        gender: "Male",
        dob: "11/02/2004",
        age: 21,
        bloodGroup: "O+",
        height: "176cm",
        weight: "64kg",
        maritalStatus: "Unmarried",
        address: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      },
      {
        patientId: "P1002",
        name: "Mr. Sakti Dey",
        phone: "8888888888",
        email: "jane@example.com",
        due: "6500",
        lastVisit: "09/10/2025",
        gender: "Female",
        dob: "10/05/2001",
        age: 24,
        bloodGroup: "A+",
        height: "165cm",
        weight: "56kg",
        maritalStatus: "Married",
        address: "123 Street, New York City",
      },
      {
        patientId: "P1003",
        name: "Mr. Sourav Ray",
        phone: "7777777777",
        email: "alex@example.com",
        due: "4500",
        lastVisit: "11/10/2025",
        gender: "Male",
        dob: "05/07/2003",
        age: 22,
        bloodGroup: "B+",
        height: "172cm",
        weight: "68kg",
        maritalStatus: "Single",
        address: "Apartment 4B, Los Angeles, CA",
      },
    ]);
  }, []);

  // ✅ Handle "View" button → Go to Patient Profile
  const handleView = (patient) => {
    navigate(`/patient/${patient.patientId}`, { state: patient });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 font-century">
      {/* HEADER */}
      <div className="fixed top-0 left-0 w-full z-20">
        <Header showLogout />
      </div>

      {/* SIDEBAR */}
      <div className="hidden md:block fixed top-[64px] left-0 w-60 h-[calc(100vh-64px)] bg-white shadow-md z-10 overflow-y-auto">
        <Sidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 md:ml-60 mt-[64px] p-4 sm:p-6">
        <h2 className="text-gray-700 text-lg font-semibold mb-6 border-b pb-3">
          All Patients
        </h2>

        {/* DESKTOP TABLE VIEW */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm font-medium">
                <th className="py-3 px-4 text-left border-b">Patient ID</th>
                <th className="py-3 px-4 text-left border-b">Patient Name</th>
                <th className="py-3 px-4 text-left border-b">Phone</th>
                <th className="py-3 px-4 text-left border-b">Email</th>
                <th className="py-3 px-4 text-left border-b">Due Balance</th>
                <th className="py-3 px-4 text-left border-b">Last Visit</th>
                <th className="py-3 px-4 text-center border-b">Action</th>
              </tr>
            </thead>

            <tbody>
              {patients.map((p, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 text-gray-700 text-sm border-b transition-all"
                >
                  <td className="py-3 px-4">{p.patientId}</td>
                  <td className="py-3 px-4">{p.name}</td>
                  <td className="py-3 px-4">{p.phone}</td>
                  <td className="py-3 px-4">{p.email}</td>
                  <td className="py-3 px-4 text-[#00b3a4] font-semibold">₹{p.due}</td>
                  <td className="py-3 px-4">{p.lastVisit}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleView(p)}
                      className="bg-[#00b3a4] hover:bg-[#009589] text-white px-4 py-1 rounded-md text-sm transition-all"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {patients.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center text-gray-500 py-6 text-sm"
                  >
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARD VIEW */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {patients.map((p, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-[#00b3a4]">{p.name}</h3>
                <span className="text-xs bg-[#00b3a4]/10 text-[#00b3a4] px-2 py-1 rounded-full">
                  {p.patientId}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                <b>Phone:</b> {p.phone}
              </p>
              <p className="text-sm text-gray-600">
                <b>Email:</b> {p.email}
              </p>
              <p className="text-sm text-gray-600">
                <b>Due:</b> ₹{p.due}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                <b>Last Visit:</b> {p.lastVisit}
              </p>
              <button
                onClick={() => handleView(p)}
                className="w-full bg-[#00b3a4] hover:bg-[#009589] text-white py-2 rounded-md text-sm font-medium transition-all"
              >
                View Profile
              </button>
            </div>
          ))}

          {patients.length === 0 && (
            <p className="text-center text-gray-500 text-sm">
              No patients found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
