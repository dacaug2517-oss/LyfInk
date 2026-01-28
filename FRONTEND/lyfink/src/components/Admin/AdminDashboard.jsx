import React, { useState } from "react";
import "../../style/admin.css";

import ManageDonor from "./ManageDonor";
import InventoryManagement from "./InventoryManagement";
import BloodRequest from "./BloodRequest";
import ReportAnalysis from "./ReportAnalysis";

import {
  LayoutDashboard,
  Users,
  Droplet,
  FileText,
  BarChart3,
  Settings,
  Bell,
} from "lucide-react";

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("donors");

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user session
    alert("Logged out successfully!");

    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div className="admin-wrapper">
      {/* ===== TOP HEADER BAR ===== */}
      <header className="admin-topbar">
        <div className="admin-logo">
          <div className="avatar-circle"></div>
          <h1>Admin Dashboard</h1>
        </div>

        <div className="admin-icons">
          <Bell size={20} />
          <span className="notif-badge">5</span>
        </div>
      </header>

      {/* ===== MAIN SECTION ===== */}
      <div className="admin-main">
        {/* ===== SIDEBAR ===== */}
        <aside className="admin-sidebar">
          <button
            className={activePage === "dashboard" ? "nav-btn active" : "nav-btn"}
            onClick={() => setActivePage("dashboard")}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button
            className={activePage === "donors" ? "nav-btn active" : "nav-btn"}
            onClick={() => setActivePage("donors")}
          >
            <Users size={18} />
            Manage Donors
          </button>

          <button
            className={
              activePage === "inventory" ? "nav-btn active" : "nav-btn"
            }
            onClick={() => setActivePage("inventory")}
          >
            <Droplet size={18} />
            Inventory Management
          </button>

          <button
            className={activePage === "requests" ? "nav-btn active" : "nav-btn"}
            onClick={() => setActivePage("requests")}
          >
            <FileText size={18} />
            Blood Requests
          </button>

          <button
            className={activePage === "reports" ? "nav-btn active" : "nav-btn"}
            onClick={() => setActivePage("reports")}
          >
            <BarChart3 size={18} />
            Reports & Analytics
          </button>

          {/* ✅ SETTINGS BUTTON */}
          <div className="sidebar-bottom">
            <button
              className={activePage === "settings" ? "nav-btn active" : "nav-btn"}
              onClick={() => setActivePage("settings")}
            >
              <Settings size={18} />
              Settings
            </button>
          </div>
        </aside>

        {/* ===== CONTENT PANEL ===== */}
        <section className="admin-content">
          {/* DONOR PAGE */}
          {activePage === "donors" && <ManageDonor />}

          {/* INVENTORY PAGE */}
          {activePage === "inventory" && <InventoryManagement />}

          {/* REQUEST PAGE */}
          {activePage === "requests" && <BloodRequest />}

          {/* REPORT PAGE */}
          {activePage === "reports" && <ReportAnalysis />}

          {/* ✅ SETTINGS PAGE */}
          {activePage === "settings" && (
            <div className="settings-page">
              <h2>⚙ Admin Settings</h2>

              {/* PROFILE SECTION */}
              <div className="profile-box">
                <h3>👤 Profile Details</h3>
                <p>
                  <b>Name:</b> Admin User
                </p>
                <p>
                  <b>Email:</b> admin@gmail.com
                </p>
                <p>
                  <b>Role:</b> System Administrator
                </p>
              </div>

              {/* LOGOUT BUTTON */}
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
