import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./components/HomePage/LandingPage";
import BloodBankLogin from "./components/BloodBankLogin";
import DonorRegister from "./components/DonorRegister";

import AdminDashboard from "./components/Admin/AdminDashboard";
import HospitalDashboard from "./components/HB/HospitalDashboard";
import DonorDashboard from "./components/Donor/DonorDashboard";

function App() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth Pages */}
      <Route path="/login" element={<BloodBankLogin />} />
      <Route path="/register" element={<DonorRegister />} />

      {/* Dashboards */}
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/donor-dashboard" element={<DonorDashboard />} />
      <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
    </Routes>
  );
}

export default App;
