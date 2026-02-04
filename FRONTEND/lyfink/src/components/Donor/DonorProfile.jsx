import React, { useEffect, useState } from "react";
import axios from "axios";
import EditDonorProfile from "./EditDonorProfile";
import { User, Mail, Droplet, Calendar, Heart, Activity, Edit } from "lucide-react";

export default function DonorProfile({ setPage }) {
  const [donor, setDonor] = useState(null);
  const [stats, setStats] = useState({ total: 0, last: "-" });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("donor-profile");

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.userid;

  const fetchDonor = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8083/api/donor/profile/${userId}`
      );

      const donorData = Array.isArray(res.data) ? res.data[0] : res.data;

      setDonor(donorData || null);
    } catch (err) {
      console.error("❌ Donor Profile API Error:", err);
      setDonor(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8083/api/donor/history/${userId}`
      );

      const list = res.data || [];

      setStats({
        total: list.length,
        last:
          list.length > 0
            ? new Date(list[0].donatedDate).toLocaleDateString()
            : "-",
      });
    } catch (err) {
      console.error("❌ Donation History API Error:", err);
      setStats({ total: 0, last: "-" });
    }
  };

  useEffect(() => {
    if (userId) {
      fetchDonor();
      fetchHistory();
    }
  }, [userId]);

  if (!userId) {
    return (
      <div style={{ padding: 30, color: "red" }}>
        ❌ User not logged in. Please login again.
      </div>
    );
  }

  if (currentPage === "edit-profile") {
    return (
      <EditDonorProfile
        userId={userId}
        onProfileUpdated={() => {
          fetchDonor();
          fetchHistory();
          setCurrentPage("donor-profile");
        }}
        onCancel={() => setCurrentPage("donor-profile")}
      />
    );
  }

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading donor profile...</p>
      </div>
    );
  }

  if (!donor) {
    return (
      <div style={styles.errorContainer}>
        <Droplet size={60} color="#ccc" />
        <p style={styles.errorText}>No donor profile found</p>
        <p style={styles.errorSubtext}>Please complete your profile first.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header Card */}
      <div style={styles.headerCard}>
        <div style={styles.avatarSection}>
          <div style={styles.avatar}>
            <User size={50} color="#42A5F5" />
          </div>
          <div style={styles.headerInfo}>
            <h2 style={styles.donorName}>
              {donor.uid?.firstname || "-"} {donor.uid?.lastname || "-"}
            </h2>
            <p style={styles.donorEmail}>
              <Mail size={16} style={{ marginRight: 6 }} />
              {donor.uid?.email || "-"}
            </p>
          </div>
        </div>
        <button onClick={() => setCurrentPage("edit-profile")} style={styles.editButton}>
          <Edit size={18} />
          <span>Update Profile</span>
        </button>
      </div>

      {/* Stats Cards Row */}
      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <div style={styles.statIconWrapper}>
            <Heart size={30} color="#c1121f" />
          </div>
          <div style={styles.statContent}>
            <p style={styles.statLabel}>Total Donations</p>
            <h3 style={styles.statValue}>{stats.total}</h3>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIconWrapper}>
            <Calendar size={30} color="#42A5F5" />
          </div>
          <div style={styles.statContent}>
            <p style={styles.statLabel}>Last Donation</p>
            <h3 style={styles.statValue}>{stats.last}</h3>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIconWrapper}>
            <Droplet size={30} color="#2e7d32" />
          </div>
          <div style={styles.statContent}>
            <p style={styles.statLabel}>Blood Group</p>
            <h3 style={styles.statValue}>{donor.bcid?.bc_name || "-"}</h3>
          </div>
        </div>
      </div>

      {/* Personal Information Card */}
      <div style={styles.infoCard}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}>
            <User size={22} style={{ marginRight: 8 }} />
            Personal Information
          </h3>
        </div>
        
        <div style={styles.infoGrid}>
          <div style={styles.infoItem}>
            <div style={styles.infoLabel}>
              <User size={18} color="#42A5F5" />
              <span>Full Name</span>
            </div>
            <div style={styles.infoValue}>
              {donor.uid?.firstname || "-"} {donor.uid?.lastname || "-"}
            </div>
          </div>

          <div style={styles.infoItem}>
            <div style={styles.infoLabel}>
              <Mail size={18} color="#42A5F5" />
              <span>Email Address</span>
            </div>
            <div style={styles.infoValue}>{donor.uid?.email || "-"}</div>
          </div>

          <div style={styles.infoItem}>
            <div style={styles.infoLabel}>
              <Droplet size={18} color="#c1121f" />
              <span>Blood Group</span>
            </div>
            <div style={styles.infoValue}>
              <span style={styles.bloodGroupBadge}>{donor.bcid?.bc_name || "-"}</span>
            </div>
          </div>

          <div style={styles.infoItem}>
            <div style={styles.infoLabel}>
              <User size={18} color="#42A5F5" />
              <span>Gender</span>
            </div>
            <div style={styles.infoValue}>{donor.gender || "-"}</div>
          </div>
        </div>
      </div>

      {/* Medical History Card */}
      <div style={styles.infoCard}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}>
            <Activity size={22} style={{ marginRight: 8 }} />
            Medical History
          </h3>
        </div>
        
        <div style={styles.medicalContent}>
          <p style={styles.medicalText}>
            {donor.medical_history || "No medical history recorded"}
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    maxWidth: "1100px",
  },

  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
  },

  spinner: {
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #42A5F5",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    animation: "spin 1s linear infinite",
  },

  loadingText: {
    marginTop: "20px",
    color: "#666",
    fontSize: "16px",
  },

  errorContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
    textAlign: "center",
  },

  errorText: {
    marginTop: "20px",
    fontSize: "18px",
    color: "#666",
    fontWeight: "500",
  },

  errorSubtext: {
    fontSize: "14px",
    color: "#999",
    marginTop: "5px",
  },

  // Header Card
  headerCard: {
    background: "linear-gradient(135deg, #42A5F5 0%, #5C6BC0 100%)",
    borderRadius: "18px",
    padding: "30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 8px 24px rgba(66, 165, 245, 0.3)",
    color: "#fff",
  },

  avatarSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  avatar: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },

  headerInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },

  donorName: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "bold",
    color: "#fff",
  },

  donorEmail: {
    margin: 0,
    fontSize: "16px",
    color: "rgba(255, 255, 255, 0.9)",
    display: "flex",
    alignItems: "center",
  },

  editButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#fff",
    color: "#42A5F5",
    border: "none",
    padding: "12px 24px",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },

  // Stats Cards
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },

  statCard: {
    background: "#fff",
    borderRadius: "16px",
    padding: "25px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },

  statIconWrapper: {
    width: "60px",
    height: "60px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  statContent: {
    flex: 1,
  },

  statLabel: {
    margin: 0,
    fontSize: "14px",
    color: "#666",
    fontWeight: "500",
    marginBottom: "5px",
  },

  statValue: {
    margin: 0,
    fontSize: "26px",
    fontWeight: "bold",
    color: "#333",
  },

  // Info Cards
  infoCard: {
    background: "#fff",
    borderRadius: "16px",
    padding: "25px",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
  },

  cardHeader: {
    marginBottom: "20px",
    paddingBottom: "15px",
    borderBottom: "2px solid #f0f0f0",
  },

  cardTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
    display: "flex",
    alignItems: "center",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },

  infoItem: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  infoLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "#666",
    fontWeight: "500",
  },

  infoValue: {
    fontSize: "16px",
    color: "#333",
    fontWeight: "500",
    paddingLeft: "26px",
  },

  bloodGroupBadge: {
    display: "inline-block",
    background: "linear-gradient(135deg, #c1121f 0%, #a00f1a 100%)",
    color: "#fff",
    padding: "6px 16px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
  },

  // Medical History
  medicalContent: {
    background: "#f8f9fa",
    borderRadius: "12px",
    padding: "20px",
  },

  medicalText: {
    margin: 0,
    fontSize: "15px",
    color: "#555",
    lineHeight: "1.6",
  },
};