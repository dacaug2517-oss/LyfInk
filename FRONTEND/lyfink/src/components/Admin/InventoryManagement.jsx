import React from "react";
import "../../style/admin.css";

const stock = [
  { type: "A+", units: 20, critical: 5 },
  { type: "B+", units: 15, critical: 5 },
  { type: "AB-", units: 12, critical: 3 },
  { type: "O-", units: 8, critical: 5 },
];

export default function InventoryManagement() {
  return (
    <div className="page-box">
      <h2>Inventory Management</h2>

      <div className="cards-row">
        <div className="card-box">Total Units Available <b>95</b></div>
        <div className="card-box critical">Critical Low Stock <b>2</b></div>
        <div className="card-box">Blood Types <b>113</b></div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Blood Type</th>
            <th>Units Available</th>
            <th>Critical Level</th>
          </tr>
        </thead>

        <tbody>
          {stock.map((s, i) => (
            <tr key={i}>
              <td>{s.type}</td>
              <td>{s.units}</td>
              <td>{s.critical}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
