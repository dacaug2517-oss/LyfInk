import React, { useState, useEffect } from "react";
import "./Style.css";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/apiService";
import authService from "../../services/authService";

export default function DonationCampRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hbid: "",
    camp_name: "",
    venue: "",
    date: "",
    from_time: "",
    to_time: "",
    contact_person: "",
    address: "",
    stateid: "",
    cityid: ""
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Auto-fill HBID from logged in user
    const user = authService.getCurrentUser();
    if (user && user.hbid) {
      setFormData(prev => ({ ...prev, hbid: user.hbid }));
    }

    // Load States
    apiService.getAllStates()
      .then(res => setStates(res.data))
      .catch(err => console.error("State load error", err));
  }, []);

  /* ================= LOAD CITIES BY STATE ================= */
  useEffect(() => {
    if (formData.stateid) {
      apiService.getCitiesByState(formData.stateid)
        .then(res => setCities(res.data))
        .catch(err => console.error("City load error", err));
    } else {
      setCities([]);
    }
  }, [formData.stateid]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === "stateid" ? { cityid: "" } : {})
    }));
  };

  /* ================= SUBMIT FORM ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      hbid: Number(formData.hbid),
      camp_name: formData.camp_name,
      venue: formData.venue,
      date: formData.date,
      from_time: formData.from_time + ":00", // IMPORTANT
      to_time: formData.to_time + ":00",     // IMPORTANT
      contact_person: formData.contact_person,
      address: formData.address,
      stateid: Number(formData.stateid),
      cityid: Number(formData.cityid)
    };

    try {
      await apiService.saveDonationCamp(payload);
      alert("Donation Camp Registered Successfully!");
      // Force refresh/navigation to dashboard
      window.location.href = "/hospital-dashboard";
    } catch (err) {
      console.error(err);
      alert("Failed to register donation camp");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="hb-content">
      <div className="dc-container">

        <div className="dc-right">
          <h2 className="mb-4">Register Donation Camp</h2>

          <form onSubmit={handleSubmit} className="hb-form">
            <div className="row">

              {/* HBID */}
              <div className="col-md-6">
                <label className="form-label">Hospital / Blood Bank ID</label>
                <input
                  type="number"
                  className="form-control"
                  name="hbid"
                  value={formData.hbid}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Camp Name */}
              <div className="col-md-6">
                <label className="form-label">Camp Name</label>
                <input
                  className="form-control"
                  name="camp_name"
                  value={formData.camp_name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Venue */}
              <div className="col-12">
                <label className="form-label">Venue</label>
                <input
                  className="form-control"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Date */}
              <div className="col-md-6">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* From Time */}
              <div className="col-md-3">
                <label className="form-label">From Time</label>
                <input
                  type="time"
                  className="form-control"
                  name="from_time"
                  value={formData.from_time}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* To Time */}
              <div className="col-md-3">
                <label className="form-label">To Time</label>
                <input
                  type="time"
                  className="form-control"
                  name="to_time"
                  value={formData.to_time}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Contact Person */}
              <div className="col-md-6">
                <label className="form-label">Contact Person</label>
                <input
                  className="form-control"
                  name="contact_person"
                  value={formData.contact_person}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Address */}
              <div className="col-12">
                <label className="form-label">Hospital / Blood Bank Address</label>
                <textarea
                  className="form-control"
                  rows="2"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* State */}
              <div className="col-md-6">
                <label className="form-label">State</label>
                <select
                  className="form-select"
                  name="stateid"
                  value={formData.stateid}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select State</option>
                  {states.map(s => (
                    <option key={s.stateid} value={s.stateid}>
                      {s.statename}
                    </option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div className="col-md-6">
                <label className="form-label">City</label>
                <select
                  className="form-select"
                  name="cityid"
                  value={formData.cityid}
                  onChange={handleChange}
                  required
                  disabled={!formData.stateid}
                >
                  <option value="">Select City</option>
                  {cities.map(c => (
                    <option key={c.cityid} value={c.cityid}>
                      {c.cityname}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit */}
              <div className="col-12 mt-3">
                <button type="submit" className="dc-btn">
                  Register Camp
                </button>
              </div>

            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
