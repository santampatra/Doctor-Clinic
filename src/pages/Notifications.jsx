"use client";
import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Notifications() {
  const [patientId, setPatientId] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");
  const [sendToAll, setSendToAll] = useState(false); // ✅ New toggle state

  // ✅ Handle Send
  const handleSend = async () => {
    if (!message.trim()) {
      setStatus("⚠️ Please enter a message first.");
      return;
    }

    if (!sendToAll && !patientId.trim()) {
      setStatus("⚠️ Please enter a Patient ID.");
      return;
    }

    setSending(true);
    setStatus("");

    try {
      // ✅ Future Integration with Backend
      // const url = sendToAll
      //   ? "http://localhost:5000/api/notifications/send-all"
      //   : `http://localhost:5000/api/notifications/send/${patientId}`;
      //
      // await fetch(url, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ message }),
      // });

      console.log(
        sendToAll
          ? "Notification sent to ALL users"
          : `Notification sent to Patient ID: ${patientId}`,
        "\nMessage:",
        message
      );

      setTimeout(() => {
        setSending(false);
        setStatus(
          sendToAll
            ? "✅ Notification sent to all users successfully!"
            : `✅ Notification sent to patient ID: ${patientId}`
        );
        setMessage("");
        setPatientId("");
      }, 900);
    } catch (error) {
      console.error(error);
      setStatus("❌ Failed to send notification. Try again.");
      setSending(false);
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
      <div className="flex-1 ml-60 mt-[64px] p-8 flex justify-center items-center">
        <div className="bg-[#00b3a4] rounded-3xl shadow-lg text-center py-8 px-10 sm:px-14 md:px-20 w-full max-w-2xl">
          <h2 className="text-white text-3xl sm:text-4xl font-semibold mb-8">
            Notification
          </h2>

          {/* Patient ID Section */}
          <div className="flex justify-center items-center space-x-2 mb-6">
            <input
              type="text"
              placeholder="Enter Patient ID"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              disabled={sendToAll}
              className={`w-64 sm:w-80 p-2.5 rounded-full text-center ${
                sendToAll
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-800"
              } placeholder-gray-500 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004d46]`}
            />

            {/* ✅ Checkbox to toggle Send to All */}
            <button
              onClick={() => setSendToAll(!sendToAll)}
              className={`w-9 h-9 flex items-center justify-center rounded-full shadow-md text-white text-lg transition-all ${
                sendToAll
                  ? "bg-[#004d46] hover:bg-[#003a36]"
                  : "bg-gray-400 hover:bg-gray-500"
              }`}
              title={
                sendToAll
                  ? "Currently sending to all users"
                  : "Send only to entered Patient ID"
              }
            >
              ✔️
            </button>
          </div>

          {/* Message Box */}
          <textarea
            placeholder="Enter The Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            className="w-full rounded-lg p-3 text-gray-800 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004d46] resize-none"
          ></textarea>

          {/* Send Notification Button */}
          <div className="mt-6">
            <button
              onClick={handleSend}
              disabled={sending}
              className={`${
                sending ? "opacity-70 cursor-not-allowed" : ""
              } bg-[#004d46] hover:bg-[#003a36] text-white px-8 py-2.5 rounded-md text-sm transition-all shadow-md`}
            >
              {sending
                ? "Sending..."
                : sendToAll
                ? "Send To All Users →"
                : "Send Notification →"}
            </button>
          </div>

          {/* STATUS MESSAGE */}
          {status && (
            <p className="mt-5 text-white/90 bg-white/10 px-3 py-2 rounded-md text-sm w-64 sm:w-80 md:w-96 mx-auto">
              {status}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
