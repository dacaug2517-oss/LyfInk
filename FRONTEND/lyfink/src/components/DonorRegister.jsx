import React, { useState } from 'react';
import axios from "axios";
import "../style/DonorRegisterStyle.css";

export default function DonorRegister() {
  const [formData, setFormData] = useState({
    // firstname: '',
    // lastname: '',
    // email: '',
    // password: '',
    // confirmPassword: '',
    // mobno: '',
    // address: '',
    // stateid: '',
    // cityid: '',
    // rid: '',
    // security_question: '',
    // security_answer: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Registration data:', formData);
  // };






  const handleSubmit = async (e) => {
  e.preventDefault();

  // Basic frontend validation
  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:8080/api/users/register",  // 🔁 your Spring Boot endpoint
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Server response:", response.data);
    alert("Registration successful!");

    // Optional: clear form after success
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
    console.error("Registration error:", error);
    alert(
      error.response?.data?.message || "Registration failed. Try again."
    );
  }
};











  const states = [
    { id: 1, name: 'Maharashtra' },
    { id: 2, name: 'Karnataka' },
    { id: 3, name: 'Tamil Nadu' },
    { id: 4, name: 'Delhi' }
  ];

  const cities = [
    { id: 1, name: 'Mumbai' },
    { id: 2, name: 'Pune' },
    { id: 3, name: 'Bangalore' },
    { id: 4, name: 'Chennai' }
  ];

  const roles = [
    { id: 1, name: 'Donor' },
    { id: 2, name: 'Hospital or Blood Bank' },
    { id: 3, name: 'Admin' }
  ];

  const securityQuestions = [
    "What is your mother's maiden name?",
    'What was the name of your first pet?',
    'What city were you born in?',
    'What is your favorite color?'
  ];

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />


      

      <div className="register-container">
        <div className="register-card">

          {/* Left Section */}
          <div className="col-lg-5 left-section">
            <h1 className="main-title">Blood Bank System</h1>
            <p className="subtitle">Donate Blood. Save Lives.</p>

            <img
              src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg"
              alt="Blood donation"
              className="img-fluid illustration"
            />

            <p className="mt-3">Join our community of life-savers today!</p>
          </div>

          {/* Right Section */}
          <div className="col-lg-7 right-section">
            <h2 className="register-title">
              Create Account
              <div className="title-underline"></div>
            </h2>


          <form onSubmit={handleSubmit} method="get"> 
            <div className="row" >
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  First Name <span className="required">*</span>
                </label>
                <input type="text" className="form-control" name="firstname"
                  value={formData.firstname} onChange={handleChange} required />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Last Name <span className="required">*</span>
                </label>
                <input type="text" className="form-control" name="lastname"
                  value={formData.lastname} onChange={handleChange} required />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Email <span className="required">*</span>
                </label>
                <input type="email" className="form-control" name="email"
                  value={formData.email} onChange={handleChange} required />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Mobile Number <span className="required">*</span>
                </label>
                <input type="tel" className="form-control" name="mobno"
                  value={formData.mobno} onChange={handleChange} required />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Password <span className="required">*</span>
                </label>
                <input type="password" className="form-control" name="password"
                  value={formData.password} onChange={handleChange} required />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Confirm Password <span className="required">*</span>
                </label>
                <input type="password" className="form-control" name="confirmPassword"
                  value={formData.confirmPassword} onChange={handleChange} required />
              </div>

              <div className="col-12 mb-3">
                <label className="form-label">
                  Address <span className="required">*</span>
                </label>
                <textarea className="form-control" name="address" rows="2"
                  value={formData.address} onChange={handleChange} required />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  State <span className="required">*</span>
                </label>
                <select className="form-select" name="stateid"
                  value={formData.stateid} onChange={handleChange} required>
                  <option value="">Select State</option>
                  {states.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  City <span className="required">*</span>
                </label>
                <select className="form-select" name="cityid"
                  value={formData.cityid} onChange={handleChange} required>
                  <option value="">Select City</option>
                  {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div className="col-12 mb-3">
                <label className="form-label">
                  Register As <span className="required">*</span>
                </label>
                <select className="form-select" name="rid"
                  value={formData.rid} onChange={handleChange} required>
                  <option value="">Select Role</option>
                  {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>
              </div>

              <div className="col-12 mb-3">
                <label className="form-label">
                  Security Question <span className="required">*</span>
                </label>
                <select className="form-select" name="security_question"
                  value={formData.security_question} onChange={handleChange} required>
                  <option value="">Select Question</option>
                  {securityQuestions.map((q, i) => <option key={i} value={q}>{q}</option>)}
                </select>
              </div>

              <div className="col-12 mb-3">
                <label className="form-label">
                  Security Answer <span className="required">*</span>
                </label>
                <input type="text" className="form-control" name="security_answer"
                  value={formData.security_answer} onChange={handleChange} required />
              </div>
            </div>
           

            <button  type="submit" className="register-btn">
              Register
            </button>
          </form>

            <div className="login-text">
              Already have an account?{" "}
              <a href="#login" className="login-link">Login here</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}