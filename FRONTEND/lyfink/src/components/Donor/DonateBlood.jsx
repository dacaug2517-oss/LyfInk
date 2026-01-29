// import React from "react";

// const DonorEligibility = () => {
//   const sidebarItems = [
//     "Dashboard",
//     "Eligibility",
//     "Donate Blood",
//     "Donation History",
//   ];

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #eaf1ff 0%, #f7f9ff 100%)",
//         fontFamily: "Segoe UI, sans-serif",
//         padding: "30px",
//       }}
//     >
//       {/* Header */}
//       <div
//         style={{
//           height: "70px",
//           background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
//           borderRadius: "14px 14px 0 0",
//           color: "white",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           padding: "0 25px",
//           boxShadow: "0 6px 14px rgba(0,0,0,0.15)",
//         }}
//       >
//         <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//           <div
//             style={{
//               width: "42px",
//               height: "42px",
//               borderRadius: "50%",
//               background: "#fff",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: "#ee5a6f",
//               fontWeight: "700",
//             }}
//           >
//             👤
//           </div>
//           <h2 style={{ margin: 0 }}>Donor Profile</h2>
//         </div>

//         <div style={{ display: "flex", gap: "18px", alignItems: "center" }}>
//           <span> Dashboard</span>
//           <span>🔔</span>
//           <div
//             style={{
//               background: "#ffcc00",
//               color: "#333",
//               borderRadius: "50%",
//               width: "26px",
//               height: "26px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               fontSize: "13px",
//               fontWeight: "700",
//             }}
//           >
//             3
//           </div>
//         </div>
//       </div>

//       {/* Main Card */}
//       <div
//         style={{
//           display: "flex",
//           background: "#fff",
//           borderRadius: "0 0 18px 18px",
//           boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
//           overflow: "hidden",
//         }}
//       >
//         {/* Sidebar */}
//         <div
//           style={{
//             width: "220px",
//             background: "#f6f7fb",
//             padding: "20px",
//           }}
//         >
//           {sidebarItems.map((item, i) => (
//             <button
//               key={i}
//               style={{
//                 width: "100%",
//                 padding: "12px 14px",
//                 background: "white", // default white
//                 color: "#333",
//                 border: "1px solid #e0e0e0",
//                 borderRadius: "10px",
//                 cursor: "pointer",
//                 marginBottom: "12px",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "10px",
//                 fontSize: "14px",
//                 fontWeight: "600",
//                 transition: "all 0.25s ease",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background =
//                   "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)";
//                 e.currentTarget.style.color = "white";
//                 e.currentTarget.style.border = "1px solid #ee5a6f";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = "white";
//                 e.currentTarget.style.color = "#333";
//                 e.currentTarget.style.border = "1px solid #e0e0e0";
//               }}
//             >
//               {item}
//             </button>
//           ))}
//         </div>

//         {/* Content */}
//         <div style={{ flex: 1, padding: "30px" }}>
//           <h2 style={{ color: "#b0303b", marginBottom: "16px" }}>
//             Check Eligibility
//           </h2>

//           <div
//             style={{
//               background: "linear-gradient(135deg, #ffffff 0%, #f3f5ff 100%)",
//               borderRadius: "16px",
//               padding: "22px 24px",
//               boxShadow: "0 8px 18px rgba(0,0,0,0.12)",
//               maxWidth: "720px",
//             }}
//           >
//             <h3 style={{ color: "#b0303b", marginBottom: "14px" }}>
//               Eligibility Criteria Checklist
//             </h3>

