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
    dob: "",
    gender: "",
    medical_history: "",
    bcid: "",
    hb_name: "",
    hb_email: "",
    hb_password: "",
    hb_phno: "",
    reg_no: "",
    gst_no: "",
    type: ""
  });

  const [errors, setErrors] = useState({});
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [components, setComponents] = useState([]);

  // Load States
  useEffect(() => {
    axios.get("http://localhost:8080/api/states/all")
      .then((res) => setStates(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Load Cities when State Changes
  useEffect(() => {
    if (formData.stateid !== "") {
      axios.get(`http://localhost:8080/api/cities/bystate/${formData.stateid}`)
        .then((res) => setCities(res.data))
        .catch((err) => console.log(err));
    }
  }, [formData.stateid]);

  // Load Blood Components
  useEffect(() => {
    axios.get("http://localhost:8080/api/bloodcomponents/category/1")
      .then((res) => setComponents(res.data))
      .catch((err) => console.log(err));
  }, []);

  const securityQuestions = [
    "What is your mother's maiden name?",
    "What was the name of your first pet?",
    "What city were you born in?",
    "What is your favorite color?"
  ];

  // Validation Functions
  const validateFirstName = (value) => {
    if (!value.trim()) {
      return "First name is required";
    }
    if (value.trim().length < 3) {
      return "First name must be at least 3 characters";
    }
    return "";
  };

  const validateLastName = (value) => {
    if (!value.trim()) {
      return "Last name is required";
    }
    if (value.trim().length < 1) {
      return "Last name must be at least 1 character";
    }
    return "";
  };

  const validateEmail = (value) => {
    if (!value.trim()) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Invalid email format";
    }
    if (!value.endsWith("@gmail.com") && !value.endsWith("@yahoo.com") && !value.endsWith("@outlook.com")) {
      return "Email must be @gmail.com, @yahoo.com, or @outlook.com";
    }
    return "";
  };

  const validateMobile = (value) => {
    if (!value.trim()) {
      return "Mobile number is required";
    }
    const digitsOnly = value.replace(/\D/g, '');
    if (digitsOnly.length !== 10) {
      return "Mobile number must be exactly 10 digits";
    }
    return "";
  };

  const validatePassword = (value) => {
    if (!value) {
      return "Password is required";
    }
    if (value.length < 8) {
      return "Password must be at least 8 characters";
    }
    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    
    if (!hasUpperCase) {
      return "Password must contain at least 1 capital letter";
    }
    if (!hasNumber) {
      return "Password must contain at least 1 number";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least 1 special character";
    }
    return "";
  };

  const validateConfirmPassword = (value) => {
    if (!value) {
      return "Please confirm your password";
    }
    if (value !== formData.password) {
      return "Passwords do not match";
    }
    return "";
  };

  const validateAddress = (value) => {
    if (!value.trim()) {
      return "Address is required";
    }
    return "";
  };

  const validateDOB = (value) => {
    if (!value) {
      return "Date of birth is required";
    }
    
    const today = new Date();
    const birthDate = new Date(value);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    if (age < 18) {
      return "You must be at least 18 years old. Not eligible to register.";
    }
    return "";
  };

  const validateField = (name, value) => {
    let error = "";
    
    switch (name) {
      case "firstname":
        error = validateFirstName(value);
        break;
      case "lastname":
        error = validateLastName(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "mobno":
        error = validateMobile(value);
        break;
      case "password":
        error = validatePassword(value);
        break;
      case "confirmPassword":
        error = validateConfirmPassword(value);
        break;
      case "address":
        error = validateAddress(value);
        break;
      case "dob":
        error = validateDOB(value);
        break;
      case "stateid":
        error = !value ? "State is required" : "";
        break;
      case "cityid":
        error = !value ? "City is required" : "";
        break;
      case "bcid":
        error = !value && Number(formData.rid) === 2 ? "Blood component is required" : "";
        break;
      case "gender":
        error = !value && Number(formData.rid) === 2 ? "Gender is required" : "";
        break;
      case "security_question":
        error = !value ? "Security question is required" : "";
        break;
      case "security_answer":
        error = !value.trim() ? "Security answer is required" : "";
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "stateid") {
      setFormData({
        ...formData,
        stateid: value,
        cityid: ""
      });
      setCities([]);
      setErrors({
        ...errors,
        stateid: validateField("stateid", value),
        cityid: ""
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
      
      // Validate field on change
      const error = validateField(name, value);
      setErrors({
        ...errors,
        [name]: error
      });
      
      // If password changed, revalidate confirmPassword
      if (name === "password" && formData.confirmPassword) {
        setErrors({
          ...errors,
          [name]: error,
          confirmPassword: validateConfirmPassword(formData.confirmPassword)
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    
    newErrors.firstname = validateFirstName(formData.firstname);
    newErrors.lastname = validateLastName(formData.lastname);
    newErrors.email = validateEmail(formData.email);
    newErrors.mobno = validateMobile(formData.mobno);
    newErrors.password = validatePassword(formData.password);
    newErrors.confirmPassword = validateConfirmPassword(formData.confirmPassword);
    newErrors.address = validateAddress(formData.address);
    newErrors.stateid = !formData.stateid ? "State is required" : "";
    newErrors.cityid = !formData.cityid ? "City is required" : "";
    newErrors.security_question = !formData.security_question ? "Security question is required" : "";
    newErrors.security_answer = !formData.security_answer.trim() ? "Security answer is required" : "";

    // Donor-specific validations
    if (Number(formData.rid) === 2) {
      newErrors.bcid = !formData.bcid ? "Blood component is required" : "";
      newErrors.dob = validateDOB(formData.dob);
      newErrors.gender = !formData.gender ? "Gender is required" : "";
    }

    // Hospital/BloodBank validations
    if (Number(formData.rid) === 3) {
      newErrors.hb_name = !formData.hb_name.trim() ? "Hospital/Blood Bank name is required" : "";
      newErrors.hb_email = !formData.hb_email.trim() ? "Email is required" : "";
      newErrors.hb_password = !formData.hb_password.trim() ? "Password is required" : "";
      newErrors.hb_phno = !formData.hb_phno.trim() ? "Phone is required" : "";
      newErrors.reg_no = !formData.reg_no.trim() ? "Registration number is required" : "";
      newErrors.type = !formData.type ? "Type is required" : "";
    }

    // Filter out empty errors
    const filteredErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([_, value]) => value !== "")
    );

    setErrors(filteredErrors);

    // If there are errors, don't submit
    if (Object.keys(filteredErrors).length > 0) {
      alert("Please fix all errors before submitting");
      return;
    }

    // Payload for Backend DTO
    let userPayload = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      password: formData.password,
      mobno: Number(formData.mobno.replace(/\D/g, '')),
      mobNo: Number(formData.mobno.replace(/\D/g, '')),
      address: formData.address,
      rid: Number(formData.rid),
      stateid: Number(formData.stateid),
      cityid: Number(formData.cityid),
      security_question: formData.security_question,
      security_answer: formData.security_answer
    };

    // Donor Details
    if (Number(formData.rid) === 2) {
      userPayload.donorDetails = {
        dob: formData.dob,
        gender: formData.gender,
        medical_history: formData.medical_history,
        bcid: Number(formData.bcid)
      };
    }

    // Hospital/BloodBank Details
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
      navigate("/login");
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

      <style>{`
  .register-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #E3F2FD 0%, #F0F4F8 100%);
    padding: 20px;
  }

  .register-card {
    max-width: 1200px;
    width: 100%;
    background-color: #FFFFFF;
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    display: flex;
    height: 90vh;
  }

  .left-section {
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
    background-color: #FAFCFE;
    padding: 2.5rem;
    overflow-y: auto;
  }

  .register-btn {
    width: 100%;
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
    background: linear-gradient(135deg, #2196F3 0%, #5C6BC0 100%);
    box-shadow: 0 6px 16px rgba(66, 165, 245, 0.35);
    transform: translateY(-2px);
  }

  h4 {
    margin-top: 15px;
    font-weight: bold;
    color: #42A5F5;
  }

  h2.text-danger {
    color: #42A5F5 !important;
  }

  .text-success {
    color: #26A69A !important;
  }

  .text-primary {
    color: #5C6BC0 !important;
  }

  .form-control:focus,
  .form-select:focus {
    border-color: #42A5F5;
    box-shadow: 0 0 0 0.2rem rgba(66, 165, 245, 0.15);
  }

  .form-label {
    color: #546E7A;
    font-weight: 500;
  }

  .error-message {
    color: #dc3545;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: block;
  }

  .form-control.is-invalid,
  .form-select.is-invalid {
    border-color: #dc3545;
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
            <h2 className="text-center mb-4 text-danger">Create Account</h2>

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
                  <input type="hidden" name="rid" value="2" />
                </div>

                {/* First Name */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">First Name *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                  />
                  {errors.firstname && <span className="error-message">{errors.firstname}</span>}
                </div>

                {/* Last Name */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Last Name *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                  />
                  {errors.lastname && <span className="error-message">{errors.lastname}</span>}
                </div>

                {/* Email */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                {/* Mobile */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Mobile *</label>
                  <input
                    type="tel"
                    className={`form-control ${errors.mobno ? 'is-invalid' : ''}`}
                    name="mobno"
                    value={formData.mobno}
                    onChange={handleChange}
                    maxLength="10"
                    required
                  />
                  {errors.mobno && <span className="error-message">{errors.mobno}</span>}
                </div>

                {/* Password */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Password *</label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                {/* Confirm Password */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Confirm Password *</label>
                  <input
                    type="password"
                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>

                {/* Address */}
                <div className="col-12 mb-3">
                  <label className="form-label">Address *</label>
                  <textarea
                    className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                    name="address"
                    rows="2"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>

                {/* State */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">State *</label>
                  <select
                    className={`form-select ${errors.stateid ? 'is-invalid' : ''}`}
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
                  {errors.stateid && <span className="error-message">{errors.stateid}</span>}
                </div>

                {/* City */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">City *</label>
                  <select
                    className={`form-select ${errors.cityid ? 'is-invalid' : ''}`}
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
                  {errors.cityid && <span className="error-message">{errors.cityid}</span>}
                </div>

                {/* Donor Fields */}
                {Number(formData.rid) === 2 && (
                  <>
                    <h4 className="text-success">Donor Details</h4>

                    {/* Blood Component */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Blood Component *</label>
                      <select
                        className={`form-select ${errors.bcid ? 'is-invalid' : ''}`}
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
                      {errors.bcid && <span className="error-message">{errors.bcid}</span>}
                    </div>

                    {/* Date of Birth */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Date of Birth *</label>
                      <input
                        type="date"
                        className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                      />
                      {errors.dob && <span className="error-message">{errors.dob}</span>}
                    </div>

                    {/* Gender */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Gender *</label>
                      <select
                        className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                      {errors.gender && <span className="error-message">{errors.gender}</span>}
                    </div>

                    {/* Medical History - Optional */}
                    <div className="col-12 mb-3">
                      <label className="form-label">Medical History (Optional)</label>
                      <textarea
                        className="form-control"
                        name="medical_history"
                        rows="2"
                        value={formData.medical_history}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}

                {/* Hospital/BloodBank Fields */}
                {Number(formData.rid) === 3 && (
                  <>
                    <h4 className="text-primary">Hospital/BloodBank Details</h4>

                    <div className="col-12 mb-3">
                      <label className="form-label">Name *</label>
                      <input
                        className={`form-control ${errors.hb_name ? 'is-invalid' : ''}`}
                        name="hb_name"
                        value={formData.hb_name}
                        onChange={handleChange}
                        required
                      />
                      {errors.hb_name && <span className="error-message">{errors.hb_name}</span>}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email *</label>
                      <input
                        className={`form-control ${errors.hb_email ? 'is-invalid' : ''}`}
                        name="hb_email"
                        value={formData.hb_email}
                        onChange={handleChange}
                        required
                      />
                      {errors.hb_email && <span className="error-message">{errors.hb_email}</span>}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Password *</label>
                      <input
                        type="password"
                        className={`form-control ${errors.hb_password ? 'is-invalid' : ''}`}
                        name="hb_password"
                        value={formData.hb_password}
                        onChange={handleChange}
                        required
                      />
                      {errors.hb_password && <span className="error-message">{errors.hb_password}</span>}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Phone *</label>
                      <input
                        className={`form-control ${errors.hb_phno ? 'is-invalid' : ''}`}
                        name="hb_phno"
                        value={formData.hb_phno}
                        onChange={handleChange}
                        required
                      />
                      {errors.hb_phno && <span className="error-message">{errors.hb_phno}</span>}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Registration No *</label>
                      <input
                        className={`form-control ${errors.reg_no ? 'is-invalid' : ''}`}
                        name="reg_no"
                        value={formData.reg_no}
                        onChange={handleChange}
                        required
                      />
                      {errors.reg_no && <span className="error-message">{errors.reg_no}</span>}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">GST No</label>
                      <input
                        className="form-control"
                        name="gst_no"
                        value={formData.gst_no}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-12 mb-3">
                      <label className="form-label">Type *</label>
                      <select
                        className={`form-select ${errors.type ? 'is-invalid' : ''}`}
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Type</option>
                        <option value="Hospital">Hospital</option>
                        <option value="BloodBank">Blood Bank</option>
                      </select>
                      {errors.type && <span className="error-message">{errors.type}</span>}
                    </div>
                  </>
                )}

                {/* Security Question */}
                <div className="col-12 mb-3">
                  <label className="form-label">Security Question *</label>
                  <select
                    className={`form-select ${errors.security_question ? 'is-invalid' : ''}`}
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
                  {errors.security_question && <span className="error-message">{errors.security_question}</span>}
                </div>

                {/* Security Answer */}
                <div className="col-12 mb-3">
                  <label className="form-label">Security Answer *</label>
                  <input
                    className={`form-control ${errors.security_answer ? 'is-invalid' : ''}`}
                    name="security_answer"
                    value={formData.security_answer}
                    onChange={handleChange}
                    required
                  />
                  {errors.security_answer && <span className="error-message">{errors.security_answer}</span>}
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