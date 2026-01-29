// import React from "react";
// import { Heart, Droplet, FileText, User, CheckCircle } from "lucide-react";

// export default function DonorEligibility() {
//   const checklist = [
//     "You are between 18 and 65 years of age.",
//     "You weigh at least 50 kg (110 lbs).",
//     "Your hemoglobin level is within the normal range.",
//     "You are in good general health today.",
//     "You do not have any cold, flu, or other illness.",
//     "You have not donated blood in the last 52 days.",
//   ];

//   return (
//     <div
//       style={{
//         fontFamily: "Arial, sans-serif",
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #f5f5f5 0%, #eeeeee 100%)",
//       }}
//     >
//       {/* Header */}
//       <header
//         style={{
//           background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
//           color: "white",
//           padding: "15px 30px",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
//         }}
//       >
//         <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
//           <div
//             style={{
//               width: "50px",
//               height: "50px",
//               borderRadius: "50%",
//               background: "white",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               overflow: "hidden",
//             }}
//           >
//             <User size={30} color="#e63946" />
//           </div>
//           <div style={{ fontSize: "24px", fontWeight: "bold" }}>
//             Donor Profile
//           </div>
//         </div>

//         <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
//           <button
//             style={{
//               background: "transparent",
//               border: "none",
//               color: "white",
//               cursor: "pointer",
//               display: "flex",
//               alignItems: "center",
//               gap: "5px",
//               fontSize: "14px",
//             }}
//           >
//             <FileText size={18} /> Dashboard
//           </button>

//           <button
//             style={{
//               background: "transparent",
//               border: "none",
//               color: "white",
//               cursor: "pointer",
//             }}
//           >
//             <User size={20} />
//           </button>

//           <button
//             style={{
//               background: "transparent",
//               border: "none",
//               color: "white",
//               cursor: "pointer",
//             }}
//           >
//             🔔
//           </button>

//           <div
//             style={{
//               width: "35px",
//               height: "35px",
//               borderRadius: "50%",
//               background: "#ffa726",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               fontWeight: "bold",
//               fontSize: "18px",
//             }}
//           >
//             3
//           </div>
//         </div>
//       </header>

//       <div
//         style={{
//           display: "flex",
//           maxWidth: "1200px",
//           margin: "30px auto",
//           gap: "20px",
//           padding: "0 20px",
//         }}
//       >
//         {/* Sidebar */}
//         <aside
//           style={{
//             width: "220px",
//             background: "white",
//             borderRadius: "12px",
//             padding: "20px",
//             boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//             height: "fit-content",
//           }}
//         >
//           {[
//             { icon: <FileText size={16} />, label: "Dashboard" },
//             { icon: <Heart size={16} />, label: "Eligibility" },
//             { icon: <Droplet size={16} />, label: "Donate Blood" },
//             { icon: <FileText size={16} />, label: "Donation History" },
//           ].map((item, i) => (
//             <button
//               key={i}
//               style={{
//                 width: "100%",
//                 padding: "12px",
//                 background: "white",
//                 color: "#333",
//                 border: "1px solid #ddd",
//                 borderRadius: "10px",
//                 cursor: "pointer",
//                 marginBottom: "12px",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "10px",
//                 fontSize: "14px",
//                 fontWeight: "600",
//                 transition: "all 0.3s ease",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = "#d62839";
//                 e.currentTarget.style.color = "white";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = "white";
//                 e.currentTarget.style.color = "#333";
//               }}
//             >
//               {item.icon} {item.label}
//             </button>
//           ))}
//         </aside>

//         {/* Main Content */}
//         <main style={{ flex: 1 }}>
//           {/* Page Title */}
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "10px",
//               marginBottom: "15px",
//               color: "#d32f2f",
//               fontWeight: "bold",
//               fontSize: "22px",
//             }}
//           >
//             <Heart size={22} color="#d32f2f" />
//             Check Eligibility
//           </div>

//           {/* Eligibility Card */}
//           <div
//             style={{
//               background: "white",
//               borderRadius: "14px",
//               padding: "30px",
//               boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//               display: "flex",
//               gap: "40px",
//             }}
//           >
//             {/* Checklist */}
//             <div style={{ flex: 1 }}>
//               <h2
//                 style={{
//                   color: "#7a1c1c",
//                   fontSize: "20px",
//                   marginBottom: "20px",
//                   fontWeight: "bold",
//                 }}
//               >
//                 Eligibility Criteria Checklist
//               </h2>

//               {checklist.map((item, i) => (
//                 <div
//                   key={i}
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "10px",
//                     marginBottom: "14px",
//                     color: "#444",
//                     fontSize: "14px",
//                   }}
//                 >
//                   <CheckCircle size={18} color="#4caf50" />
//                   {item}
//                 </div>
//               ))}

