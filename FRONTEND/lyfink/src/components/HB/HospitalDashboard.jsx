import React, { useState } from "react";
import {
  LayoutDashboard,
  Droplet,
  ClipboardList,
  FileText,
} from "lucide-react";

import Dashboard from "./Dashboard";
import RequestBlood from "./RequestBlood";
import BloodStock from "./BloodStock";
import PatientRecords from "./BloodResponse";
import DonationCamp from "./DonationCamp";

import LogoutButton from "../LogoutButton";

import "./Style.css";
import authService from "../../services/authService";

export default function HospitalDashboard() {
  const [page, setPage] = useState("request");

  const user = authService.getCurrentUser();

  return (
    <div className="admin-wrapper">
      {/* ✅ Top Bar */}
      <header className="admin-topbar">
        <div className="admin-logo">
          <h1>Hello {user.name}</h1>
        </div>

        {/* ✅ Only Logout Button */}
        <div className="admin-icons">
          <LogoutButton className="btn btn-sm btn-danger me-3" />
        </div>
      </header>

      {/* ✅ Main Layout */}
      <div className="admin-main">
        {/* ✅ Sidebar */}
        <aside className="admin-sidebar">
          {/* Dashboard */}
          <button
            className={page === "dashboard" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("dashboard")}
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>

          {/* Request Blood */}
          <button
            className={page === "request" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("request")}
          >
            <Droplet size={18} /> Request Blood
          </button>

          {/* Blood Stock */}
          <button
            className={page === "stock" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("stock")}
          >
            <ClipboardList size={18} /> Check Blood Stock
          </button>

          {/* Blood Req Response */}
          <button
            className={page === "patients" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("patients")}
          >
            <FileText size={18} /> Blood Req-Response
          </button>

          {/* Donation Camps */}
          <button
            className={page === "camps" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("camps")}
          >
            <ClipboardList size={18} /> DonationCamps
          </button>
        </aside>

        {/* ✅ Page Content */}
        <section className="admin-content">
          {page === "dashboard" && <Dashboard />}

          {page === "request" && <RequestBlood />}

          {page === "stock" && <BloodStock />}

          {page === "patients" && <PatientRecords />}

          {page === "camps" && <DonationCamp />}
        </section>
      </div>
    </div>
  );
}
