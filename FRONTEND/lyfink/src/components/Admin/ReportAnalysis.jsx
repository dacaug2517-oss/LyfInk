import React from "react";
import "../../style/admin.css";

export default function ReportAnalysis() {
  return (
    <div className="page-box">
      <h2>Reports & Analytics</h2>

      <div className="cards-row">
        <div className="card-box">Total Donations This Month <b>92</b></div>
        <div className="card-box">Total Requests This Month <b>35</b></div>
        <div className="card-box">Average Fulfill Time <b>3.5 Hours</b></div>
      </div>

      <div className="report-section">
        <h3>Recent Activity</h3>
        <ul>
          <li>Blood Donation Completed - Springfield</li>
          <li>Urgent Request Raised - Greenfield</li>
          <li>Inventory Updated - O- Stock Low</li>
        </ul>
      </div>
    </div>
  );
}
