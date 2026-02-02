import React, { useState } from "react";

import {
  LayoutDashboard,
  Droplet,
  ClipboardList,
  HeartHandshake,
  CalendarDays,
  Bell,
  Settings,
} from "lucide-react";

import DonorProfile from "./DonorProfile";
import DonorEligibility from "./DonorEligibility";
import DonateBlood from "./DonateBlood";
import DonationHistory from "./DonationHistory";
import DonationCamps from "./DonationCamps";
import EditDonorProfile from "./EditDonorProfile";

import LogoutButton from "../LogoutButton";

export default function DonorDashboard() {
  const [page, setPage] = useState("profile");

  return (
    <div className="admin-wrapper">
      {/* Top Bar - matching admin style */}
      <header className="admin-topbar">
        <div className="admin-logo">
          <h1>Donor Panel</h1>
        </div>

        <div className="admin-icons">
          <LogoutButton className="btn btn-sm btn-danger me-3" />

          {/* Notification Icon */}
          <div className="notif-icon">
            <Bell size={20} />
            <span className="notif-badge">0</span>
          </div>
        </div>
      </header >

      {/* Main */}
      < div className="admin-main" >
        {/* Sidebar - matching admin style */}
        < aside className="admin-sidebar" >
          <button
            className={page === "profile" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("profile")}
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>

          <button
            className={page === "eligibility" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("eligibility")}
          >
            <Droplet size={18} /> Eligibility
          </button>

          <button
            className={page === "donate" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("donate")}
          >
            <HeartHandshake size={18} /> Donate Blood
          </button>

          <button
            className={page === "history" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("history")}
          >
            <ClipboardList size={18} /> Donation History
          </button>



          {/* Settings at bottom */}
          <div className="sidebar-bottom">
            <button
              className={page === "edit-profile" ? "nav-btn active" : "nav-btn"}
              onClick={() => setPage("edit-profile")}
            >
              <Settings size={18} /> Settings
            </button>
          </div>
        </aside >

        {/* Content Area - matching admin style */}
        < section className="admin-content" >
          {page === "profile" && <DonorProfile setPage={setPage} />}
          {page === "eligibility" && <DonorEligibility setPage={setPage} />}
          {page === "donate" && <DonateBlood />}
          {page === "history" && <DonationHistory />}
          {page === "camps" && <DonationCamps />}
          {page === "edit-profile" && <EditDonorProfile />}
        </section >
      </div >
    </div >
  );
}