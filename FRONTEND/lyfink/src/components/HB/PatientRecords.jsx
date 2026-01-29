import React from "react";
import "./Style.css";

const patients = [
  { id: 101, name: "Alice Thompson", blood: "A+" },
  { id: 102, name: "James White", blood: "O-" },
  { id: 103, name: "Sarah Green", blood: "B+" },
];

export default function PatientRecords() {
  return (
    <div className="hb-card">
      <h2 className="hb-title">Patient Records</h2>

      <table className="hb-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient Name</th>
            <th>Blood Type</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {patients.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td className="highlight">{p.name}</td>
              <td>{p.blood}</td>
              <td>
                <button className="hb-view">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}