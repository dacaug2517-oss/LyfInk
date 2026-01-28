import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../style/admin.css";

export default function BloodRequests() {
  const [requests, setRequests] = useState([]);

  // ✅ Fetch Data From .NET MVC API
  useEffect(() => {
    axios
      .get("https://localhost:5001/api/BloodRequests") // .NET API URL
      .then((res) => {
        setRequests(res.data);
      })
      .catch((err) => {
        console.error("Error fetching blood requests:", err);
      });
  }, []);

  return (
    <div className="page-box">
      <h2>Blood Requests (Database Records)</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>User ID</th>
            <th>Component ID</th>
            <th>Quantity</th>
            <th>Request Date</th>
            <th>Required By</th>
            <th>Purpose</th>
            <th>Contact No</th>
            <th>State ID</th>
            <th>City ID</th>
          </tr>
        </thead>

        <tbody>
          {requests.length > 0 ? (
            requests.map((req) => (
              <tr key={req.brid}>
                <td>{req.brid}</td>
                <td>{req.uid}</td>
                <td>{req.bcid}</td>
                <td>{req.quantity}</td>

                <td>
                  {new Date(req.request_Date).toLocaleDateString()}
                </td>

                <td>
                  {new Date(req.requiredBy).toLocaleDateString()}
                </td>

                <td>{req.purpose}</td>
                <td>{req.contact_No}</td>
                <td>{req.stateid}</td>
                <td>{req.cityid}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" style={{ textAlign: "center" }}>
                No Blood Requests Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
