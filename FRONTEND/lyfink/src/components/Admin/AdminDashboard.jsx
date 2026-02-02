import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../style/admin.css";

import InventoryManagement from "./InventoryManagement";
import ReportAnalysis from "./ReportAnalysis";
import HospitalManagement from "./HospitalManagement";
import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Droplet,
  BarChart3,
  Settings,
  Hospital,
  Bell,
} from "lucide-react";

import LogoutButton from "../LogoutButton";

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [adminData, setAdminData] = useState(null);

  // ✅ Donation Camps State
  const [camps, setCamps] = useState([]);
  const [loadingCamps, setLoadingCamps] = useState(true);

  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // ✅ Fetch Admin Details
  useEffect(() => {
    if (storedUser?.userid) {
      axios
        .get(`http://localhost:5048/api/User/${storedUser.userid}`)
        .then((res) => setAdminData(res.data))
        .catch((err) => console.log(err));
    }
  }, []);

  // ✅ Fetch Donation Camps for Dashboard
  useEffect(() => {
    if (storedUser?.userid) {
      axios
        .get(`http://localhost:5048/api/DonationCamp/admin/${storedUser.userid}`)
        .then((res) => {
          console.log("Dashboard Camps:", res.data);
          setCamps(res.data);
          setLoadingCamps(false);
        })
        .catch((err) => {
          console.log("Camp Fetch Error:", err);
          setLoadingCamps(false);
        });
    }
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // ✅ Register Button Click
  const handleRegister = () => {
    navigate("/register-hospital");
  };

  return (
    <div className="admin-wrapper">
      {/* Top Bar */}
      <header className="admin-topbar">
        <div className="admin-logo">
          <h1>
            Admin Dashboard -{" "}
            {adminData ? adminData.firstname : "Loading..."}
          </h1>
        </div>



        <div className="admin-icons">
          <button className="register-btn" onClick={handleRegister}>
            + Register
          </button>

          <LogoutButton className="btn btn-sm btn-danger mx-3" />

          <div className="notif-icon">
            <Bell size={20} />
            <span className="notif-badge">3</span>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="admin-main">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <button
            className={activePage === "dashboard" ? "nav-btn active" : "nav-btn"}
            onClick={() => setActivePage("dashboard")}
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>

          <button
            className={activePage === "hospitals" ? "nav-btn active" : "nav-btn"}
            onClick={() => setActivePage("hospitals")}
          >
            <Hospital size={18} /> Hospitals
          </button>

          <button
            className={activePage === "inventory" ? "nav-btn active" : "nav-btn"}
            onClick={() => setActivePage("inventory")}
          >
            <Droplet size={18} /> Inventory
          </button>

          <button
            className={activePage === "reports" ? "nav-btn active" : "nav-btn"}
            onClick={() => setActivePage("reports")}
          >
            <BarChart3 size={18} /> Reports
          </button>

          <div className="sidebar-bottom">
            <button
              className={
                activePage === "settings" ? "nav-btn active" : "nav-btn"
              }
              onClick={() => setActivePage("settings")}
            >
              <Settings size={18} /> Settings
            </button>
          </div>
        </aside>

        {/* Content */}
        <section className="admin-content">
          {/* ✅ Dashboard Page */}
          {activePage === "dashboard" && (
            <div className="page-box">
              <h2>
                Welcome {adminData ? adminData.firstname : "Admin"} 👋
              </h2>

              {/* ✅ Donation Camps Section */}
              <h3 style={{ marginTop: "30px" }}>
                🏕 Available Donation Camps
              </h3>

              {loadingCamps ? (
                <p>Loading Camps...</p>
              ) : camps.length > 0 ? (
                <div className="camp-grid">
                  {camps.slice(0, 6).map((camp) => (
                    <div key={camp.cid} className="camp-card">
                      <h4 className="camp-title">{camp.campName}</h4>

                      <p>
                        <b>📍 Venue:</b> {camp.venue}
                      </p>

                      <p>
                        <b>📅 Date:</b> {camp.date}
                      </p>

                      <p>
                        <b>👤 Contact:</b> {camp.contactPerson}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ marginTop: "10px" }}>
                  No Donation Camps Available
                </p>
              )}
            </div>
          )}

          {/* Hospital Page */}
          {activePage === "hospitals" && <HospitalManagement />}

          {/* Inventory */}
          {activePage === "inventory" && <InventoryManagement />}

          {/* Reports */}
          {activePage === "reports" && <ReportAnalysis />}

          {/* Settings */}
          {activePage === "settings" && (
            <div className="settings-page">
              <h2>⚙ Admin Settings</h2>

              <div className="profile-box">
                <p>
                  <b>Name:</b>{" "}
                  {adminData
                    ? adminData.firstname + " " + adminData.lastname
                    : "Loading..."}
                </p>

                <p>
                  <b>Email:</b> {adminData ? adminData.email : "Loading..."}
                </p>

                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
