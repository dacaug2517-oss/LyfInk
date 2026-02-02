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
  const user = authService.getCurrentUser();

  console.log(user, "asjdfkajdfn==>")

  // Handle Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Direct Insert
  const handleSubmit = async (e) => {
    e.preventDefault();

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
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="col-md-6 mb-3">
                <label>Email</label>
                <input
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div className="col-md-6 mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="hb_password"
                  value={formData.hb_password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone */}
              <div className="col-md-6 mb-3">
                <label>Phone</label>
                <input
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Reg No */}
              <div className="col-md-6 mb-3">
                <label>Registration No</label>
                <input
                  className="form-control"
                  name="regNo"
                  value={formData.regNo}
                  onChange={handleChange}
                  required
                />
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
                  className="form-select"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Hospital">Hospital</option>
                  <option value="BloodBank">BloodBank</option>
                </select>
              </div>

              {/* Submit */}
              <div className="col-12">
                <button type="submit" className="register-btn">
                  Insert into HB_Details Table
                </button>
              </div>

            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
