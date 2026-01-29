// import { useEffect, useState } from "react";
// import { getCamps } from "../services/api";

// export default function DonationCamps() {
//   const [camps, setCamps] = useState([]);

//   useEffect(() => {
//     getCamps().then(r => setCamps(r.data));
//   }, []);

//   const box = {
//     width: 800, margin: "40px auto", padding: 25, borderRadius: 14,
//     background: "linear-gradient(#fff,#f1f3ff)", boxShadow: "0 10px 25px rgba(0,0,0,.15)"
//   };

//   return (
//     <div style={box}>
//       <h2 style={{ color: "#b11226" }}>Upcoming Camps</h2>
//       {camps.map((c, i) => (
//         <div key={i} style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
//           <b>{c.name}</b> – {c.location} – {c.date}
//         </div>
//       ))}
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DonationCamp() {
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/camps") // 🔁 backend endpoint
      .then((res) => {
        setCamps(res.data);
      })
      .catch((err) => {
        console.error("Camp fetch error:", err);
      });
  }, []);

  const styles = {
    card: {
      background: "rgba(255,255,255,0.9)",
      borderRadius: 20,
      padding: 25,
      boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
      color: "#333",
      maxWidth: 1100,
      margin: "30px auto",
    },
    title: {
      color: "#c1121f",
      fontSize: 24,
      fontWeight: 700,
      marginBottom: 20,
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      overflow: "hidden",
      borderRadius: 12,
    },
    th: {
      background: "#e8ecff",
      padding: 12,
      textAlign: "center",
      fontWeight: 700,
      borderBottom: "2px solid #ddd",
    },
    td: {
      padding: 12,
      textAlign: "center",
      borderBottom: "1px solid #eee",
      fontSize: 14,
    },
    empty: {
      textAlign: "center",
      padding: 20,
      color: "#888",
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.title}>Upcoming Donation Camps</div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Camp Name</th>
            <th style={styles.th}>Blood Bank</th>
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
          {camps.length === 0 && (
            <tr>
              <td colSpan="10" style={styles.empty}>
                No donation camps available
              </td>
            </tr>
          )}

          {camps.map((c) => (
            <tr key={c.cid}>
              <td style={styles.td}>{c.camp_name || "-"}</td>
              <td style={styles.td}>
                {c.hbid?.bloodBankName || c.hbid?.name || "-"}
              </td>
              <td style={styles.td}>{c.venue || "-"}</td>
              <td style={styles.td}>
                {c.date ? new Date(c.date).toLocaleDateString() : "-"}
              </td>
              <td style={styles.td}>
                {c.from_time
                  ? new Date(`1970-01-01T${c.from_time}`).toLocaleTimeString()
                  : "-"}
              </td>
              <td style={styles.td}>
                {c.to_time
                  ? new Date(`1970-01-01T${c.to_time}`).toLocaleTimeString()
                  : "-"}
              </td>
              <td style={styles.td}>{c.contact_person || "-"}</td>
              <td style={styles.td}>{c.address || "-"}</td>
              <td style={styles.td}>{c.stateid?.stateName || "-"}</td>
              <td style={styles.td}>{c.cityid?.cityName || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
