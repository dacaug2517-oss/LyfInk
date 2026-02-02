import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./components/HomePage/LandingPage";
import BloodBankLogin from "./components/BloodBankLogin";
import DonorRegister from "./components/DonorRegister";

import AdminDashboard from "./components/Admin/AdminDashboard";
import HospitalDashboard from "./components/HB/HospitalDashboard";
import DonorDashboard from "./components/Donor/DonorDashboard";

import RegisterHospital from "./components/Admin/RegisterHospital";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./components/Unauthorized";

function App() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth Pages */}
      <Route path="/login" element={<BloodBankLogin />} />
      <Route path="/register" element={<DonorRegister />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected Dashboards */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRoles={[1]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/donor-dashboard"
        element={
          <ProtectedRoute allowedRoles={[2]}>
            <DonorDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/hospital-dashboard"
        element={
          <ProtectedRoute allowedRoles={[3]}>
            <HospitalDashboard />
          </ProtectedRoute>
        }
      />

      {/* ✅ Register Hospital Page - Protected for Admin only */}
      <Route
        path="/register-hospital"
        element={
          <ProtectedRoute allowedRoles={[1]}>
            <RegisterHospital />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
