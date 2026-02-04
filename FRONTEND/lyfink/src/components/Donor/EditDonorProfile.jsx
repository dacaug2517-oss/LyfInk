import React, { useEffect, useState } from "react";
import axios from "axios";

export default function EditDonorProfile({
  userId,
  onProfileUpdated,
  onCancel,
}) {
  const [donor, setDonor] = useState(null);
  const [bloodGroups, setBloodGroups] = useState([]);

  // ✅ Fetch donor profile
  const fetchDonor = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8083/api/donor/profile/${userId}`
      );

      const donorData = Array.isArray(res.data) ? res.data[0] : res.data;

      setDonor(donorData || null);
    } catch (err) {
      console.error("❌ Donor API error", err);
    }
  };

  // ✅ Fetch blood groups dropdown
  const fetchBloodGroups = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8083/api/blood-components/blood-groups"
      );
      setBloodGroups(res.data || []);
    } catch (err) {
      console.error("❌ BloodComponent API error", err);
    }
  };

  useEffect(() => {
    fetchDonor();
    fetchBloodGroups();
  }, []);

  // ✅ Loading state
  if (!donor) return <div style={{ padding: 20 }}>⏳ Loading...</div>;

  // ✅ Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Blood group special handling
    if (name === "bcid") {
      setDonor({
        ...donor,
        bcid: { bcid: parseInt(value) },
      });
    }

    // ✅ Name Editing (firstname / lastname)
    else if (name === "firstname" || name === "lastname") {
      setDonor({
        ...donor,
        uid: {
          ...donor.uid,
          [name]: value,
        },
      });
    }

    // Normal fields
    else {
      setDonor({
        ...donor,
        [name]: value,
      });
    }
  };

  // ✅ Submit updated profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `http://localhost:8083/api/donor/profile/${userId}`,
        donor
      );

      alert("✅ Profile updated successfully!");
      onProfileUpdated();
    } catch (err) {
      console.error("❌ Update error", err);
      alert("Failed to update profile");
    }
  };

  return (
    <div style={containerStyle}>
      {/* Back */}
      <div style={backStyle} onClick={onCancel}>
        ← Back to Profile
      </div>

      <h2>Edit Donor Profile</h2>

      <form onSubmit={handleSubmit} style={formStyle}>
        {/* ✅ Editable First Name */}
        <label>
          First Name:
          <input
            type="text"
            name="firstname"
            value={donor.uid?.firstname || ""}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>

        {/* ✅ Editable Last Name */}
        <label>
          Last Name:
          <input
            type="text"
            name="lastname"
            value={donor.uid?.lastname || ""}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>

        {/* ✅ Blood Group */}
        <label>
          Blood Group:
          <select
            name="bcid"
            value={donor.bcid?.bcid || ""}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select</option>
            {bloodGroups.map((bg) => (
              <option key={bg.bcid} value={bg.bcid}>
                {bg.bc_name}
              </option>
            ))}
          </select>
        </label>

        {/* ✅ Gender */}
        <label>
          Gender:
          <select
            name="gender"
            value={donor.gender || ""}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>

        {/* ✅ Medical History */}
        <label>
          Medical History:
          <textarea
            name="medical_history"
            value={donor.medical_history || ""}
            onChange={handleChange}
            rows={3}
            style={inputStyle}
          />
        </label>

        {/* ✅ Buttons */}
        <button type="submit" style={saveBtn}>
          Save Changes
        </button>

        <button type="button" onClick={onCancel} style={cancelBtn}>
          Cancel
        </button>
      </form>
    </div>
  );
}

/* ===================== STYLES ===================== */

const containerStyle = {
  background: "#fff",
  padding: 25,
  borderRadius: 14,
  maxWidth: 600,
  width: "100%",
  boxShadow: "0 20px 45px rgba(0,0,0,0.15)",
  margin: "auto",
};

const backStyle = {
  cursor: "pointer",
  color: "#ff5a5f",
  fontSize: 16,
  marginBottom: 12,
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 15,
};

const inputStyle = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: 6,
  border: "1px solid #ccc",
  fontSize: 14,
  marginTop: 5,
};

const saveBtn = {
  padding: "10px 20px",
  background: "#ff5a5f",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
};

const cancelBtn = {
  padding: "10px 20px",
  background: "#ddd",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
};
