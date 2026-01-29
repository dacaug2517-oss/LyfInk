import React, { useState } from "react";
import { loginUser } from "../services/UserLogin";
import { useNavigate } from "react-router-dom";

export default function BloodBankLogin() {

  const navigate = useNavigate();

  // ✅ State Variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      // ✅ Call Backend Login API
      const response = await loginUser(loginData);

      console.log("Login Response:", response.data);

      // ✅ Store Session
      localStorage.setItem("user", JSON.stringify(response.data));

      // ✅ Convert rid properly
      const rid = Number(response.data.rid);

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

      alert("Invalid Email or Password!");
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
          background: linear-gradient( #e60000);
          padding: 20px;
        }

        .login-card {
          max-width: 1100px;
          margin: 5rem;
          border-radius: 30px;
          overflow: hidden;
          background-color: white;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }

        .left-section {
          background: linear-gradient(to right,  #e60000, #8b0000);
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
          background-color: #fafafa;
          padding: 3rem;
          display: flex;
          align-items: center;
        }

        .signin-title {
          font-weight: bold;
          color: #e63946;
        }

        .login-btn {
          width: 100%;
          background-color: #e63946;
          border: none;
          border-radius: 8px;
          font-size: 18px;
          font-weight: 600;
          padding: 12px;
          color: white;
        }

        .login-btn:hover {
          background-color: #d62839;
        }

        .register-link {
          color: #e63946;
          font-weight: 600;
          text-decoration: none;
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
                    />
                  </div>

                  {/* Button */}
                  <button type="submit" className="login-btn mb-4">
                    Login
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
