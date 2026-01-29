import React, { useEffect, useState } from "react";
import axios from "axios";

export default function EditDonorProfile({ userId, onProfileUpdated, onCancel}) {
  const [donor, setDonor] = useState(null);
  const [bloodGroups, setBloodGroups] = useState([]);

  // Fetch donor profile to pre-fill form
  const fetchDonor = () => {
    axios
      .get(`http://localhost:8080/api/donor/profile/${userId}`)
      .then((res) => {
        // assuming backend returns a list
        if (res.data.length > 0) {
          setDonor(res.data[0]);
        }
      })
      .catch((err) => console.error("Donor API error", err));
  };

  // Fetch blood groups for dropdown
  const fetchBloodGroups = () => {
    axios
      .get("http://localhost:8080/api/blood-components/blood-groups") // create this endpoint if not exists
      .then((res) => setBloodGroups(res.data))
      .catch((err) => console.error("BloodComponent API error", err));
  };

  useEffect(() => {
    fetchDonor();
    fetchBloodGroups();
  }, []);

  if (!donor) return <div>Loading...</div>;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "bcid") {
      setDonor({ ...donor, bcid: { bcid: parseInt(value) } });
    } else {
      setDonor({ ...donor, [name]: value });
    }
  };

  //  Submit updated profile
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/api/donor/profile/${userId}`, donor)
      .then((res) => {
        alert("Profile updated successfully!");
        onProfileUpdated(); // refresh parent page
      })
      .catch((err) => {
        console.error("Update error", err);
        alert("Failed to update profile");
      });
  };

  return (
    <div style={{ 
       background: "#fff",
       padding: 20,
       borderRadius: 14,
       maxWidth: 600,
       width: "100%",
       boxShadow: "0 20px 45px rgba(0,0,0,0.15)",
       margin: "auto",     
       position: "relative",
       top: "50%",
       transform: "translateY(-50%)"
  }}
>
      {/* Back Icon */}
  <div
    style={{
      cursor: "pointer",
      color: "#ff5a5f",
      fontSize: 18,
      marginBottom: 10
    }}
    onClick={onCancel}
  >
    ← Back to Profile
  </div>
      <h2>
        Edit Donor Profile</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
        
        <label>
          Full Name: <b>{donor.uid.firstname} {donor.uid.lastname}</b> (cannot change here)
        </label>

        <label>
          Blood Group:
          <select name="bcid" value={donor.bcid?.bcid || ""} onChange={handleChange} required    style={inputStyle}>
            <option value="">Select</option>
            {bloodGroups.map((bg) => (
              <option key={bg.bcid} value={bg.bcid}>
                {bg.bc_name}
              </option>
            ))}
          </select>
        </label>

        
        <label>
          Gender:
          <select name="gender" value={donor.gender || ""} onChange={handleChange} required     style={inputStyle}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Medical History:
          <textarea
            name="medical_history"
            value={donor.medical_history || ""}
            onChange={handleChange}
            placeholder="Enter any medical history"
            rows={3}
            style={inputStyle}
          />
        </label>

        <button type="submit" style={{ padding: "10px 20px", background: "#ff5a5f", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}>
          Save Changes
        </button>

        <button
        type="button"
        onClick={onCancel}
        style={{
        padding: "10px 20px",
        background: "#ddd",
        borderRadius: 8,
        border: "none",
        cursor: "pointer"
  }}
>
  Cancel
</button>

      </form>
    </div>
  );
}
/* ===================== STYLES ===================== */

const rowStyle = {
  display: "grid",
  gridTemplateColumns: "120px 1fr", 
  alignItems: "center",
  marginBottom: 12,
};

const labelStyle = {
  fontWeight: 500,
  fontSize: 13,
};

const inputStyle = {
  width: "100%",
  padding: "8px 10px", 
  borderRadius: 6,   
  border: "1px solid #ccc",
  fontSize: 13,       
};
