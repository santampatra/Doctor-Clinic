"use client";
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import DoctorLogin from "./pages/DoctorLogin";
import AllPatients from "./pages/AllPatients";
import PatientProfile from "./pages/PatientProfile";
import AddPatient from "./pages/AddPatient";
import Notifications from "./pages/Notifications";
import ReportGenerator from "./pages/ReportGenerator";

// ✅ Protected Route Wrapper — only logged-in doctors can access
const ProtectedRoute = ({ children }) => {
  const doctorAuth = localStorage.getItem("doctorAuth");
  return doctorAuth ? children : <Navigate to="/" replace />;
};

// ✅ Public Route Wrapper — redirect if already logged in
const PublicRoute = ({ children }) => {
  const doctorAuth = localStorage.getItem("doctorAuth");
  return doctorAuth ? <Navigate to="/allpatients" replace /> : children;
};

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes location={location} key={location.pathname}>
        
        {/* 🟩 Doctor Login (Public Route) */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <DoctorLogin />
            </PublicRoute>
          }
        />

        {/* 🟩 All Patients Page (Protected Route) */}
        <Route
          path="/allpatients"
          element={
            <ProtectedRoute>
              <AllPatients />
            </ProtectedRoute>
          }
        />

        {/* 🟩 Dynamic Patient Profile Page (Protected Route) */}
        <Route
          path="/patient/:id"
          element={
            <ProtectedRoute>
              <PatientProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addpatient"
          element={
            <ProtectedRoute>
              <AddPatient />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/financialreports"
          element={
            <ProtectedRoute>
              <ReportGenerator />
            </ProtectedRoute>
          }
        />

        {/* 🟥 Fallback for undefined routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
