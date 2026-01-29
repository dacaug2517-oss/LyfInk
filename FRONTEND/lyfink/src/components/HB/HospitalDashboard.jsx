
import React, { useState } from "react";
import {
  LayoutDashboard,
  Droplet,
  ClipboardList,
  FileText,
  Truck,
  Settings,
  Bell,
  User,
} from "lucide-react";

import Dashboard from "./Dashboard";
import RequestBlood from "./RequestBlood";
import BloodStock from "./BloodStock";
import PatientRecords from "./PatientRecords";
import OrderFulfillment from "./OrderFulfillment";


import "./Style.css";

export default function HospitalDashboard() {
  const [page, setPage] = useState("request");

  return (
    <>
   
    <header className="hb-header">
          <h1>Hospital / Blood Bank</h1>

          <div className="hb-icons">
            <User size={18} />
            <Bell size={18} />
            <span className="hb-badge">4</span>
          </div>
        </header>
    <div className="hb-wrapper">
       

      {/* SIDEBAR (LEFT) */}
      <aside className="hb-sidebar">
        <h2 className="hb-logo">Hospital / Blood Bank</h2>

        <nav>
          <button
            className={page === "dashboard" ? "active" : ""}
            onClick={() => setPage("dashboard")}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button
            className={page === "request" ? "active" : ""}
            onClick={() => setPage("request")}
          >
            <Droplet size={18} />
            Request Blood
          </button>

          <button
            className={page === "stock" ? "active" : ""}
            onClick={() => setPage("stock")}
          >
            <ClipboardList size={18} />
            Check Blood Stock
          </button>

          <button
            className={page === "patients" ? "active" : ""}
            onClick={() => setPage("patients")}
          >
            <FileText size={18} />
            Patient Records
          </button>

          <button
            className={page === "orders" ? "active" : ""}
            onClick={() => setPage("orders")}
          >
            <Truck size={18} />
            Order Fulfillment
          </button>
        </nav>

        <div className="hb-bottom">
          <button>
            <Settings size={18} />
            System Settings
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT (RIGHT) */}
      <section className="hb-main">
        
        {/* HEADER */}
       

        {/* PAGE CONTENT */}
        <div className="hb-content">
          {page === "dashboard" && <Dashboard />}
          {page === "request" && <RequestBlood />}
          {page === "stock" && <BloodStock />}
          {page === "patients" && <PatientRecords />}
          {page === "orders" && <OrderFulfillment />}
        </div>

      </section>
    </div>
     </>
  );
}
