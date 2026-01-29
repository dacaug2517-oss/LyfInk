// import React from "react";

// export default function DonationHistory() {
//   return (
//     <>
//       <link
//         href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
//         rel="stylesheet"
//       />

//       <style>{`
//         html, body, #root {
//           height: 100%;
//           margin: 0;
//         }

//         .page-bg {
//           min-height: 100vh;
//           background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           padding: 20px;
//         }

//         .main-card {
//           width: 100%;
//           max-width: 1050px;
//           background: #f4f6fb;
//           border-radius: 20px;
//           box-shadow: 0 10px 35px rgba(0,0,0,0.25);
//           overflow: hidden;
//         }

//         .top-bar {
//           background: linear-gradient(135deg, #e63946 0%, #f77f8e 100%);
//           color: white;
//           padding: 12px 20px;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//         }

//         .top-left {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           font-weight: 700;
//           font-size: 20px;
//         }

//         .avatar {
//           width: 45px;
//           height: 45px;
//           border-radius: 50%;
//           background: #fff;
//         }

//         .top-right span {
//           margin-left: 15px;
//           font-size: 14px;
//         }

//         .content {
//           padding: 20px;
//         }

//         .section-title {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 15px;
//         }

//         .section-title h5 {
//           font-weight: 700;
//           color: #b52b36;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }

//         .search-box {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           background: #fff;
//           border-radius: 8px;
//           padding: 6px 10px;
//           border: 1px solid #ddd;
//         }

//         .search-box input {
//           border: none;
//           outline: none;
//           font-size: 14px;
//         }

//         .stats-bar {
//           background: #fff;
//           border-radius: 12px;
//           padding: 12px 18px;
//           display: flex;
//           gap: 25px;
//           font-size: 14px;
//           margin-bottom: 15px;
//           box-shadow: 0 4px 10px rgba(0,0,0,0.1);
//         }

//         .stats-bar span {
//           font-weight: 600;
//           color: #333;
//         }

//         .stats-bar b {
//           color: #b52b36;
//         }

//         .table-card {
//           background: #fff;
//           border-radius: 15px;
//           padding: 15px;
//           box-shadow: 0 6px 18px rgba(0,0,0,0.12);
//         }

//         table {
//           width: 100%;
//           border-collapse: collapse;
//           font-size: 14px;
//         }

//         thead {
//           background: #e9edf6;
//         }

//         th, td {
//           padding: 10px 12px;
//           text-align: left;
//         }

//         th {
//           font-weight: 700;
//           color: #333;
//         }

//         tbody tr {
//           border-bottom: 1px solid #eee;
//         }

//         .status {
//           background: linear-gradient(135deg, #6cc070 0%, #3da35d 100%);
//           color: white;
//           padding: 4px 12px;
//           border-radius: 8px;
//           font-size: 13px;
//           font-weight: 600;
//           display: inline-block;
//         }
//       `}</style>

//       <div className="page-bg">
//         <div className="main-card">

//           {/* Top Bar */}
//           {/* <div className="top-bar">
//             <div className="top-left">
//               <div className="avatar"></div>
//               Donate Blood
//             </div>
//             <div className="top-right">
//               <span>Dashboard</span>
//               <span>🔔</span>
//               <span>3</span>
//             </div>
//           </div> */}

//           {/* Content */}
//           <div className="content">

//             {/* Title + Search */}
//             <div className="section-title">
//               <h5>🩸 Donation History</h5>
//               <div className="search-box">
//                 <input type="text" placeholder="Search ..." />
//                 🔍
//               </div>
//             </div>

//             {/* Stats */}
//             <div className="stats-bar">
//               <span>Total Donations: <b>3</b></span>
//               <span>🩸 Eligible Again on: <b>June 1, 2024</b></span>
//               <span>Next Donation In: <b>52 Days</b></span>
//               <span>⏰ Today: <b>1:57</b></span>
//             </div>

//             {/* Table */}
//             <div className="table-card">
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Date</th>
//                     <th>Blood Bank</th>
//                     <th>Location</th>
//                     <th>Blood Type</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>April 10, 2024</td>
//                     <td>Springfield Blood Center</td>
//                     <td>Springfield</td>
//                     <td>O+</td>
//                     <td><span className="status">Completed</span></td>
//                   </tr>
//                   <tr>
//                     <td>Dec 16, 2024</td>
//                     <td>City Hospital</td>
//                     <td>Springfield</td>
//                     <td>O+</td>
//                     <td><span className="status">Completed</span></td>
//                   </tr>
//                   <tr>
//                     <td>Aug 7, 2023</td>
//                     <td>Springfield Blood Center</td>
//                     <td>Springfield</td>
//                     <td>O+</td>
//                     <td><span className="status">Completed</span></td>
//                   </tr>
//                   <tr>
//                     <td>Mar 20, 2023</td>
//                     <td>HealthCare Blood Services</td>
//                     <td>Springfield</td>
//                     <td>O+</td>
//                     <td><span className="status">Completed</span></td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>

//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


import React from "react";
import { Droplet, Search } from "lucide-react";

