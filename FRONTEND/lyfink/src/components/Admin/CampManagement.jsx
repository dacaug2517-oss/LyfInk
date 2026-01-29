import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../style/admin.css";

export default function CampManagement() {
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/camps/all")
      .then((res) => setCamps(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="page-box">
      <h2>Donation Camp Management</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Camp Name</th>
            <th>Hospital</th>
            <th>Venue</th>
            <th>Date</th>
            <th>Contact Person</th>
          </tr>
        </thead>

        <tbody>
          {camps.length > 0 ? (
            camps.map((c) => (
              <tr key={c.cid}>
                <td>{c.campName}</td>
                <td>{c.hb?.hbName}</td>
                <td>{c.venue}</td>
                <td>{new Date(c.date).toLocaleDateString()}</td>
                <td>{c.contactPerson}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No Camps Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
