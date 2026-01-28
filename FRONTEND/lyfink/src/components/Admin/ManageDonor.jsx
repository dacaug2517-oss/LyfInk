import React from "react";
import "../../style/admin.css";

const donors = [
  { name: "John Doe", type: "O+", city: "Springfield", date: "04/10/2024" },
  { name: "Sarah Smith", type: "A+", city: "Springfield", date: "02/14/2024" },
  { name: "Mark Wilson", type: "B-", city: "Greenfield", date: "01/05/2024" },
];

export default function ManageDonor() {
  return (
    <div className="page-box">
      <h2>Manage Donors</h2>

      <div className="cards-row">
        <div className="card-box">Total Donors <b>256</b></div>
        <div className="card-box">Registered Last Month <b>28</b></div>
        <div className="card-box">Active Donors <b>213</b></div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Blood Type</th>
            <th>City</th>
            <th>Last Donation</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {donors.map((d, i) => (
            <tr key={i}>
              <td>{d.name}</td>
              <td>{d.type}</td>
              <td>{d.city}</td>
              <td>{d.date}</td>
              <td><span className="status active">Active</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
