"use client";
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Edit3 } from "lucide-react";

export default function PatientProfile() {
  const { id } = useParams(); // e.g. P1001
  const location = useLocation();
  const [patient, setPatient] = useState(location.state || null);
  const [daysRemaining, setDaysRemaining] = useState(7);
  const [paymentHistory, setPaymentHistory] = useState([
    { date: "10/10/2025", amount: 1000, status: "Pay" },
    { date: "11/10/2025", amount: 800, status: "Pay" },
    { date: "12/10/2025", amount: 600, status: "Pay" },
  ]);

  // ✅ Future Integration: Fetch patient from MongoDB if opened directly
  // Example:
  // useEffect(() => {
  //   if (!patient && id) {
  //     fetch(`http://localhost:5000/api/patients/${id}`)
  //       .then((res) => res.json())
  //       .then((data) => setPatient(data))
  //       .catch((err) => console.error(err));
  //   }
  // }, [id, patient]);

  // ✅ Temporary Local Fallback: Find patient from static list
  useEffect(() => {
    if (!patient && id) {
      const dummyPatients = [
        {
          id: "DC-2025-001",
          patientCode: "P1001",
          name: "John Doe",
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
          address:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, Sed do eiusmod tempor incididunt ut labore.",
        },
      ];
      const found = dummyPatients.find(
        (p) => p.patientCode.toLowerCase() === id.toLowerCase()
      );
      setPatient(found || null);
    }
  }, [id, patient]);

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
      <div className="flex-1 ml-60 mt-[64px] p-6">
        {!patient ? (
          <div className="text-gray-600 text-center mt-20">
            <h2 className="text-xl font-semibold">No Patient Found</h2>
            <p className="text-sm mt-2">
              Try searching again or check the patient code.
            </p>
          </div>
        ) : (
          <>
            {/* PATIENT HEADER CARD */}
            <div className="bg-[#00b3a4] text-white p-6 rounded-xl shadow-md flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img
                  src="/profile.jpg" // replace with your patient profile image path
                  alt="Patient"
                  className="w-16 h-16 rounded-full object-cover border-2 border-white"
                />
                <div>
                  <h2 className="text-xl font-semibold">Hi, {patient.name}</h2>
                  <p className="text-sm text-white/90 mt-1 max-w-md">
                    {patient.address}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <h3 className="text-sm">Due Balance :</h3>
                <h2 className="text-2xl font-bold">₹{patient.due}</h2>
                <button className="mt-2 bg-white text-[#00b3a4] px-3 py-1 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-[#f0fdfa] transition-all mx-auto">
                  <Edit3 size={15} /> Edit Balance
                </button>
              </div>
            </div>

            {/* PERSONAL + CONTACT SECTIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Personal Information */}
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h3 className="text-gray-800 font-semibold mb-3">
                  Personal Information
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                  <p><b>Full Name:</b> {patient.name}</p>
                  <p><b>Reg No:</b> {patient.patientCode}</p>
                  <p><b>Gender:</b> {patient.gender}</p>
                  <p><b>Marital:</b> {patient.maritalStatus}</p>
                  <p><b>DOB:</b> {patient.dob}</p>
                  <p><b>Height:</b> {patient.height}</p>
                  <p><b>Age:</b> {patient.age}</p>
                  <p><b>Weight:</b> {patient.weight}</p>
                  <p><b>Blood Group:</b> {patient.bloodGroup}</p>
                  <p><b>Last Visit:</b> {patient.lastVisit}</p>
                  <p><b>Next Visit:</b> {patient.nextVisit}</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h3 className="text-gray-800 font-semibold mb-3">
                  Contact Information
                </h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><b>Address:</b> {patient.address}</p>
                  <p><b>Email:</b> {patient.email}</p>
                  <p><b>Phone:</b> {patient.phone}</p>
                  <p><b>Alternate Phone:</b> +91 7439532723</p>
                </div>
              </div>
            </div>

            {/* ATTENDANCE & PAYMENTS + DAYS REMAINING */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Attendance & Payments */}
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h3 className="text-gray-800 font-semibold mb-3">
                  Attendance & Payments
                </h3>
                <div className="flex items-center space-x-2 mb-4">
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm w-40 focus:ring-2 focus:ring-[#00b3a4] focus:outline-none"
                  />
                  <button className="bg-[#00b3a4] hover:bg-[#009589] text-white px-4 py-2 text-sm rounded-md">
                    Pay
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm rounded-md">
                    Due
                  </button>
                </div>

                <table className="min-w-full text-sm text-gray-700 border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left py-2 px-3">Date</th>
                      <th className="text-left py-2 px-3">Amount</th>
                      <th className="text-left py-2 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentHistory.map((p, i) => (
                      <tr key={i} className="border-t">
                        <td className="py-2 px-3">{p.date}</td>
                        <td className="py-2 px-3">₹{p.amount}</td>
                        <td className="py-2 px-3 text-[#00b3a4] font-medium">{p.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Days Remaining */}
              <div className="bg-[#00b3a4] text-white rounded-lg p-6 shadow-md flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{daysRemaining} Days</h3>
                  <p className="text-sm text-white/80">Remaining</p>
                </div>
                <div className="flex items-center mt-4 space-x-2">
                  <input
                    type="number"
                    placeholder="Enter Days"
                    value={daysRemaining}
                    onChange={(e) => setDaysRemaining(e.target.value)}
                    className="px-3 py-2 rounded-md text-sm text-gray-800 focus:ring-2 focus:ring-[#004d46] outline-none w-28"
                  />
                  <button className="bg-white text-[#00b3a4] px-3 py-2 rounded-md text-sm font-medium hover:bg-[#f0fdfa] transition-all">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
