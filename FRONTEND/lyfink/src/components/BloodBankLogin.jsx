import React, { useState } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function BloodBankLogin() {

  const navigate = useNavigate();

  // ✅ State Variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ VALIDATION FUNCTIONS ADDED (Nothing Else Changed)
  const validateEmail = (email) => {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // ✅ Login Handler with JWT
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // ✅ VALIDATIONS ADDED HERE (Before API Call)

    // Email Validation
    if (!validateEmail(email)) {
      setError("Email must end with @gmail.com, @yahoo.com or @outlook.com");
      setLoading(false);
      return;
    }

    // Password Validation
    if (!validatePassword(password)) {
      setError(
        "Password must be 8 characters long and include 1 Capital letter, 1 Number and 1 Special character"
      );
      setLoading(false);
      return;
    }

    try {
      // ✅ Call JWT-based Login API
      const response = await authService.login(email, password);

      console.log("Login Response:", response);

      // ✅ Convert rid properly
      const rid = Number(response.rid);

      // ✅ Debug Check
      alert("Logged in Successfully! Role ID = " + rid);

      // ✅ Redirect Based on Role
      if (rid === 1) {
        navigate("/admin-dashboard");
      }
      else if (rid === 2) {
        navigate("/donor-dashboard");
      }
      else if (rid === 3) {
        navigate("/hospital-dashboard");
      }
      else {
        alert("Unauthorized Role Found!");
        navigate("/login");
      }

    } catch (error) {
      console.error("Login Error:", error);
      setError(typeof error === 'string' ? error : "Invalid Email or Password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Bootstrap CDN */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

      {/* Styling */}
      <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #E3F2FD 0%, #F0F4F8 100%);
          padding: 20px;
        }

        .login-card {
          max-width: 1100px;
          margin: 5rem;
          border-radius: 30px;
          overflow: hidden;
          background-color: white;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        }

        .left-section {
          background: linear-gradient(160deg, #42A5F5 0%, #5C6BC0 50%, #66BB6A 100%);
          color: white;
          padding: 2rem;
        }

        img {
          width: 300px;
          height: 200px;
        }

        .main-title {
          font-size: 3rem;
          font-weight: bold;
        }

        .subtitle {
          font-size: 1.25rem;
          margin-bottom: 3rem;
        }

        .right-section {
          background-color: #FAFCFE;
          padding: 3rem;
          display: flex;
          align-items: center;
        }

        .signin-title {
          font-weight: bold;
          color: #42A5F5;
        }

        .login-btn {
          width: 100%;
          background: linear-gradient(135deg, #42A5F5 0%, #5C6BC0 100%);
          border: none;
          border-radius: 10px;
          font-size: 18px;
          font-weight: 600;
          padding: 12px;
          color: white;
          box-shadow: 0 4px 12px rgba(66, 165, 245, 0.25);
          transition: all 0.3s ease;
        }

        .login-btn:hover {
          background: linear-gradient(135deg, #2196F3 0%, #5C6BC0 100%);
          box-shadow: 0 6px 16px rgba(66, 165, 245, 0.35);
          transform: translateY(-2px);
        }

        .register-link {
          color: #42A5F5;
          font-weight: 600;
          text-decoration: none;
        }

        .register-link:hover {
          color: #2196F3;
          text-decoration: underline;
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

      {/* Layout */}
      <div className="login-container">
        <div className="container">
          <div className="row g-0 login-card">

            {/* Left Section */}
            <div className="col-lg-7 left-section">
              <h1 className="main-title">Blood Bank System</h1>
              <p className="subtitle">Donate Blood. Save Lives.</p>

              <img
                src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg"
                alt="Blood donation illustration"
                className="img-fluid"
              />
            </div>

            {/* Right Section */}
            <div className="col-lg-5 right-section">
              <div className="w-100">

                <h2 className="signin-title mb-4">Sign In</h2>

                {/* Error Message */}
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleLogin}>

                  {/* Email */}
                  <div className="mb-4">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>

                  {/* Password */}
                  <div className="mb-4">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>

                  {/* Button */}
                  <button type="submit" className="login-btn mb-4" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                  </button>

                  {/* Register Link */}
                  <div className="text-center">
                    <span>New user? </span>
                    <a href="/register" className="register-link">
                      Register here
                    </a>
                  </div>

                </form>

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
