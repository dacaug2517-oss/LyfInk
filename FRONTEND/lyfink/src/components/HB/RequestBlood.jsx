

import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RequestBlood() {
  const [selectedBlood, setSelectedBlood] = useState("");
  const [bloodList, setBloodList] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({
    quantity: "",
    urgency: "Urgent",
    purpose: "",
    requiredby: "",
    contact_no: "",
    stateid: "",
    cityid: "",
  });

  useEffect(() => {
    axios.get("http://localhost:8080/api/blood-components")
      .then(res => setBloodList(res.data));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/api/states/all")
      .then(res => setStates(res.data));
  }, []);

  useEffect(() => {
    if (formData.stateid) {
      axios.get(`http://localhost:8080/api/cities/bystate/${formData.stateid}`)
        .then(res => setCities(res.data));
    } else {
      setCities([]);
    }
  }, [formData.stateid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
  bcid: {
    bcid: Number(selectedBlood)
  },
  quantity: Number(formData.quantity),
  urgency: formData.urgency,
  purpose: formData.purpose,
  requiredby: formData.requiredby,
  contact_no: formData.contact_no,
  state: {
    stateid: Number(formData.stateid)
  },
  city: {
    cityid: Number(formData.cityid)
  }
};


    try {
      await axios.post(
        "http://localhost:8080/api/request/saverequest",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      alert("Blood request submitted successfully");
      alert("Check on dashboard to see your request")

      setSelectedBlood("");
      setFormData({
        quantity: "",
        urgency: "",
        purpose: "",
        requiredby: "",
        contact_no: "",
        stateid: "",
        cityid: "",
      });
      setCities([]);
    } catch (err) {
      console.error(err);
      alert("Failed to submit request");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow">
        <h3 className="text-center text-danger mb-4">Request Blood</h3>

        <form onSubmit={handleSubmit}>
          <div className="row">

            <div className="col-md-6 mb-3">
              <label>Blood Type</label>
              <select className="form-select"
                value={selectedBlood}
                onChange={(e) => setSelectedBlood(e.target.value)}
                required>
                <option value="">Select</option>
                {bloodList.map(bt => (
                  <option key={bt.bcid} value={bt.bcid}>{bt.bc_name}</option>
                ))}
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label>Total Units</label>
              <input type="number" className="form-control"
                name="quantity" value={formData.quantity}
                onChange={handleChange} required />
            </div>

            <div className="col-md-6 mb-3">
              <label>Urgency</label>
              <select className="form-select"
                name="urgency" value={formData.urgency}
                onChange={handleChange}>
                <option>Urgent</option>
                <option>Normal</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label>Required By</label>
              <input type="date" className="form-control"
                name="requiredby" value={formData.requiredby}
                onChange={handleChange} required />
            </div>

            <div className="col-md-6 mb-3">
              <label>Purpose</label>
              <input className="form-control"
                name="purpose" value={formData.purpose}
                onChange={handleChange} required />
            </div>

            <div className="col-md-6 mb-3">
              <label>Contact No</label>
              <input className="form-control"
                name="contact_no" value={formData.contact_no}
                onChange={handleChange} required />
            </div>

            <div className="col-md-6 mb-3">
              <label>State</label>
              <select className="form-select"
                name="stateid" value={formData.stateid}
                onChange={handleChange} required>
                <option value="">Select</option>
                {states.map(s => (
                  <option key={s.stateid} value={s.stateid}>{s.statename}</option>
                ))}
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label>City</label>
              <select className="form-select"
                name="cityid" value={formData.cityid}
                onChange={handleChange} required>
                <option value="">Select</option>
                {cities.map(c => (
                  <option key={c.cityid} value={c.cityid}>{c.cityname}</option>
                ))}
              </select>
            </div>

            <div className="col-12">
              <button className="btn btn-danger w-100">Submit Request</button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
