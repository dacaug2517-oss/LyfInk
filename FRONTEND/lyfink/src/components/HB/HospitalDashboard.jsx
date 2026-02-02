
import React, { useState } from "react";
import {
  LayoutDashboard,
  Droplet,
  ClipboardList,
  FileText,
  Truck,
  Settings,
  Bell,
  User,
} from "lucide-react";

import Dashboard from "./Dashboard";
import RequestBlood from "./RequestBlood";
import BloodStock from "./BloodStock";
import PatientRecords from "./BloodResponse";
import OrderFulfillment from "./OrderFulfillment";
import DonationCamp from "./DonationCamp";

import LogoutButton from "../LogoutButton";

import "./Style.css";
import authService from "../../services/authService";

export default function HospitalDashboard() {
  const [page, setPage] = useState("request");
  const user = authService.getCurrentUser();
  return (
    <div className="admin-wrapper">
      {/* Top Bar - matching admin style */}
      <header className="admin-topbar">
        <div className="admin-logo">
          <h1>Hello {user.name}</h1>
        </div>

        <div className="admin-icons">
          <LogoutButton className="btn btn-sm btn-danger me-3" />

          {/* Notification Icon */}
          <div className="notif-icon">
            <Bell size={20} />
            <span className="notif-badge">4</span>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="admin-main">
        {/* Sidebar - matching admin style */}
        <aside className="admin-sidebar">
          <button
            className={page === "dashboard" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("dashboard")}
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>

          <button
            className={page === "request" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("request")}
          >
            <Droplet size={18} /> Request Blood
          </button>

          <button
            className={page === "stock" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("stock")}
          >
            <ClipboardList size={18} /> Check Blood Stock
          </button>

          <button
            className={page === "patients" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("patients")}
          >
            <FileText size={18} /> Blood Req-Response
          </button>

          <button
            className={page === "orders" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("orders")}
          >
            <Truck size={18} /> Order Fulfillment
          </button>

          <button
            className={page === "camps" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("camps")}
          >
            <ClipboardList size={18} /> DonationCamps
          </button>

          {/* Settings at bottom */}
          <div className="sidebar-bottom">
            <button
              className={page === "settings" ? "nav-btn active" : "nav-btn"}
              onClick={() => setPage("settings")}
            >
              <Settings size={18} /> System Settings
            </button>
          </div>
        </aside>

        {/* Content Area - matching admin style */}
        <section className="admin-content">
          {page === "dashboard" && <Dashboard />}
          {page === "request" && <RequestBlood />}
          {page === "stock" && <BloodStock />}
          {page === "patients" && <PatientRecords />}
          {page === "orders" && <OrderFulfillment />}
          {page === "camps" && <DonationCamp />}
          {page === "settings" && (
            <div className="page-box">
              <h2>⚙ System Settings</h2>
              <p>Configure your hospital settings here.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}