import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Style.css";
import authService from "../../services/authService";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState([]);
  const [hospital, setHospital] = useState(null);

  useEffect(() => {
    // ✅ Get Logged In Hospital
    const user = authService.getCurrentUser();
    const hbid = Number(user?.hbid);

    if (!hbid) {
      console.log("❌ Hospital ID not found");
      return;
    }

    const token = localStorage.getItem("token");

    // ✅ Fetch Hospital Profile Details
    axios
      .get(`http://localhost:8081/api/hb/${hbid}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setHospital(res.data);
      })
      .catch((err) => {
        console.error("❌ Error loading hospital profile", err);
      });

    // ✅ Fetch Blood Requests of This Hospital
    axios
      .get(`http://localhost:8081/api/bloodrequest/hospital/${hbid}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setDashboardData(res.data);
      })
      .catch((err) => {
        console.error("❌ Error loading requests", err);
      });
  }, []);

  // ✅ Edit Profile Button Action
  const handleEditProfile = () => {
    alert("Edit Profile Feature Coming Soon ✅");
    // Later: navigate("/hospital/edit-profile")
  };

  return (
    <>
      {/* ✅ Hospital Profile Card */}
      {hospital && (
        <div className="hb-card">
          <h2 className="hb-title">🏥 Hospital Profile</h2>

          <div className="profile-grid">
            <p>
              <b>Name:</b> {hospital.hb_name}
            </p>

            <p>
              <b>Email:</b> {hospital.hb_email}
            </p>

            <p>
              <b>Phone:</b> {hospital.hb_phno}
            </p>

            <p>
              <b>Type:</b> {hospital.type}
            </p>

            <p>
              <b>Reg No:</b> {hospital.reg_no}
            </p>

            <p>
              <b>GST No:</b> {hospital.gst_no}
            </p>
          </div>

          <button className="hb-view" onClick={handleEditProfile}>
            ✏ Edit Profile
          </button>
        </div>
      )}

      {/* ✅ Requested Blood Table */}
      <div className="hb-card">
        <h2 className="hb-title">Requested Blood (My Hospital)</h2>

        {dashboardData.length === 0 ? (
          <p style={{ textAlign: "center" }}>No Requests Found</p>
        ) : (
          <table className="hb-table">
            <thead>
              <tr>
                <th>Blood Type</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {dashboardData.map((d, i) => (
                <tr key={i}>
                  <td>{d.bcid?.bc_name}</td>
                  <td>{d.quantity}</td>
                  <td>
                    <span className="hb-status ok">Pending</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
