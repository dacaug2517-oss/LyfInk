import React from "react";
import "../../style/admin.css";

import HospitalStockChart from "../Admin/Reports/HospitalStockChart";
import RegisteredHospitalsChart from "../Admin/Reports/RegisteredHospitalChart";

export default function ReportAnalysis() {
  return (
    <div className="page-box">
      <h2>Reports & Analytics Dashboard</h2>

      {/* ============================= */}
      {/* ✅ Chart 1: Stock Report */}
      {/* ============================= */}
      <div className="report-section">
        <h3>1. Blood Stock Report</h3>
        <p className="report-desc">
          This chart shows total blood stock (in ml) available in each hospital.
        </p>

        <div className="chart-box">
          <HospitalStockChart />
        </div>
      </div>

      {/* ============================= */}
      {/* ✅ Chart 2: Registered Hospitals */}
      {/* ============================= */}
      <div className="report-section">
        <h3>2. Hospitals Registered Report</h3>
        <p className="report-desc">
          This chart shows all hospitals registered under the logged-in admin.
        </p>

        <div className="chart-box">
          <RegisteredHospitalsChart />
        </div>
      </div>
    </div>
  );
}