//               <div
//                 style={{
//                   marginTop: "10px",
//                   fontSize: "13px",
//                   color: "#1e88e5",
//                   cursor: "pointer",
//                 }}
//               >
//                 See Full Eligibility Guidelines
//               </div>
//             </div>

//             {/* Illustration + Button */}
//             <div
//               style={{
//                 width: "260px",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <div
//                 style={{
//                   position: "relative",
//                   width: "160px",
//                   height: "200px",
//                   background: "linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)",
//                   borderRadius: "20px",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   boxShadow: "0 6px 14px rgba(211, 47, 47, 0.25)",
//                 }}
//               >
//                 <Droplet size={80} color="#d32f2f" fill="#d32f2f" />
                
//                 </div>

//               <button
//                 style={{
//                   marginTop: "20px",
//                   padding: "12px 28px",
//                   background:
//                     "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "10px",
//                   cursor: "pointer",
//                   fontSize: "15px",
//                   fontWeight: "600",
//                   boxShadow: "0 4px 10px rgba(238, 90, 111, 0.4)",
//                 }}
//               >
//                 See Full Eligibility Guidelines
//               </button>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { getEligibility } from "../services/api";

// export default function DonorEligibility() {
//   const [data, setData] = useState({});
//   const uid = 1;

//   useEffect(() => {
//     getEligibility(uid).then(r => setData(r.data));
//   }, []);

//   const box = {
//     width: 650, margin: "40px auto", padding: 25, borderRadius: 14,
//     background: "linear-gradient(#fff,#f4f6ff)", boxShadow: "0 10px 25px rgba(0,0,0,.15)"
//   };

//   return (
//     <div style={box}>
//       <h2 style={{ color: "#b11226" }}>Eligibility Status</h2>
//       <p>Next Eligible Date: <b>{data.nextDate}</b></p>
//       <p>Status: <b style={{ color: data.eligible ? "green" : "red" }}>
//         {data.eligible ? "Eligible" : "Not Eligible"}
//       </b></p>
//     </div>
//   );
// }

import React from "react";
import { Heart, Droplet, CheckCircle } from "lucide-react";

// export default function DonorEligibility() {
  export default function DonorEligibility({ setPage }) {

  const checklist = [
    "You are between 18 and 65 years of age.",
    "You weigh at least 50 kg (110 lbs).",
    "Your hemoglobin level is within the normal range.",
    "You are in good general health today.",
    "You do not have any cold, flu, or other illness.",
    "You have not donated blood in the last 52 days.",
  ];

  return (
    <>
      {/* Page Title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px",
          color: "#fffdfd",
          fontWeight: "bold",
          fontSize: "22px",
        }}
      >
        <Heart size={22} color="#fffdfd" />
        Check Eligibility
      </div>

      {/* Eligibility Card */}
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          padding: "30px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          display: "flex",
          gap: "40px",
        }}
      >
        {/* Checklist */}
        <div style={{ flex: 1 }}>
          <h2
            style={{
              color: "#c1121f",
              fontSize: "20px",
              marginBottom: "20px",
              fontWeight: "bold",
            }}
          >
            Eligibility Criteria Checklist
          </h2>

          {checklist.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "14px",
                color: "#444",
                fontSize: "14px",
              }}
            >
              <CheckCircle size={18} color="#4caf50" />
              {item}
            </div>
          ))}

          <div
            style={{
              marginTop: "10px",
              fontSize: "13px",
              color: "#1e88e5",
              cursor: "pointer",
            }}
             onClick={() => setPage("donate")}
          >
            See Full Eligibility Guidelines
          </div>
        </div>
        

        {/* Illustration + Button */}
        <div
          style={{
            width: "260px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "160px",
              height: "200px",
              background:
                "linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 14px rgba(211, 47, 47, 0.25)",
            }}
          >
            <Droplet size={80} color="#d32f2f" fill="#d32f2f" />
          </div>

          {/* <button
            style={{
              marginTop: "20px",
              padding: "12px 28px",
              background:
                "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "600",
              boxShadow: "0 4px 10px rgba(238, 90, 111, 0.4)",
            }}
          >
            See Full Eligibility Guidelines
          </button> */}
          <button
  onClick={() => setPage("donate")}
  style={{
    marginTop: "20px",
    padding: "12px 28px",
    background:
      "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    boxShadow: "0 4px 10px rgba(238, 90, 111, 0.4)",
  }}
>
  See Full Eligibility Guidelines
</button>

        </div>
      </div>
    </>
  );
}
