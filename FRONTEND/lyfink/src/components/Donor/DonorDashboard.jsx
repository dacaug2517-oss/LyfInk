import React, { useState, useEffect } from "react";
import axios from "axios";

import DonorProfile from "./DonorProfile";
import DonorEligibility from "./DonorEligibility";
import DonateBlood from "./DonateBlood";
import DonationHistory from "./DonationHistory";
import DonationCamps from "./DonationCamps";
import EditDonorProfile from "./EditDonorProfile";
// import BloodRequests from "./BloodRequests";

import {
  LayoutDashboard,
  Droplet,
  ClipboardList,
  HeartHandshake,
  CalendarDays,
} from "lucide-react";

import LogoutButton from "../LogoutButton";

export default function DonorDashboard({ donorId }) {
  const [activePage, setActivePage] = useState("dashboard");
  const [donorData, setDonorData] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem("user"));

  // ✅ Fetch Donor Details
  useEffect(() => {
    if (storedUser?.userid) {
      axios.get(`http://localhost:8083/api/users/${storedUser.userid}`)

        .then((res) => setDonorData(res.data))
        .catch((err) => console.log(err));
    }
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const styles = {
    wrapper: {
      width: "100%",
      height: "100vh",
      background: "#F0F7FF",
    },

    topbar: {
      height: "75px",
      background: "linear-gradient(160deg, #42A5F5 0%, #5C6BC0 50%, #66BB6A 100%)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 25px",
      borderBottomLeftRadius: "18px",
      borderBottomRightRadius: "18px",
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.15)",
    },

    logo: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      color: "white",
    },

    logoTitle: {
      fontSize: "22px",
      fontWeight: "bold",
      margin: 0,
    },

    icons: {
      display: "flex",
      alignItems: "center",
      gap: "18px",
      color: "white",
    },

    main: {
      display: "flex",
      height: "calc(100vh - 75px)",
      background: "#F0F7FF",
    },

    sidebar: {
      width: "250px",
      background: "linear-gradient(to bottom, #FAFCFE, #F0F4F8)",
      padding: "20px",
      borderRadius: "18px",
      margin: "18px",
      boxShadow: "inset 0px 2px 6px rgba(255, 255, 255, 0.9), 0px 6px 18px rgba(0, 0, 0, 0.08)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },

    navBtn: (isActive) => ({
      width: "100%",
      display: "flex",
      gap: "12px",
      alignItems: "center",
      padding: "13px 14px",
      marginBottom: "12px",
      border: "none",
      borderRadius: "12px",
      fontSize: "15px",
      cursor: "pointer",
      background: isActive ? "linear-gradient(135deg, #42A5F5 0%, #5C6BC0 100%)" : "transparent",
      color: isActive ? "white" : "#42A5F5",
      fontWeight: "500",
      transition: "0.2s",
      boxShadow: isActive ? "0px 4px 10px rgba(66, 165, 245, 0.35)" : "none",
    }),

    sidebarBottom: {
      marginTop: "40px",
    },

    content: {
      flex: 1,
      margin: "18px 18px 18px 0",
      background: "linear-gradient(to bottom, #ffffff, #FAFCFE)",
      borderRadius: "18px",
      padding: "25px",
      boxShadow: "inset 0px 2px 6px rgba(255, 255, 255, 0.9), 0px 6px 18px rgba(0, 0, 0, 0.08)",
      overflowY: "auto",
    },

    pageTitle: {
      fontSize: "26px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#42A5F5",
    },
  };

  return (
    <div style={styles.wrapper}>
      {/* Top Bar */}
      <header style={styles.topbar}>
        <div style={styles.logo}>
          <h1 style={styles.logoTitle}>
            Donor Panel - {donorData ? donorData.firstname : "Loading..."}
          </h1>
        </div>

        <div style={styles.icons}>
          <LogoutButton className="btn btn-sm btn-danger mx-3" />
        </div>
      </header>

      {/* Main */}
      <div style={styles.main}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <div>
            <button
              style={styles.navBtn(activePage === "dashboard")}
              onClick={() => setActivePage("dashboard")}
            >
              <LayoutDashboard size={18} /> Dashboard
            </button>

            <button
              style={styles.navBtn(activePage === "eligibility")}
              onClick={() => setActivePage("eligibility")}
            >
              <Droplet size={18} /> Eligibility
            </button>

            <button
              style={styles.navBtn(activePage === "donate")}
              onClick={() => setActivePage("donate")}
            >
              <HeartHandshake size={18} /> Donate Blood
            </button>

            <button
              style={styles.navBtn(activePage === "history")}
              onClick={() => setActivePage("history")}
            >
              <ClipboardList size={18} /> Donation History
            </button>

            <button
              style={styles.navBtn(activePage === "camps")}
              onClick={() => setActivePage("camps")}
            >
              <CalendarDays size={18} /> Donation Camps
            </button>
          </div>
        </aside>

        {/* Content */}
        <section style={styles.content}>
          {activePage === "dashboard" && (
            <div>
              <h2 style={styles.pageTitle}>
                Welcome {donorData ? donorData.firstname : "Donor"} 👋
              </h2>
              <DonorProfile setPage={setActivePage} />
            </div>
          )}

          {activePage === "eligibility" && <DonorEligibility setPage={setActivePage} />}
          {activePage === "donate" && <DonateBlood />}
          {activePage === "history" && <DonationHistory />}
          {activePage === "camps" && <DonationCamps />}
          {activePage === "edit-profile" && <EditDonorProfile />}
        </section>
      </div>
    </div>
  );
}