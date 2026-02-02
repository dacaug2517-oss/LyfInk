import React, { useState, useEffect } from "react";
import axios from "axios";
import { registerUser } from "../services/UserService";
import { useNavigate } from "react-router-dom";



export default function BloodBankRegister() {

  const navigate = useNavigate();


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
    rid: 2,
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
    hb_password: "",
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

    { id: 2, name: "Donor" },
    { id: 3, name: "Hospital/Bloodbank" }
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
      // Handle mobile number: Remove spaces/dashes, then convert to Number. Handle potential NaN.
      mobno: formData.mobno ? Number(formData.mobno.toString().replace(/\D/g, '')) || 0 : 0,
      mobNo: formData.mobno ? Number(formData.mobno.toString().replace(/\D/g, '')) || 0 : 0, // Duplicate to ensure backend match
      address: formData.address,

      rid: Number(formData.rid),
      stateid: Number(formData.stateid),
      cityid: Number(formData.cityid),

      security_question: formData.security_question,
      security_answer: formData.security_answer
    };

    // ✅ Donor Details
    if (Number(formData.rid) === 2) {
      userPayload.donorDetails = {
        dob: formData.dob,
        gender: formData.gender,
        medical_history: formData.medical_history,

        // ✅ ONLY NEW LINE ADDED
        bcid: Number(formData.bcid)
      };
    }

    // ✅ Hospital/BloodBank Details
    if (Number(formData.rid) === 3) {
      userPayload.hbDetails = {
        hb_name: formData.hb_name,
        hb_email: formData.hb_email,
        hb_password: formData.hb_password,
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
      navigate("/login")

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

      {/* ✅ Softer, More Pleasant Blue Color Scheme */}
      <style>{`
  .register-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    /* Soft, pleasant pastel blue background */
    background: linear-gradient(135deg, #E3F2FD 0%, #F0F4F8 100%);
    padding: 20px;
  }

  .register-card {
    max-width: 1200px;
    width: 100%;

    /* Pure white card for clean medical look */
    background-color: #FFFFFF;

    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    display: flex;
    height: 90vh;
  }

  .left-section {
    /* Softer, pleasant blue gradient - lighter and more eye-friendly */
    background: linear-gradient(160deg, #42A5F5 0%, #5C6BC0 50%, #66BB6A 100%);

    color: white;
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .right-section {
    /* Very light background for comfort */
    background-color: #FAFCFE;

    padding: 2.5rem;
    overflow-y: auto;
  }

  .register-btn {
    width: 100%;

    /* Softer, pleasant blue button */
    background: linear-gradient(135deg, #42A5F5 0%, #5C6BC0 100%);

    border: none;
    border-radius: 10px;
    font-size: 17px;
    font-weight: 600;
    padding: 12px;
    color: white;
    margin-top: 1rem;
    box-shadow: 0 4px 12px rgba(66, 165, 245, 0.25);

    transition: all 0.3s ease;
  }

  .register-btn:hover {
    /* Slightly darker but still pleasant hover */
    background: linear-gradient(135deg, #2196F3 0%, #5C6BC0 100%);
    box-shadow: 0 6px 16px rgba(66, 165, 245, 0.35);
    transform: translateY(-2px);
  }

  h4 {
    margin-top: 15px;
    font-weight: bold;

    /* Softer blue for headings */
    color: #42A5F5;
  }

  h2.text-danger {
    /* Pleasant medium blue */
    color: #42A5F5 !important;
  }

  .text-success {
    /* Softer teal/green for donor section */
    color: #26A69A !important;
  }

  .text-primary {
    /* Pleasant medium blue */
    color: #5C6BC0 !important;
  }

  /* Form control focus states */
  .form-control:focus,
  .form-select:focus {
    border-color: #42A5F5;
    box-shadow: 0 0 0 0.2rem rgba(66, 165, 245, 0.15);
  }

  /* Labels */
  .form-label {
    color: #546E7A;
    font-weight: 500;
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

                {/* Role Fixed as Donor */}
                <div className="col-12 mb-3">
                  <label className="form-label">Role</label>

                  <input
                    type="text"
                    className="form-control"
                    value="Donor"
                    disabled
                  />

                  {/* Hidden field to always send rid=2 */}
                  <input type="hidden" name="rid" value="2" />
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
                {Number(formData.rid) === 2 && (
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
                {Number(formData.rid) === 3 && (
                  <>
                    <h4 className="text-primary">
                      Hospital/BloodBank Details
                    </h4>

                    <div className="col-12 mb-3">
                      <label className="form-label">Name</label>
                      <input
                        className="form-control"
                        name="hb_name"
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email</label>
                      <input
                        className="form-control"
                        name="hb_email"
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="hb_password"
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