//             <ul style={{ paddingLeft: "18px", marginBottom: "14px" }}>
//               {[
//                 "You must have waited at least 90 days (3 months) since your last whole-blood donation..",
//                 "Your blood pressure and pulse must be within a normal and safe range.",
//                 "Women must not be pregnant and must wait at least 6 months after delivery or miscarriage.",
//                 "You must not be taking restricted medicines, such as antibiotics or blood thinners.",
//                 "You must not have any chronic or serious diseases such as HIV, Hepatitis B or C, cancer, heart disease, or epilepsy.",
//               ].map((text, i) => (
//                 <li
//                   key={i}
//                   style={{
//                     marginBottom: "10px",
//                     color: "#444",
//                     listStyle: "none",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "10px",
//                   }}
//                 >
//                   <span style={{ color: "green", fontSize: "18px" }}>✔</span>
//                   {text}
//                 </li>
//               ))}
//             </ul>

//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 marginTop: "14px",
//               }}
//             >
//               <div>
//                 <p style={{ margin: 0, fontWeight: "600" }}>
//                   Are you eligible to donate blood?
//                 </p>
//                 <a
//                   href="#"
//                   style={{
//                     fontSize: "13px",
//                     color: "#3b6cff",
//                     textDecoration: "none",
//                   }}
//                 >
//                   See Full Eligibility
//                 </a>
//               </div>

//               <button
//                 style={{
//                   background:
//                     "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
//                   border: "none",
//                   color: "white",
//                   padding: "10px 20px",
//                   borderRadius: "10px",
//                   cursor: "pointer",
//                   fontWeight: "700",
//                   boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
//                 }}
//               >
//                 Proceed to Donate
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DonorEligibility;

import React from "react";

const Eligibility = () => {
  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* Title */}
        <h2 style={styles.heading}>Eligibility Criteria Checklist</h2>

        {/* Checklist */}
        <ul style={styles.list}>
          <li style={styles.listItem}>
            ✓ You must have waited at least 90 days (3 months) since your last whole-blood donation.
          </li>
          <li style={styles.listItem}>
            ✓ Your blood pressure and pulse must be within a normal and safe range.
          </li>
          <li style={styles.listItem}>
            ✓ Women must not be pregnant and must wait at least 6 months after delivery or miscarriage.
          </li>
          <li style={styles.listItem}>
            ✓ You must not be taking restricted medicines, such as antibiotics or blood thinners.
          </li>
          <li style={styles.listItem}>
            ✓ You must not have any chronic or serious diseases such as HIV, Hepatitis B or C, cancer, heart disease, or epilepsy.
          </li>
        </ul>

        {/* Bottom Section */}
        <div style={styles.footer}>
          <div>
            <p style={styles.question}>Are you eligible to donate blood?</p>
            <p style={styles.subText}>See Full Eligibility</p>
          </div>

          <button style={styles.button}>Proceed to Donate</button>
        </div>

      </div>
    </div>
  );
};


  const styles = {
  page: {
    minHeight: "auto",               // 🔥 removes full screen white space
    padding: "30px 20px",
    background: "linear-gradient(to bottom, #f8f9ff, #dfe8ff)",
    borderRadius: "14px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",        // 🔥 prevents vertical stretching
    fontFamily: "Arial, sans-serif",
  },
  
  heading: {
    color: "#c1121f",
    marginBottom: "20px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    marginBottom: "25px",
  },
  listItem: {
    padding: "12px 0",
    color: "#222",
    fontSize: "15px",
    lineHeight: "1.6",
  },
  // footer: {
  //   display: "flex",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   backgroundColor: "#f4f6ff",
  //   padding: "18px 22px",
  //   borderRadius: "12px",
  // },
   footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f4f6ff",
    padding: "16px 20px",
    borderRadius: "14px",            // 🔥 rounded like 2nd image
    marginTop: "10px",
  },
  question: {
    fontWeight: "bold",
    margin: 0,
  },
  subText: {
    fontSize: "13px",
    color: "#555",
    margin: 0,
  },
  button: {
    background: "linear-gradient(to right, #ff4d4d, #cc0000)",
    border: "none",
    padding: "12px 22px",
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "10px",
    cursor: "pointer",
  },
};

export default Eligibility;


