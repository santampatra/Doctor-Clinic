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

  // ✅ Future Integration:
  // Fetch patient list from MongoDB API here
  // Example:
  // useEffect(() => {
  //   fetch("http://localhost:5000/api/patients")
  //     .then((res) => res.json())
  //     .then((data) => setPatients(data))
  //     .catch((err) => console.error(err));
  // }, []);

  // ✅ Temporary static data for demo
  useEffect(() => {
    setPatients([
      {
        id: "DC-2025-001",
        patientCode: "P1001",
        name: "Mr. John Doe",
        phone: "9999999999",
        email: "example@email.com",
        due: "5500",
        lastVisit: "10/10/2025",
        nextVisit: "17/10/2025",
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
        id: "DC-2025-002",
        patientCode: "P1002",
        name: "Ms. Jane Smith",
        phone: "8888888888",
        email: "jane@example.com",
        due: "6500",
        lastVisit: "09/10/2025",
        nextVisit: "18/10/2025",
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
        id: "DC-2025-003",
        patientCode: "P1003",
        name: "Mr. Alex Ray",
        phone: "7777777777",
        email: "alex@example.com",
        due: "4500",
        lastVisit: "11/10/2025",
        nextVisit: "20/10/2025",
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

  // ✅ Handle "View" button click → Navigate to patient profile
  const handleView = (patient) => {
    navigate(`/patient/${patient.patientCode}`, { state: patient });
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-[Raleway]">
      {/* FIXED HEADER */}
      <div className="fixed top-0 left-0 w-full z-20">
        <Header showLogout />
      </div>

      {/* SIDEBAR (below header) */}
      <div className="fixed top-[64px] left-0 w-60 h-[calc(100vh-64px)] bg-white shadow-md z-10 overflow-y-auto">
        <Sidebar />
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 ml-60 mt-[64px] p-6">
        {/* PAGE TITLE */}
        <h2 className="text-gray-700 text-lg font-semibold mb-6 border-b pb-3">
          All Patients
        </h2>

        {/* PATIENTS TABLE */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm font-medium">
                <th className="py-3 px-4 text-left border-b">Patient Code</th>
                <th className="py-3 px-4 text-left border-b">Patient Name</th>
                <th className="py-3 px-4 text-left border-b">Phone</th>
                <th className="py-3 px-4 text-left border-b">Email</th>
                <th className="py-3 px-4 text-left border-b">Due Balance</th>
                <th className="py-3 px-4 text-left border-b">Last Visit Date</th>
                <th className="py-3 px-4 text-left border-b">Next Visit Date</th>
                <th className="py-3 px-4 text-center border-b">Action</th>
              </tr>
            </thead>

            <tbody>
              {patients.map((p, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 text-gray-700 text-sm border-b transition-all"
                >
                  <td className="py-3 px-4">{p.patientCode}</td>
                  <td className="py-3 px-4">{p.name}</td>
                  <td className="py-3 px-4">{p.phone}</td>
                  <td className="py-3 px-4">{p.email}</td>
                  <td className="py-3 px-4">{p.due}</td>
                  <td className="py-3 px-4">{p.lastVisit}</td>
                  <td className="py-3 px-4">{p.nextVisit}</td>
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

              {/* ✅ Show message if no data */}
              {patients.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center text-gray-500 py-6 text-sm"
                  >
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
