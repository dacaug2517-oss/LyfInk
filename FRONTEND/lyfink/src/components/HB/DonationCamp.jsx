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

  const [errors, setErrors] = useState({});

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

  const validateField = (name, value) => {
    let error = "";

    if (name === "date") {
      const today = new Date().toISOString().split("T")[0];
      if (value < today) {
        error = "Date cannot be in the past";
      }
    }

    if (name === "from_time" || name === "to_time") {
      if (value) {
        const [hh, mm] = value.split(":").map(Number);
        const minutes = hh * 60 + mm;
        const minTime = 8 * 60;
        const maxTime = 20 * 60;
        if (minutes < minTime || minutes > maxTime) {
          error = "Time must be between 08:00 AM and 08:00 PM";
        }
      }
    }

    return error;
  };

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === "stateid" ? { cityid: "" } : {})
    }));

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: validateField(name, value)
    }));
  };

  /* ================= SUBMIT FORM ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const payload = {
      hbid: JSON.parse(localStorage.getItem("user"))?.hbid,
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

              {/* Hidden HBID Field */}
              <input type="hidden" name="hbid" value={formData.hbid} />

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
                  className={`form-control ${errors.date ? "is-invalid" : ""}`}
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
                {errors.date && (
                  <small className="text-danger">{errors.date}</small>
                )}
              </div>

              {/* From Time */}
              <div className="col-md-3">
                <label className="form-label">From Time</label>
                <input
                  type="time"
                  className={`form-control ${errors.from_time ? "is-invalid" : ""}`}
                  name="from_time"
                  value={formData.from_time}
                  onChange={handleChange}
                  required
                  min="08:00"
                  max="20:00"
                />
                {errors.from_time && (
                  <small className="text-danger">{errors.from_time}</small>
                )}
              </div>

              {/* To Time */}
              <div className="col-md-3">
                <label className="form-label">To Time</label>
                <input
                  type="time"
                  className={`form-control ${errors.to_time ? "is-invalid" : ""}`}
                  name="to_time"
                  value={formData.to_time}
                  onChange={handleChange}
                  required
                  min="08:00"
                  max="20:00"
                />
                {errors.to_time && (
                  <small className="text-danger">{errors.to_time}</small>
                )}
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
