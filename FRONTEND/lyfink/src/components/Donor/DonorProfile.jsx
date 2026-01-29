// import React, { useState } from "react";
// import { Heart, Droplet } from "lucide-react";

// export default function DonorProfile() {
//   const [profile] = useState({
//     fullName: "John Doe",
//     bloodGroup: "O+",
//     contactNumber: "+1-123-456-7890",
//     email: "john.doe@email.com",
//     address: "123 Main St, Springfield, USA",
//     totalDonations: 3,
//     lastDonation: "+",
//   });

//   return (
//     <div
//       style={{
//         background: "white",
//         borderRadius: "14px",
//         padding: "30px",
//         boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//       }}
//     >
//       <h1
//         style={{
//           color: "#7a4a2e",
//           fontSize: "32px",
//           marginBottom: "30px",
//           fontWeight: "bold",
//         }}
//       >
//         {profile.fullName}!
//       </h1>

//       <div style={{ display: "flex", gap: "40px" }}>
//         {/* Profile Info */}
//         <div style={{ flex: 1 }}>
//           <h2
//             style={{
//               color: "#5d4037",
//               fontSize: "20px",
//               marginBottom: "20px",
//               fontWeight: "bold",
//             }}
//           >
//             Donor Profile
//           </h2>

//           <p><b>Full Name:</b> {profile.fullName}</p>
//           <p><b>Blood Group:</b> {profile.bloodGroup}</p>
//           <p><b>Contact Number:</b> {profile.contactNumber}</p>
//           <p><b>Email:</b> {profile.email}</p>
//           <p><b>Address:</b> {profile.address}</p>

//           {/* Stats */}
//           <div
//             style={{
//               display: "flex",
//               gap: "25px",
//               marginTop: "20px",
//               alignItems: "center",
//             }}
//           >
//             <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//               <Heart size={20} color="#d32f2f" fill="#d32f2f" />
//               <span>
//                 Total Donations:{" "}
//                 <strong style={{ color: "#d32f2f", fontSize: "18px" }}>
//                   {profile.totalDonations}
//                 </strong>
//               </span>
//             </div>

//             <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//               <Droplet size={20} color="#d32f2f" fill="#d32f2f" />
//               <span>
//                 Last Donation:{" "}
//                 <strong style={{ color: "#d32f2f" }}>
//                   {profile.lastDonation}
//                 </strong>
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Blood Drop */}
//         <div
//           style={{
//             width: "220px",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <div
//             style={{
//               position: "relative",
//               width: "140px",
//               height: "170px",
//               background: "linear-gradient(135deg, #ffebee, #ffcdd2)",
//               borderRadius: "70px 70px 15px 15px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               boxShadow: "0 6px 14px rgba(211,47,47,0.25)",
//             }}
//           >
//             <Droplet size={70} color="#d32f2f" fill="#d32f2f" />
//           </div>

