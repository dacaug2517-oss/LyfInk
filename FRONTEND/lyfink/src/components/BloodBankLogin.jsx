import React, { useState } from 'react';


export default function BloodBankLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login attempted with:', { email, password });
  };

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
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
          background: linear-gradient(135deg, #e63946 0%, #f77f8e 100%);
          color: white;
          padding: 1rem;
          position: relative;
        }

        img {
            width: 300px;
            height: 200px;
        }


        .left-content {
          position: relative;
          z-index: 2;
        }

        .main-title {
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .subtitle {
          font-size: 1.25rem;
          margin-bottom: 3rem;
        }

        .illustration-container {
          margin-top: 3rem;
        }

        .illustration {
          max-width: 500px;
          filter: drop-shadow(0 10px 30px rgba(0,0,0,0.2));
        }

        .decorative-wave {
          position: absolute;
          top: 0;
          right: -50px;
          width: 200px;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50% 0 0 50%;
          transform: scaleX(1.5);
        }

        .right-section {
          background-color: #fafafa;
          padding: 3rem;
          display: flex;
          align-items: center;
        }

        .signin-title {
          margin-bottom: 2rem;
          font-weight: bold;
          color: #e63946;
        }

        .title-underline {
          width: 60px;
          height: 3px;
          background-color: #e63946;
          margin-top: 10px;
        }

        .form-label {
          font-weight: 600;
          color: #6c757d;
          margin-bottom: 0.5rem;
        }

        .input-icon {
          color: #adb5bd;
        }

        .input-group-text {
          background-color: white;
          border-right: none;
        }

        .form-control {
          padding: 12px;
          border-color: #dee2e6;
          border-left: none;
          padding-left: 0;
        }

        .form-control:focus {
          border-color: #e63946;
          box-shadow: none;
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
          transition: all 0.3s;
        }

        .login-btn:hover {
          background-color: #d62839;
        }

        .register-text {
          color: #6c757d;
        }

        .register-link {
          color: #e63946;
          text-decoration: none;
          font-weight: 600;
        }

        .register-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 991px) {
          .main-title {
            font-size: 2rem;
          }
          
          .illustration {
            max-width: 100%;
          }
        }
      `}</style>

      <div className="login-container">
        <div className="container">
          <div className="row g-0 login-card">
            {/* Left Section */}
            <div className="col-lg-7 left-section">
              <div className="left-content">
                <h1 className="main-title">Blood Bank System</h1>
                <p className="subtitle">Donate Blood. Save Lives.</p>
                
                <div className="illustration-container">
                  <img 
                    src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg"
                    alt="Blood donation illustration"
                    className="img-fluid illustration"
                  />
                </div>
              </div>
              
              <div className="decorative-wave"></div>
            </div>

            {/* Right Section - Sign In Form */}
            <div className="col-lg-5 right-section">
              <div className="w-100">
                <h2 className="signin-title">
                  Sign In
                  <div className="title-underline"></div>
                </h2>

                <div>
                  <div className="mb-4">
                    <label className="form-label">Email</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <span className="input-icon">✉</span>
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Password</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <span className="input-icon">🔒</span>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <button onClick={handleLogin} className="login-btn mb-4">
                    Login
                  </button>

                  <div className="text-center">
                    <span className="register-text">New user? </span>
                    <a href="DonorRegister.jsx" className="register-link">
                      Register here
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}