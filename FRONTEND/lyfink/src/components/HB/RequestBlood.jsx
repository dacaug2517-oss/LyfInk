import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RequestBlood() {

  const [bloodList, setBloodList] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({
    bcid: "",
    quantity: "",
    urgency: "Urgent",
    purpose: "",
    requiredby: "",
    contact_no: "",
    stateid: "",
    cityid: ""
  });

  /* ---------------- FETCH BLOOD COMPONENTS ---------------- */
  useEffect(() => {
    axios.get("http://localhost:8081/api/bloodcomponents")
      .then(res => setBloodList(res.data))
      .catch(err => console.error("Blood components error:", err));
  }, []);

  /* ---------------- FETCH STATES ---------------- */
  useEffect(() => {
    axios.get("http://localhost:8081/api/states/all")
      .then(res => setStates(res.data))
      .catch(err => console.error("States error:", err));
  }, []);

  /* ---------------- FETCH CITIES BY STATE ---------------- */
  useEffect(() => {
    if (formData.stateid) {
      axios.get(`http://localhost:8081/api/cities/bystate/${formData.stateid}`)
        .then(res => setCities(res.data))
        .catch(err => console.error("Cities error:", err));
    } else {
      setCities([]);
    }
  }, [formData.stateid]);

  /* ---------------- HANDLE INPUT CHANGE ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /* ---------------- SUBMIT FORM ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      bcid: Number(formData.bcid),
      quantity: Number(formData.quantity),
      urgency: formData.urgency,
      purpose: formData.purpose,
      requiredby: formData.requiredby,
      contact_no: formData.contact_no,
      stateid: Number(formData.stateid),
      cityid: Number(formData.cityid)
    };

    try {
      await axios.post(
        "http://localhost:8081/api/request/saverequest",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      alert("Blood request submitted successfully");

      setFormData({
        bcid: "",
        quantity: "",
        urgency: "Urgent",
        purpose: "",
        requiredby: "",
        contact_no: "",
        stateid: "",
        cityid: ""
      });
      setCities([]);

    } catch (err) {
      console.error("Request submit error:", err.response?.data || err.message);
      alert("Failed to submit request");
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="container mt-4">
      <div className="card p-4 shadow">
        <h3 className="text-center text-danger mb-4">Request Blood</h3>

        <form onSubmit={handleSubmit}>
          <div className="row">

            <div className="col-md-6 mb-3">
              <label>Blood Type</label>
              <select
                className="form-select"
                name="bcid"
                value={formData.bcid}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                {bloodList.map(b => (
                  <option key={b.bcid} value={b.bcid}>{b.bc_name}</option>
                ))}
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label>Total Units</label>
              <input
                type="number"
                className="form-control"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Urgency</label>
              <select
                className="form-select"
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
              >
                <option value="Urgent">Urgent</option>
                <option value="Normal">Normal</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label>Required By</label>
              <input
                type="date"
                className="form-control"
                name="requiredby"
                value={formData.requiredby}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Purpose</label>
              <input
                type="text"
                className="form-control"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Contact Number</label>
              <input
                type="text"
                className="form-control"
                name="contact_no"
                value={formData.contact_no}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>State</label>
              <select
                className="form-select"
                name="stateid"
                value={formData.stateid}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                {states.map(s => (
                  <option key={s.stateid} value={s.stateid}>{s.statename}</option>
                ))}
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label>City</label>
              <select
                className="form-select"
                name="cityid"
                value={formData.cityid}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                {cities.map(c => (
                  <option key={c.cityid} value={c.cityid}>{c.cityname}</option>
                ))}
              </select>
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-danger w-100">
                Submit Request
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
