import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../style/admin.css";

export default function ReportAnalysis() {
  const [hospitalReports, setHospitalReports] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.userid) {
      axios
        .get(`http://localhost:5000/api/Report/admin/${user.userid}`)
        .then((res) => {
          setHospitalReports(res.data);
        })
        .catch((err) => console.log("Report Error:", err));
    }
  }, []);

  return (
    <div className="page-box">
      <h2>Reports & Analytics</h2>

      {/* ✅ Hospital Report Table */}
      <div className="report-section">
        <h3>Hospitals Registered By You</h3>

        {hospitalReports.length === 0 ? (
          <p>No hospitals registered yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Hospital Name</th>
                <th>Type</th>
                <th>Total Stock (ml)</th>
                <th>Total Donations</th>
                <th>Total Camps</th>
              </tr>
            </thead>

            <tbody>
              {hospitalReports.map((h, index) => (
                <tr key={index}>
                  <td>{h.hospitalName}</td>
                  <td>{h.type}</td>
                  <td>{h.totalStock}</td>
                  <td>{h.totalDonations}</td>
                  <td>{h.totalCamps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