export default function DonationHistory() {
  return (
    <div
      style={{
        padding: "10px 0 0", // 🔥 reduced top space
      }}
    >
      {/* TITLE ROW */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px", // 🔥 reduced
          color: "#fff",
        }}
      >
        <h2 style={{ margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
          <Droplet size={20} />
          Donation History
        </h2>

        <div
          style={{
            background: "#fff",
            padding: "6px 10px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <input
            placeholder="Search..."
            style={{
              border: "none",
              outline: "none",
              fontSize: "14px",
            }}
          />
          <Search size={16} />
        </div>
      </div>

      {/* MAIN CARD */}
      <div
        style={{
          background: "#f8f9fc",
          borderRadius: "18px",
          padding: "18px", // 🔥 reduced padding
          boxShadow: "0 10px 24px rgba(0,0,0,0.15)",
        }}
      >
        {/* SUMMARY */}
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "12px 16px",
            marginBottom: "16px",
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          <span>Total Donations: <b style={{ color: "#d32f2f" }}>3</b></span>
          <span>Eligible Again on: <b>June 1, 2024</b></span>
          <span>Next Donation In: <b>52 Days</b></span>
          <span>Today: <b>1:57</b></span>
        </div>

        {/* TABLE */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#eef1f7", textAlign: "left" }}>
              {["Date", "Blood Bank", "Location", "Blood Type", "Status"].map(
                (h) => (
                  <th key={h} style={{ padding: "12px", fontSize: "14px" }}>
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {[
              ["April 10, 2024", "Springfield Blood Center", "Springfield", "O+", "Completed"],
              ["Dec 16, 2024", "City Hospital", "Springfield", "O+", "Completed"],
              ["Aug 7, 2023", "Springfield Blood Center", "Springfield", "O+", "Completed"],
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: "12px", fontSize: "14px" }}>
                    {cell === "Completed" ? (
                      <span
                        style={{
                          background: "#4caf50",
                          color: "#fff",
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontSize: "13px",
                        }}
                      >
                        Completed
                      </span>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}





// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function DonationHistory() {
//   const [history, setHistory] = useState([]);
//   const [user, setUser] = useState(null);

//   // ✅ Safely read localStorage
//   useEffect(() => {
//     try {
//       const storedUser = window.localStorage.getItem("user");
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//       } else {
//         console.warn("No user found in localStorage. Using fallback user.");
//         setUser({ userid: 1 }); // TEMP fallback for dev
//       }
//     } catch (e) {
//       console.warn("LocalStorage blocked. Using fallback user.", e);
//       setUser({ userid: 1 }); // TEMP fallback for dev
//     }
//   }, []);

//   // ✅ Fetch history from backend
//   useEffect(() => {
//     if (!user?.userid) return;

//     axios
//       .get(`http://localhost:8080/api/donor/history/${user.userid}`)
//       .then((res) => {
//         setHistory(res.data);
//       })
//       .catch((err) => {
//         console.error("History fetch error:", err);
//       });
//   }, [user]);

//   const styles = {
//     card: {
//       background: "rgba(255,255,255,0.9)",
//       borderRadius: 20,
//       padding: 25,
//       boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
//       color: "#333",
//       maxWidth: 1000,
//       margin: "auto",
//     },
//     title: {
//       color: "#c1121f",
//       fontSize: 24,
//       fontWeight: 700,
//       marginBottom: 20,
//     },
//     table: {
//       width: "100%",
//       borderCollapse: "collapse",
//       overflow: "hidden",
//       borderRadius: 12,
//     },
//     th: {
//       background: "#e8ecff",
//       padding: 12,
//       textAlign: "center",
//       fontWeight: 700,
//       borderBottom: "2px solid #ddd",
//     },
//     td: {
//       padding: 12,
//       textAlign: "center",
//       borderBottom: "1px solid #eee",
//       fontSize: 14,
//     },
//     status: {
//       background: "linear-gradient(135deg, #5cb85c, #3c9d3c)",
//       color: "#fff",
//       padding: "4px 10px",
//       borderRadius: 12,
//       fontSize: 12,
//       fontWeight: 600,
//       display: "inline-block",
//     },
//     empty: {
//       textAlign: "center",
//       padding: 20,
//       color: "#888",
//     },
//   };

//   return (
//     <div style={styles.card}>
//       <div style={styles.title}>Donation History</div>

//       <table style={styles.table}>
//         <thead>
//           <tr>
//             <th style={styles.th}>Date</th>
//             <th style={styles.th}>Blood Bank</th>
//             <th style={styles.th}>Location</th>
//             <th style={styles.th}>Blood Type</th>
//             <th style={styles.th}>Status</th>
//           </tr>
//         </thead>

//         <tbody>
//           {history.length === 0 && (
//             <tr>
//               <td colSpan="5" style={styles.empty}>
//                 No donation history found
//               </td>
//             </tr>
//           )}

//           {history.map((d, i) => (
//             <tr key={i}>
//               <td style={styles.td}>
//                 {d.donationDate
//                   ? new Date(d.donationDate).toLocaleDateString()
//                   : "-"}
//               </td>
//               <td style={styles.td}>{d.bloodBankName || "-"}</td>
//               <td style={styles.td}>{d.location || "-"}</td>
//               <td style={styles.td}>{d.bloodGroup || "-"}</td>
//               <td style={styles.td}>
//                 <span style={styles.status}>
//                   {d.status || "Completed"}
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
