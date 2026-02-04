import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DonationCamp() {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8083/api/camps/upcoming")
      .then((res) => {
        console.log("API Response:", res.data);
        setCamps(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Camp fetch error:", err);
        setLoading(false);
      });
  }, []);

  // Safe formatter for date
  const formatDate = (dateValue) => {
    if (!dateValue) return "-";
    try {
      return new Date(dateValue).toLocaleDateString("en-IN");
    } catch {
      return dateValue;
    }
  };

  // Safe formatter for time (works even if backend sends date-time)
  const formatTime = (timeValue) => {
    if (!timeValue) return "-";

    try {
      // If it's full datetime string
      if (timeValue.includes("T")) {
        return new Date(timeValue).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      }

      // If it's already HH:mm:ss
      if (timeValue.length >= 5) {
        return timeValue.substring(0, 5);
      }

      return timeValue;
    } catch {
      return timeValue;
    }
  };

  const styles = {
    container: {
      padding: "40px 20px",
      minHeight: "100vh",
      // background: "linear-gradient(135deg, #f8f9ff, #eef1ff)",
    },
    card: {
      background: "#ffffff",
      borderRadius: 20,
      padding: 30,
      boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
      maxWidth: 1200,
      margin: "0 auto",
    },
    title: {
      color: "#c1121f",
      fontSize: 26,
      fontWeight: 700,
      marginBottom: 25,
      textAlign: "center",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      background: "#e8ecff",
      padding: 14,
      fontWeight: 700,
      fontSize: 14,
      borderBottom: "2px solid #ddd",
    },
    td: {
      padding: 12,
      fontSize: 14,
      borderBottom: "1px solid #eee",
      textAlign: "center",
    },
    empty: {
      textAlign: "center",
      padding: 30,
      color: "#888",
      fontSize: 15,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.title}>Upcoming Donation Camps</div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Camp Name</th>
              <th style={styles.th}>Venue</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>From</th>
              <th style={styles.th}>To</th>
              <th style={styles.th}>Contact Person</th>
              <th style={styles.th}>Address</th>
              <th style={styles.th}>State</th>
              <th style={styles.th}>City</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" style={styles.empty}>
                  Loading camps...
                </td>
              </tr>
            ) : camps.length === 0 ? (
              <tr>
                <td colSpan="9" style={styles.empty}>
                  No donation camps available
                </td>
              </tr>
            ) : (
              camps.map((c) => (
                <tr key={c.cid}>
                  <td style={styles.td}>{c.camp_name || "-"}</td>
                  <td style={styles.td}>{c.venue || "-"}</td>
                  <td style={styles.td}>{formatDate(c.date)}</td>
                  <td style={styles.td}>{formatTime(c.from_time)}</td>
                  <td style={styles.td}>{formatTime(c.to_time)}</td>
                  <td style={styles.td}>{c.contact_person || "-"}</td>
                  <td style={styles.td}>{c.address || "-"}</td>
                  <td style={styles.td}>{c.stateid?.statename || "-"}</td>
                  <td style={styles.td}>{c.cityid?.cityname || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}