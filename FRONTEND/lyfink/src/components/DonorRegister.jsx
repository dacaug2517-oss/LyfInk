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
  });

  // ✅ States From Database
  const [states, setStates] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/states/all")
      .then((res) => setStates(res.data))
      .catch((err) => console.log(err));
  }, []);
  const [cities, setCities] = useState([]);

  // Fetch cities when state changes
  useEffect(() => {
    if (formData.stateid !== "") {
      axios
        .get(`http://localhost:8080/api/cities/bystate/${formData.stateid}`)
        .then((res) => {
          setCities(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [formData.stateid]);



  const roles = [
    { id: 1, name: "Donor" },
    { id: 2, name: "Recipient" },
    { id: 3, name: "Staff" },
  ];

  const securityQuestions = [
    "What is your mother's maiden name?",
    "What was the name of your first pet?",
    "What city were you born in?",
    "What is your favorite color?",
  ];

  // Handle Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password Validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // ✅ Payload for Spring Boot
    const userPayload = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      password: formData.password,
      mobno: formData.mobno,
      address: formData.address,

      // ManyToOne Mapping
      stateid: { stateid: formData.stateid },
      cityid: { cityid: formData.cityid },
      rid: { rid: formData.rid },

      security_question: formData.security_question,
      security_answer: formData.security_answer,
    };

    try {
      const response = await registerUser(userPayload);

      alert("Registration Successful!!!");
      console.log("Saved User:", response.data);

      // Reset Form
      setFormData({
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
      });
    } catch (error) {
      console.error("Registration Failed:", error);
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

      {/* UI Styling */}
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

            {/* ✅ Form Submit */}
            <form onSubmit={handleSubmit}>
              <div className="row">

                {/* First Name */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Last Name */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Mobile */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Mobile Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="mobno"
                    value={formData.mobno}
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
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={formData.confirmPassword}
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
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* State */}
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

                {/* Security Question */}
                <div className="col-12 mb-3">
                  <label className="form-label">Security Question</label>
                  <select
                    className="form-select"
                    name="security_question"
                    value={formData.security_question}
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
                    type="text"
                    className="form-control"
                    name="security_answer"
                    value={formData.security_answer}
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
