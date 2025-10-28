"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Edit3 } from "lucide-react";

export default function PatientProfile() {
  const { id } = useParams();
  const location = useLocation();
  const [patient, setPatient] = useState(location.state || null);
  const [daysRemaining, setDaysRemaining] = useState(7);
  const [isEditingDays, setIsEditingDays] = useState(false);
  const [isEditingBalance, setIsEditingBalance] = useState(false);
  const [newDue, setNewDue] = useState("");
  const [isEditingAttendance, setIsEditingAttendance] = useState(false);
  const [isEditingPayments, setIsEditingPayments] = useState(false);

  const daysInputRef = useRef(null);

  const [paymentHistory, setPaymentHistory] = useState([
    { date: "10/10/2025", amount: 1000, status: "Pay" },
    { date: "11/10/2025", amount: 1200, status: "Due" },
    { date: "12/10/2025", amount: 800, status: "Pay" },
  ]);

  const [attendanceHistory, setAttendanceHistory] = useState([
    { date: "10/10/2025", time: "10:00 AM" },
    { date: "09/10/2025", time: "12:00 PM" },
    { date: "08/10/2025", time: "01:00 PM" },
  ]);

  // ✅ Fetch patient from backend (future)
  useEffect(() => {
    if (!patient && id) {
      const dummyPatients = [
        {
          id: "DC-2025-001",
          patientCode: "P1001",
          name: "John Doe",
          phone: "9999999999",
          email: "ayanchakraborty2004@gmail.com",
          due: 5500,
          lastVisit: "10/10/2025",
          nextVisit: "17/12/2025",
          gender: "Male",
          dob: "11/02/2004",
          age: 21,
          bloodGroup: "O+",
          height: "176cm",
          weight: "64kg",
          maritalStatus: "Unmarried",
          address: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
      ];
      const found = dummyPatients.find(
        (p) => p.patientCode.toLowerCase() === id.toLowerCase()
      );
      setPatient(found || null);
    }
  }, [id, patient]);

  // ✅ Update Due Balance
  const handleSaveBalance = async () => {
    const updatedDue = parseInt(newDue);
    if (isNaN(updatedDue) || updatedDue < 0) {
      alert("Please enter a valid amount");
      return;
    }

    setPatient((prev) => ({ ...prev, due: updatedDue }));
    setIsEditingBalance(false);
    setNewDue("");
    alert("✅ Due balance updated successfully!");
  };

  // ✅ Record Attendance
  const handleAttendance = async () => {
    const now = new Date();
    const newRecord = {
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setAttendanceHistory((prev) => [newRecord, ...prev]);
  };

  // ✅ Save Days Remaining
  const handleSaveDays = async () => {
    setIsEditingDays(false);
    alert(`✅ Days remaining updated to ${daysRemaining}`);
  };

  // ✅ Toggle edit mode for payments
  const toggleEditPayments = () => {
    setIsEditingPayments((prev) => !prev);
  };

  // ✅ Toggle edit mode for attendance
  const toggleEditAttendance = () => {
    setIsEditingAttendance((prev) => !prev);
  };

  // ✅ Update payment row inline
  const handlePaymentEdit = (index, key, value) => {
    const updated = [...paymentHistory];
    updated[index][key] = value;
    setPaymentHistory(updated);
  };

  // ✅ Update attendance row inline
  const handleAttendanceEdit = (index, key, value) => {
    const updated = [...attendanceHistory];
    updated[index][key] = value;
    setAttendanceHistory(updated);
  };

  // ✅ Focus input automatically when editing
  useEffect(() => {
    if (isEditingDays && daysInputRef.current) {
      daysInputRef.current.focus();
    }
  }, [isEditingDays]);

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
      <div className="flex-1 ml-60 mt-[64px] p-6">
        {!patient ? (
          <div className="text-gray-600 text-center mt-20">
            <h2 className="text-xl font-semibold">No Patient Found</h2>
            <p className="text-sm mt-2">Try searching again or check the ID.</p>
          </div>
        ) : (
          <>
            {/* HEADER CARD */}
            <div className="bg-[#00b3a4] text-white p-6 rounded-xl shadow-md flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img
                  src="/profile.jpg"
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
                <h3 className="text-sm mb-1">Due Balance :</h3>

                {isEditingBalance ? (
                  <div className="flex flex-col items-end space-y-2">
                    <input
                      type="number"
                      value={newDue}
                      onChange={(e) => setNewDue(e.target.value)}
                      placeholder={`₹${patient.due}`}
                      className="px-2 py-1 w-28 text-gray-800 text-center rounded-md border border-gray-300 focus:ring-2 focus:ring-[#00b3a4] outline-none"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveBalance}
                        className="bg-white text-[#00b3a4] px-2 py-1 text-xs rounded-md font-medium hover:bg-[#f0fdfa]"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setIsEditingBalance(false);
                          setNewDue("");
                        }}
                        className="bg-red-500 text-white px-2 py-1 text-xs rounded-md hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold">₹{patient.due}</h2>
                    <button
                      onClick={() => {
                        setIsEditingBalance(true);
                        setNewDue(patient.due);
                      }}
                      className="mt-2 bg-white text-[#00b3a4] px-3 py-1 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-[#f0fdfa] transition-all mx-auto"
                    >
                      <Edit3 size={15} /> Edit Balance →
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* PERSONAL + CONTACT SECTIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Personal Info */}
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

              {/* Contact Info */}
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h3 className="text-gray-800 font-semibold mb-3">
                  Contact Information
                </h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><b>Address:</b> {patient.address}</p>
                  <p><b>Email:</b> {patient.email}</p>
                  <p><b>Phone:</b> {patient.phone}</p>
                  <p><b>Alternate Phone:</b> +91 7439537213</p>
                </div>
              </div>
            </div>

            {/* ATTENDANCE + DAYS REMAINING */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Attendance & Payments */}
              <div className="bg-[#00b3a4] text-white border rounded-lg p-5 shadow-md">
                <h3 className="text-lg font-semibold mb-4">
                  Attendance & Payments
                </h3>

                <div className="flex items-center space-x-2 mb-4">
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm w-40 text-gray-800 focus:ring-2 focus:ring-[#004d46] outline-none"
                  />
                  <button className="bg-[#008173] hover:bg-[#006e62] text-white px-4 py-2 text-sm font-medium rounded-md transition-all">
                    Pay
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm rounded-md transition-all">
                    Due
                  </button>
                </div>
              </div>

              {/* Days Remaining */}
              <div className="bg-[#00b3a4] text-white rounded-lg p-5 shadow-md flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">{daysRemaining} Days</h3>
                  <p className="text-sm text-white/80">Remaining</p>
                </div>

                <div className="flex items-center mt-4 space-x-2">
                  <input
                    ref={daysInputRef}
                    type="number"
                    placeholder="Enter Days"
                    value={daysRemaining}
                    onChange={(e) => setDaysRemaining(e.target.value)}
                    disabled={!isEditingDays}
                    className={`px-3 py-2 rounded-md text-sm w-28 outline-none ${
                      isEditingDays
                        ? "bg-white text-gray-800 border-2 border-[#008173] focus:ring-2 focus:ring-[#008173]"
                        : "bg-gray-100 text-gray-600 cursor-not-allowed border border-gray-300"
                    }`}
                  />
                  {isEditingDays ? (
                    <button
                      onClick={handleSaveDays}
                      className="bg-[#008173] hover:bg-[#006e62] text-white px-3 py-2 rounded-md text-sm font-medium transition-all"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditingDays(true)}
                      className="bg-white text-[#00b3a4] px-3 py-2 rounded-md text-sm font-medium hover:bg-[#f0fdfa] transition-all"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={handleAttendance}
                    className="bg-[#008173] hover:bg-[#006e62] text-white px-3 py-2 rounded-md text-sm font-medium transition-all"
                  >
                    Attendance +
                  </button>
                </div>
              </div>
            </div>

            {/* PAYMENT HISTORY + ATTENDANCE TABLES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Payment History */}
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-gray-800 font-semibold">Payment History</h4>
                  <button
                    onClick={toggleEditPayments}
                    className="text-sm text-[#00b3a4] hover:underline"
                  >
                    {isEditingPayments ? "Save" : "Edit"}
                  </button>
                </div>

                <table className="min-w-full text-sm text-gray-700 border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-3 text-left">Date</th>
                      <th className="py-2 px-3 text-left">Amount</th>
                      <th className="py-2 px-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentHistory.map((p, i) => (
                      <tr key={i} className="border-t">
                        <td className="py-2 px-3">
                          {isEditingPayments ? (
                            <input
                              value={p.date}
                              onChange={(e) =>
                                handlePaymentEdit(i, "date", e.target.value)
                              }
                              className="border p-1 rounded w-full text-xs"
                            />
                          ) : (
                            p.date
                          )}
                        </td>
                        <td className="py-2 px-3">
                          {isEditingPayments ? (
                            <input
                              type="number"
                              value={p.amount}
                              onChange={(e) =>
                                handlePaymentEdit(i, "amount", e.target.value)
                              }
                              className="border p-1 rounded w-full text-xs"
                            />
                          ) : (
                            `₹${p.amount}`
                          )}
                        </td>
                        <td
                          className={`py-2 px-3 font-medium ${
                            p.status === "Pay"
                              ? "text-[#00b3a4]"
                              : "text-red-500"
                          }`}
                        >
                          {isEditingPayments ? (
                            <select
                              value={p.status}
                              onChange={(e) =>
                                handlePaymentEdit(i, "status", e.target.value)
                              }
                              className="border p-1 rounded text-xs"
                            >
                              <option>Pay</option>
                              <option>Due</option>
                            </select>
                          ) : (
                            p.status
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Attendance History */}
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-gray-800 font-semibold">
                    Attendance History
                  </h4>
                  <button
                    onClick={toggleEditAttendance}
                    className="text-sm text-[#00b3a4] hover:underline"
                  >
                    {isEditingAttendance ? "Save" : "Edit"}
                  </button>
                </div>

                <table className="min-w-full text-sm text-gray-700 border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-3 text-left">Date</th>
                      <th className="py-2 px-3 text-left">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceHistory.map((a, i) => (
                      <tr key={i} className="border-t">
                        <td className="py-2 px-3">
                          {isEditingAttendance ? (
                            <input
                              value={a.date}
                              onChange={(e) =>
                                handleAttendanceEdit(i, "date", e.target.value)
                              }
                              className="border p-1 rounded w-full text-xs"
                            />
                          ) : (
                            a.date
                          )}
                        </td>
                        <td className="py-2 px-3">
                          {isEditingAttendance ? (
                            <input
                              value={a.time}
                              onChange={(e) =>
                                handleAttendanceEdit(i, "time", e.target.value)
                              }
                              className="border p-1 rounded w-full text-xs"
                            />
                          ) : (
                            a.time
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