//           <button
//             style={{
//               marginTop: "20px",
//               padding: "12px 28px",
//               background: "linear-gradient(135deg, #ff6b6b, #ee5a6f)",
//               color: "white",
//               border: "none",
//               borderRadius: "10px",
//               cursor: "pointer",
//               fontSize: "15px",
//               fontWeight: "600",
//               boxShadow: "0 4px 10px rgba(238,90,111,0.4)",
//             }}
//           >
//             Edit Profile
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function DonorProfile({ setPage }) {

//   const [donor, setDonor] = useState(null);
//   const [stats, setStats] = useState({ total: 0, last: "-" });

//   // ✅ TEMP: logged-in user id
//   const userId = 1; // 🔴 CHANGE THIS TO A VALID USER ID FROM DB

//   useEffect(() => {
//     // fetch donor profile
//     axios
//       .get(`http://localhost:8080/api/donor/profile/${userId}`)
//       .then(res => {
//         console.log("DONOR RESPONSE:", res.data);
//         setDonor(res.data);
//       })
//       .catch(err => {
//         console.error("Donor API error", err);
//       });

//     // fetch donation history
//     axios
//       .get(`http://localhost:8080/api/donor/history/${userId}`)
//       .then(res => {
//         const list = res.data || [];
//         setStats({
//           total: list.length,
//           last:
//             list.length > 0
//               ? new Date(list[0].donationDate).toLocaleDateString()
//               : "-"
//         });
//       })
//       .catch(err => console.error("History API error", err));
//   }, []);

//   if (!donor) {
//     return <div style={{ padding: 30 }}>Loading donor profile...</div>;
//   }

//   return (
//     <div
//       style={{
//         background: "#fff",
//         borderRadius: 18,
//         padding: 30,
//         maxWidth: 1000,
//         boxShadow: "0 20px 45px rgba(0,0,0,0.15)",
//       }}
//     >
//       <h1 style={{ color: "#8b4513" }}>
//         {donor.uid.firstname} {donor.uid.lastname}!
//       </h1>

//       <h3>Donor Profile</h3>

//       <p><b>Full Name:</b> {donor.uid.firstname} {donor.uid.lastname}</p>
//       <p><b>Blood Group:</b> {donor.bcid.bc_name}</p>
//       <p><b>Contact Number:</b> {donor.uid.mobno}</p>
//       <p><b>Email:</b> {donor.uid.email}</p>
//       <p><b>Gender:</b> {donor.gender}</p>
//       <p><b>Medical History:</b> {donor.medical_history || "None"}</p>

//       <hr />

//       <div style={{ display: "flex", gap: 30 }}>
//         <div>❤️ <b>Total Donations:</b> {stats.total}</div>
//         <div>🩸 <b>Last Donation:</b> {stats.last}</div>
//       </div>

//       <button
//       onClick={() => setPage("edit-profile")}
//         style={{
//           marginTop: 20,
//           padding: "10px 22px",
//           background: "#ff5a5f",
//           color: "#fff",
//           border: "none",
//           borderRadius: 8,
//           cursor: "pointer",
//         }}
//       >
//         Edit Profile
//       </button>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import EditDonorProfile from "./EditDonorProfile";

export default function DonorProfile({ setPage }) {
  const [donor, setDonor] = useState(null);
  const [stats, setStats] = useState({ total: 0, last: "-" });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("donor-profile"); // profile or edit

  const userId = 1; // TEMP: replace with actual logged-in user id

  // Fetch donor profile
  const fetchDonor = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/donor/profile/${userId}`);
      
      // If API returns a list, pick the first donor
      const donorData = Array.isArray(res.data) ? res.data[0] : res.data;

      setDonor(donorData || null);
    } catch (err) {
      console.error("Donor API error", err);
      setDonor(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch donation history
  const fetchHistory = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/donor/history/${userId}`);
      const list = res.data || [];
      setStats({
        total: list.length,
        last: list.length > 0 ? new Date(list[0].donationDate).toLocaleDateString() : "-",
      });
    } catch (err) {
      console.error("History API error", err);
      setStats({ total: 0, last: "-" });
    }
  };

  useEffect(() => {
    fetchDonor();
    fetchHistory();
  }, []);

  // Show edit page
  if (currentPage === "edit-profile") {
    return (
      <EditDonorProfile
        userId={userId}
        onProfileUpdated={() => {
          fetchDonor(); // refresh profile
          fetchHistory(); // refresh stats
          setCurrentPage("donor-profile"); // go back to profile
        }}
        onCancel={() => setCurrentPage("donor-profile")}
      />
    );
  }

  // Loading state
  if (loading) {
    return <div style={{ padding: 30 }}>Loading donor profile...</div>;
  }

  // Empty donor state
  if (!donor) {
    return <div style={{ padding: 30 }}>No donor profile found.</div>;
  }

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 18,
        padding: 30,
        maxWidth: 1000,
        boxShadow: "0 20px 45px rgba(0,0,0,0.15)",
      }}
    >
      <h1 style={{ color: "#8b4513" }}>
        {donor.uid?.firstname || "First"} {donor.uid?.lastname || "Last"}!
      </h1>

      <h3>Donor Profile</h3>

      <p><b>Full Name:</b> {donor.uid?.firstname || "-"} {donor.uid?.lastname || "-"}</p>
      <p><b>Blood Group:</b> {donor.bcid?.bc_name || "-"}</p>
      {/* <p><b>Contact Number:</b> {donor.uid?.mobno || "-"}</p> */}
      <p><b>Email:</b> {donor.uid?.email || "-"}</p>
      <p><b>Gender:</b> {donor.gender || "-"}</p>
      <p><b>Medical History:</b> {donor.medical_history || "None"}</p>

      <hr />

      <div style={{ display: "flex", gap: 30 }}>
        <div>❤️ <b>Total Donations:</b> {stats.total}</div>
        <div>🩸 <b>Last Donation:</b> {stats.last}</div>
      </div>

      <button
        onClick={() => setCurrentPage("edit-profile")}
        style={{
          marginTop: 20,
          padding: "10px 22px",
          background: "#ff5a5f",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        Edit Profile
      </button>
    </div>
  );
}
