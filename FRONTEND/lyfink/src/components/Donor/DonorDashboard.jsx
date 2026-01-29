import React, { useState } from "react";

import {
  LayoutDashboard,
  Droplet,
  ClipboardList,
  HeartHandshake,
  CalendarDays,
  Bell,
  User,
  Settings,
} from "lucide-react";

import DonorProfile from "./DonorProfile";
import DonorEligibility from "./DonorEligibility";
import DonateBlood from "./DonateBlood";
import DonationHistory from "./DonationHistory";
import DonationCamps from "./DonationCamps";
import EditDonorProfile from "./EditDonorProfile";


export default function DonorDashboard() {
  const [page, setPage] = useState("profile");

  const styles = {
    wrapper: {
      display: "flex",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #e31b1b 0%, #d11d38 100%)",
      fontFamily: "Segoe UI, sans-serif",
    },
    header: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      height: 60,
      background: "rgba(255,255,255,0.15)",
      backdropFilter: "blur(10px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      color: "#fff",
      zIndex: 10,
    },
    sidebar: {
      width: 260,
      paddingTop: 80,
      background: "rgba(255,255,255,0.15)",
      backdropFilter: "blur(12px)",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    nav: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      padding: "0 10px",
    },
    btn: (active) => ({
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 16px",
      borderRadius: 10,
      border: "none",
      cursor: "pointer",
      background: active ? "#fff" : "transparent",
      color: active ? "#ee5a6f" : "#fff",
      fontSize: 15,
    }),
    main: {
      flex: 1,
      padding: "90px 30px 30px",
    },
  };

  return (
    <>
      <header style={styles.header}>
        <h2>Donor Panel</h2>
        <div style={{ display: "flex", gap: 14}}>
          <User size={18} />
          <Bell size={18} />
        </div>
      </header>

      <div style={styles.wrapper}>
        <aside style={styles.sidebar}>
          <nav style={styles.nav}>
            <button style={styles.btn(page === "profile")} onClick={() => setPage("profile")}>
              <LayoutDashboard size={18} /> Dashboard
            </button>

            <button style={styles.btn(page === "eligibility")} onClick={() => setPage("eligibility")}>
              <Droplet size={18} /> Eligibility
            </button>

            <button style={styles.btn(page === "donate")} onClick={() => setPage("donate")}>
              <HeartHandshake size={18} /> Donate Blood
            </button>

            <button style={styles.btn(page === "history")} onClick={() => setPage("history")}>
              <ClipboardList size={18} /> Donation History
            </button>

            <button style={styles.btn(page === "camps")} onClick={() => setPage("camps")}>
              <CalendarDays size={18} /> Donation Camps
            </button>
          </nav>

          <button style={styles.btn(false)}>
            <Settings size={18} /> Settings
          </button>
        </aside>

        <section style={styles.main}>
          {page === "profile" && <DonorProfile setPage={setPage} />}
          {page === "eligibility" && <DonorEligibility setPage={setPage} />}
          {page === "donate" && <DonateBlood />}
          {page === "history" && <DonationHistory />}
          {page === "camps" && <DonationCamps />}
          {page === "edit-profile" && <EditDonorProfile />}

        </section>
      </div>
    </>
  );
}


// import React, { useState } from "react";
// import { Navigate } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Droplet,
//   ClipboardList,
//   HeartHandshake,
//   CalendarDays,
//   Bell,
//   User,
//   Settings,
//   LogOut,
// } from "lucide-react";

// import DonorProfile from "./DonorProfile";
// import DonorEligibility from "./DonorEligibility";
// import DonateBlood from "./DonateBlood";
// import DonationHistory from "./DonationHistory";
// import DonationCamps from "./DonationCamps";
// import EditDonorProfile from "./EditDonorProfile";

// export default function DonorDashboard() {

//   /* ✅ HOOKS FIRST (VERY IMPORTANT) */
//   const [page, setPage] = useState("profile");

//   /* 🔐 ROLE CHECK AFTER HOOKS */
//   const userRole = localStorage.getItem("userRole");
//   if (userRole !== "DONOR") {
//     return <Navigate to="/" />;
//   }

//   /* 🚪 LOGOUT */
//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };

//   const styles = {
//     wrapper: {
//       display: "flex",
//       minHeight: "100vh",
//       background: "linear-gradient(135deg, #e31b1b 0%, #d11d38 100%)",
//       fontFamily: "Segoe UI, sans-serif",
//     },
//     header: {
//       position: "fixed",
//       top: 0,
//       left: 0,
//       right: 0,
//       height: 60,
//       background: "rgba(255,255,255,0.15)",
//       backdropFilter: "blur(10px)",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//       padding: "0 20px",
//       color: "#fff",
//       zIndex: 10,
//     },
//     sidebar: {
//       width: 260,
//       paddingTop: 80,
//       background: "rgba(255,255,255,0.15)",
//       backdropFilter: "blur(12px)",
//       color: "#fff",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "space-between",
//     },
//     nav: {
//       display: "flex",
//       flexDirection: "column",
//       gap: 6,
//       padding: "0 10px",
//     },
//     btn: (active) => ({
//       display: "flex",
//       alignItems: "center",
//       gap: 12,
//       padding: "12px 16px",
//       borderRadius: 10,
//       border: "none",
//       cursor: "pointer",
//       background: active ? "#fff" : "transparent",
//       color: active ? "#ee5a6f" : "#fff",
//       fontSize: 15,
//       fontWeight: 600,
//     }),
//     main: {
//       flex: 1,
//       padding: "90px 30px 30px",
//     },
//   };

//   const renderPage = () => {
//     switch (page) {
//       case "profile":
//         return <DonorProfile setPage={setPage} />;
//       case "eligibility":
//         return <DonorEligibility />;
//       case "donate":
//         return <DonateBlood />;
//       case "history":
//         return <DonationHistory />;
//       case "camps":
//         return <DonationCamps />;
//       case "edit-profile":
//         return <EditDonorProfile />;
//       default:
//         return <DonorProfile setPage={setPage} />;
//     }
//   };

//   return (
//     <>
//       <header style={styles.header}>
//         <h2>Donor Panel</h2>
//         <div style={{ display: "flex", gap: 16 }}>
//           <User size={18} />
//           <Bell size={18} />
//           <LogOut size={18} style={{ cursor: "pointer" }} onClick={handleLogout} />
//         </div>
//       </header>

//       <div style={styles.wrapper}>
//         <aside style={styles.sidebar}>
//           <nav style={styles.nav}>
//             <button style={styles.btn(page === "profile")} onClick={() => setPage("profile")}>
//               <LayoutDashboard size={18} /> Dashboard
//             </button>

//             <button style={styles.btn(page === "eligibility")} onClick={() => setPage("eligibility")}>
//               <Droplet size={18} /> Eligibility
//             </button>

//             <button style={styles.btn(page === "donate")} onClick={() => setPage("donate")}>
//               <HeartHandshake size={18} /> Donate Blood
//             </button>

//             <button style={styles.btn(page === "history")} onClick={() => setPage("history")}>
//               <ClipboardList size={18} /> Donation History
//             </button>

//             <button style={styles.btn(page === "camps")} onClick={() => setPage("camps")}>
//               <CalendarDays size={18} /> Donation Camps
//             </button>
//           </nav>

//           <button style={styles.btn(false)} onClick={() => setPage("edit-profile")}>
//             <Settings size={18} /> Edit Profile
//           </button>
//         </aside>

//         <section style={styles.main}>
//           {renderPage()}
//         </section>
//       </div>
//     </>
//   );
// }
