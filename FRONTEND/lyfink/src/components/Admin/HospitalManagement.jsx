import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../style/admin.css";

export default function HospitalManagement() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Logged-in Admin Info
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // ✅ Load hospitals registered by this admin
  useEffect(() => {
    if (storedUser?.userid) {
      axios
        .get(
          `http://localhost:5048/api/HbDetails/admin/${storedUser.userid}`
        )
        .then((res) => {
          console.log("Hospitals Data:", res.data);
          setHospitals(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Hospital Fetch Error:", err);
          setLoading(false);
        });
    }
  }, []);

  return (
    <div className="page-box">
      <h2>Hospital / BloodBank Management</h2>

      {/* ✅ Loading */}
      {loading && <p>Loading Hospitals...</p>}

      {/* ✅ Table */}
      {!loading && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>HB ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Type</th>
              <th>Reg No</th>
            </tr>
          </thead>

          <tbody>
            {hospitals.length > 0 ? (
              hospitals.map((h) => (
                <tr key={h.hbid}>
                  <td>{h.hbid}</td>
                  <td>{h.hbName}</td>
                  <td>{h.hbEmail}</td>
                  <td>{h.hbPhno}</td>
                  <td>{h.type}</td>
                  <td>{h.regNo}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No Hospitals Registered
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
