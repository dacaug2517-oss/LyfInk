import React, { useState, useEffect } from "react";
import axios from "axios";
import { registerUser } from "../services/UserService";

export default function BloodBankRegister() {

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobno: "",
    address: "",
    stateid: "",
    cityid: "",
    rid: "",
    security_question: "",
    security_answer: "",

    // ✅ Donor Fields
    dob: "",
    gender: "",
    medical_history: "",

    // ✅ ONLY NEW FIELD ADDED
    bcid: "",

    // ✅ Admin HB Fields
    hb_name: "",
    hb_email: "",
    hb_phno: "",
    reg_no: "",
    gst_no: "",
    type: ""
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // ✅ ONLY NEW STATE ADDED
  const [components, setComponents] = useState([]);

  // ✅ Load States
  useEffect(() => {
    axios.get("http://localhost:8080/api/states/all")
      .then((res) => setStates(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ✅ Load Cities when State Changes
  useEffect(() => {
    if (formData.stateid !== "") {
      axios.get(
        `http://localhost:8080/api/cities/bystate/${formData.stateid}`
      )
        .then((res) => setCities(res.data))
        .catch((err) => console.log(err));
    }
  }, [formData.stateid]);

  // ✅ ONLY NEW API CALL ADDED
  useEffect(() => {
    axios.get("http://localhost:8080/api/bloodcomponents/category/1")
      .then((res) => setComponents(res.data))
      .catch((err) => console.log(err));
  }, []);

  const roles = [
    { id: 1, name: "Donor" },
    { id: 2, name: "Admin" }
  ];

  const securityQuestions = [
    "What is your mother's maiden name?",
    "What was the name of your first pet?",
    "What city were you born in?",
    "What is your favorite color?"
  ];

  // ✅ Fixed handleChange (Reset City)
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "stateid") {
      setFormData({
        ...formData,
        stateid: value,
        cityid: ""   // ✅ reset city when state changes
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // ✅ Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // ✅ Payload for Backend DTO
    let userPayload = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      password: formData.password,
      mobno: formData.mobno,
      address: formData.address,

      rid: Number(formData.rid),
      stateid: Number(formData.stateid),
      cityid: Number(formData.cityid),

      security_question: formData.security_question,
      security_answer: formData.security_answer
    };

    // ✅ Donor Details
    if (Number(formData.rid) === 1) {
      userPayload.donorDetails = {
        dob: formData.dob,
        gender: formData.gender,
        medical_history: formData.medical_history,

        // ✅ ONLY NEW LINE ADDED
        bcid: Number(formData.bcid)
      };
    }

    // ✅ Hospital/BloodBank Details
    if (Number(formData.rid) === 2) {
      userPayload.hbDetails = {
        hb_name: formData.hb_name,
        hb_email: formData.hb_email,
        hb_phno: formData.hb_phno,
        reg_no: formData.reg_no,
        gst_no: formData.gst_no,
        type: formData.type
      };
    }

    console.log("Sending Payload:", userPayload);

    try {
      const response = await registerUser(userPayload);
      alert("Registration Successful!!!");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("Registration Failed!!!");
    }
  };

  return (
    <>
      {/* Bootstrap */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

      {/* ✅ Old CSS Styling */}
      <style>{`
        .register-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
          padding: 20px;
        }

        .register-card {
          max-width: 1200px;
          width: 100%;
          background-color: #fff;
          border-radius: 25px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          overflow: hidden;
          display: flex;
          height: 90vh;
        }

        .left-section {
          background: linear-gradient(135deg, #e63946 0%, #f77f8e 100%);
          color: white;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .right-section {
          background-color: #fafafa;
          padding: 2.5rem;
          overflow-y: auto;
        }

        .register-btn {
          width: 100%;
          background-color: #e63946;
          border: none;
          border-radius: 8px;
          font-size: 17px;
          font-weight: 600;
          padding: 12px;
          color: white;
          margin-top: 1rem;
        }

        .register-btn:hover {
          background-color: #d62839;
        }

        h4 {
          margin-top: 15px;
          font-weight: bold;
        }
      `}</style>

      <div className="register-container">
        <div className="register-card">

          {/* Left Section */}
          <div className="col-lg-5 left-section">
            <h1>Blood Bank System</h1>
            <p>Donate Blood. Save Lives.</p>

            <img
              src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg"
              alt="Blood donation"
              className="img-fluid"
              style={{ maxWidth: "300px" }}
            />

            <p className="mt-3">Join our community of life-savers today!</p>
          </div>

          {/* Right Section */}
          <div className="col-lg-7 right-section">
            <h2 className="text-center mb-4 text-danger">
              Create Account
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="row">

                {/* Role */}
                <div className="col-12 mb-3">
                  <label className="form-label">Register As</label>
                  <select
                    className="form-select"
                    name="rid"
                    value={formData.rid}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Role</option>
                    {roles.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Common Fields */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstname"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastname"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Mobile</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="mobno"
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Address */}
                <div className="col-12 mb-3">
                  <label className="form-label">Address</label>
                  <textarea
                    className="form-control"
                    name="address"
                    rows="2"
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* State */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">State</label>
                  <select
                    className="form-select"
                    name="stateid"
                    value={formData.stateid}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select State</option>
                    {states.map((s) => (
                      <option key={s.stateid} value={s.stateid}>
                        {s.statename}
                      </option>
                    ))}
                  </select>
                </div>

                {/* City */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">City</label>
                  <select
                    className="form-select"
                    name="cityid"
                    value={formData.cityid}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select City</option>
                    {cities.map((c) => (
                      <option key={c.cityid} value={c.cityid}>
                        {c.cityname}
                      </option>
                    ))}
                  </select>
                </div>

                {/* ✅ Donor Fields */}
                {Number(formData.rid) === 1 && (
                  <>
                    <h4 className="text-success">Donor Details</h4>

                    
                    {/* ✅ Blood Component Dropdown */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Blood Component</label>
                      <select
                        className="form-select"
                        name="bcid"
                        value={formData.bcid}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Blood Component</option>
                        {components.map((bc) => (
                          <option key={bc.bcid} value={bc.bcid}>
                            {bc.bc_name}
                          </option>
                        ))}
                      </select>
                    </div>


                    <div className="col-md-6 mb-3">
                      <label className="form-label">Date of Birth</label>
                      <input
                        type="date"
                        className="form-control"
                        name="dob"
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Gender</label>
                      <select
                        className="form-select"
                        name="gender"
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>

                    <div className="col-12 mb-3">
                      <label className="form-label">Medical History</label>
                      <textarea
                        className="form-control"
                        name="medical_history"
                        rows="2"
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}

                {/* ✅ Admin Fields (UNCHANGED FULLY) */}
                {Number(formData.rid) === 2 && (
                  <>
                    <h4 className="text-primary">
                      Hospital/BloodBank Details
                    </h4>

                    <div className="col-12 mb-3">
                      <label className="form-label">Hospital Name</label>
                      <input
                        className="form-control"
                        name="hb_name"
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Hospital Email</label>
                      <input
                        className="form-control"
                        name="hb_email"
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Phone</label>
                      <input
                        className="form-control"
                        name="hb_phno"
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Registration No</label>
                      <input
                        className="form-control"
                        name="reg_no"
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">GST No</label>
                      <input
                        className="form-control"
                        name="gst_no"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-12 mb-3">
                      <label className="form-label">Type</label>
                      <select
                        className="form-select"
                        name="type"
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Type</option>
                        <option value="Hospital">Hospital</option>
                        <option value="BloodBank">Blood Bank</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Security Question */}
                <div className="col-12 mb-3">
                  <label className="form-label">Security Question</label>
                  <select
                    className="form-select"
                    name="security_question"
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Question</option>
                    {securityQuestions.map((q, i) => (
                      <option key={i} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Security Answer */}
                <div className="col-12 mb-3">
                  <label className="form-label">Security Answer</label>
                  <input
                    className="form-control"
                    name="security_answer"
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Submit */}
                <div className="col-12">
                  <button type="submit" className="register-btn">
                    Register
                  </button>
                </div>

              </div>
            </form>
          </div>

        </div>
      </div>
    </>
  );
}
