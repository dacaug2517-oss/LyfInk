import React, { useState } from "react";
import "../../style/admin.css";
import authService from "../../services/authService";

export default function RegisterHospital() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    hb_password: "",
    phone: "",
    regNo: "",
    gstNo: "",
    type: "",
  });

  const [errors, setErrors] = useState({});

  const user = authService.getCurrentUser();

  console.log(user, "asjdfkajdfn==>")

  const validateField = (name, value) => {
    let error = "";

    if (name === "name") {
      if (value.trim().length < 3) {
        error = "Hospital Name must be at least 3 characters";
      }
    }

    if (name === "email") {
      if (!/^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/.test(value)) {
        error = "Email must be Gmail, Yahoo or Outlook";
      }
    }

    if (name === "hb_password") {
      if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(value)) {
        error =
          "Password must be 8+ chars, 1 capital, 1 number, 1 special character";
      }
    }

    if (name === "phone") {
      if (!/^[0-9]{10}$/.test(value)) {
        error = "Phone must be exactly 10 digits";
      }
    }

    if (name === "regNo") {
      if (value.trim().length < 3) {
        error = "Registration No must be valid";
      }
    }

    if (name === "type") {
      if (value === "") {
        error = "Please select Hospital or BloodBank";
      }
    }

    return error;
  };

  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  // Submit Direct Insert
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

    // Construct payload strictly according to new API Docs
    // URL: /users/register-hospital (Auth Service - Authenticated)
    const payload = {
      hb_name: formData.name,
      hb_email: formData.email,
      hb_password: formData.hb_password,
      hb_phno: formData.phone,
      reg_no: formData.regNo,
      gst_no: formData.gstNo,
      type: formData.type,
    };

    console.log("Hospital Registration Payload:", payload);

    try {
      // Use authService.registerHospital (Authenticated)
      const response = await authService.registerHospital(payload);

      console.log("Registration Success:", response);
      alert(`✅ ${formData.type} Registered Successfully!`);

      setFormData({
        name: "",
        email: "",
        hb_password: "",
        phone: "",
        regNo: "",
        gstNo: "",
        type: "",
      });

      setErrors({});
    } catch (error) {
      console.log("Registration Error:", error);
      alert("❌ Registration Failed: " + (typeof error === 'string' ? error : JSON.stringify(error)));
    }
  };

  return (
    <div className="admin-wrapper">
      <header className="admin-topbar">
        <h1>+ Add Hospital / BloodBank</h1>
      </header>

      <div className="admin-main">
        <section className="admin-content">
          <div className="page-box">
            <h2>HB Registration (Manual UID)</h2>

            <form onSubmit={handleSubmit} className="row">

              {/* Name */}
              <div className="col-md-6 mb-3">
                <label>Hospital Name</label>
                <input
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && (
                  <small className="text-danger">{errors.name}</small>
                )}
              </div>

              {/* Email */}
              <div className="col-md-6 mb-3">
                <label>Email</label>
                <input
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && (
                  <small className="text-danger">{errors.email}</small>
                )}
              </div>

              {/* Password */}
              <div className="col-md-6 mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.hb_password ? "is-invalid" : ""}`}
                  name="hb_password"
                  value={formData.hb_password}
                  onChange={handleChange}
                  required
                />
                {errors.hb_password && (
                  <small className="text-danger">{errors.hb_password}</small>
                )}
              </div>

              {/* Phone */}
              <div className="col-md-6 mb-3">
                <label>Phone</label>
                <input
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  maxLength="10"
                />
                {errors.phone && (
                  <small className="text-danger">{errors.phone}</small>
                )}
              </div>

              {/* Reg No */}
              <div className="col-md-6 mb-3">
                <label>Registration No</label>
                <input
                  className={`form-control ${errors.regNo ? "is-invalid" : ""}`}
                  name="regNo"
                  value={formData.regNo}
                  onChange={handleChange}
                  required
                />
                {errors.regNo && (
                  <small className="text-danger">{errors.regNo}</small>
                )}
              </div>

              {/* GST */}
              <div className="col-md-6 mb-3">
                <label>GST No</label>
                <input
                  className="form-control"
                  name="gstNo"
                  value={formData.gstNo}
                  onChange={handleChange}
                />
              </div>

              {/* Type */}
              <div className="col-md-6 mb-3">
                <label>Type</label>
                <select
                  className={`form-select ${errors.type ? "is-invalid" : ""}`}
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Hospital">Hospital</option>
                  <option value="BloodBank">BloodBank</option>
                </select>
                {errors.type && (
                  <small className="text-danger">{errors.type}</small>
                )}
              </div>

              {/* Submit */}
              <div className="col-12">
                <button type="submit" className="register-btn">
                  SUBMIT
                </button>
              </div>

            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
