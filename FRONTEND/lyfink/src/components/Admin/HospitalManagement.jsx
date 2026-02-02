import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../style/admin.css";

export default function HospitalManagement() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Edit Modal States
  const [showModal, setShowModal] = useState(false);
  const [editHospital, setEditHospital] = useState(null);

  // ✅ Logged-in Admin Info
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // ✅ Load hospitals registered by this admin
  useEffect(() => {
    if (storedUser?.userid) {
      fetchHospitals();
    }
  }, []);

  // ✅ Fetch Hospitals Function
  const fetchHospitals = () => {
    axios
      .get(`http://localhost:5048/api/HbDetails/admin/${storedUser.userid}`)
      .then((res) => {
        console.log("Hospitals Data:", res.data);
        setHospitals(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Hospital Fetch Error:", err);
        setLoading(false);
      });
  };

  // ✅ Delete Hospital Function
  const handleDelete = (hbid) => {
    if (window.confirm("Are you sure you want to delete this hospital?")) {
      axios
        .delete(`http://localhost:5048/api/HbDetails/${hbid}`)
        .then(() => {
          alert("Hospital Deleted Successfully!");

          // ✅ Remove from UI immediately
          setHospitals(hospitals.filter((h) => h.hbid !== hbid));
        })
        .catch((err) => {
          console.log("Delete Error:", err);
          alert("Failed to Delete Hospital!");
        });
    }
  };

  // ✅ Open Edit Modal
  const handleEdit = (hospital) => {
    setEditHospital(hospital);
    setShowModal(true);
  };

  // ✅ Update Hospital Function
  const handleUpdate = () => {
    axios
      .put(
        `http://localhost:5048/api/HbDetails/${editHospital.hbid}`,
        editHospital
      )
      .then(() => {
        alert("Hospital Updated Successfully!");

        // ✅ Update UI instantly
        setHospitals(
          hospitals.map((h) =>
            h.hbid === editHospital.hbid ? editHospital : h
          )
        );

        setShowModal(false);
      })
      .catch((err) => {
        console.log("Update Error Full:", err.response.data);
        alert("Failed: " + err.response.data);
      });

  };

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
              <th>Action</th>
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

                  {/* ✅ Action Buttons */}
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(h)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(h.hbid)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No Hospitals Registered
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* ✅ Edit Modal */}
      {showModal && editHospital && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Edit Hospital Details</h3>

            {/* Hospital Name */}
            <input
              type="text"
              value={editHospital.hbName}
              onChange={(e) =>
                setEditHospital({ ...editHospital, hbName: e.target.value })
              }
              placeholder="Hospital Name"
            />

            {/* Email */}
            <input
              type="email"
              value={editHospital.hbEmail}
              onChange={(e) =>
                setEditHospital({ ...editHospital, hbEmail: e.target.value })
              }
              placeholder="Hospital Email"
            />

            {/* Phone */}
            <input
              type="text"
              value={editHospital.hbPhno}
              onChange={(e) =>
                setEditHospital({ ...editHospital, hbPhno: e.target.value })
              }
              placeholder="Phone Number"
            />

            {/* Registration Number */}
            <input
              type="text"
              value={editHospital.regNo}
              onChange={(e) =>
                setEditHospital({ ...editHospital, regNo: e.target.value })
              }
              placeholder="Registration Number"
            />

            {/* GST Number */}
            <input
              type="text"
              value={editHospital.gstNo}
              onChange={(e) =>
                setEditHospital({ ...editHospital, gstNo: e.target.value })
              }
              placeholder="GST Number"
            />

            {/* Type */}
            <input
              type="text"
              value={editHospital.type}
              onChange={(e) =>
                setEditHospital({ ...editHospital, type: e.target.value })
              }
              placeholder="Type (Hospital/BloodBank)"
            />

            {/* Password */}
            <input
              type="text"
              value={editHospital.hbPassword}
              onChange={(e) =>
                setEditHospital({ ...editHospital, hbPassword: e.target.value })
              }
              placeholder="Hospital Password"
            />

            {/* Buttons */}
            <div className="modal-actions">
              <button className="save-btn" onClick={handleUpdate}>
                Save
              </button>

              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
