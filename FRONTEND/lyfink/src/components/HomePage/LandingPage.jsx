import React from "react";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="home-container">

      {/* ===== NAVBAR ===== */}
      <nav className="navbar">
        <div
          className="logo"
          style={{ cursor: "pointer" }}
          onClick={() => window.location.href = "/"}
        >
          LyfInk
        </div>

        <ul className="nav-links">
          <li onClick={() => window.location.href = "/"}>Home</li>

          <li>About</li>
          <li>Working</li>

          {/* ✅ Login Button Added */}
          <li
            style={{ cursor: "pointer" }}
            onClick={() => window.location.href = "/login"}
          >
            Login
          </li>
        </ul>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="hero">
        <h1>Blood Bank Management System</h1>
        <p>
          Connecting <b>donors, hospitals, and blood banks</b> to save lives
          efficiently and transparently.
        </p>

        <div className="hero-buttons">
          
          {/* ✅ Register Button Already Working */}
          <button
            className="btn-primary"
            type="button"
            onClick={() => window.location.href = "/register"}
          >
            Register Here
          </button>

          {/* ✅ Login Button Added */}
          <button
            className="btn-primary"
            type="button"
            style={{ marginLeft: "15px" }}
            onClick={() => window.location.href = "/login"}
          >
            Login Here
          </button>

        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <p className="how-desc">
          Simple steps to connect donors, hospitals, and blood banks
        </p>

        <div className="how-steps">
          <div className="how-card">
            <div className="step-circle">1</div>
            <h3>Register</h3>
            <p>Users register by providing basic information.</p>
          </div>

          <div className="how-card">
            <div className="step-circle">2</div>
            <h3>Check Availability</h3>
            <p>View blood stock by blood group and quantity.</p>
          </div>

          <div className="how-card">
            <div className="step-circle">3</div>
            <h3>Request Blood</h3>
            <p>Raise blood requests during emergencies.</p>
          </div>

          <div className="how-card">
            <div className="step-circle">4</div>
            <h3>Save Lives</h3>
            <p>Blood is issued or donated in time.</p>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="features">
        <h2>Our Services</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>🩸 Blood Availability</h3>
            <p>Real-time blood stock updates.</p>
          </div>

          <div className="feature-card">
            <h3>📋 Blood Requests</h3>
            <p>Easy and quick blood request process.</p>
          </div>

          <div className="feature-card">
            <h3>👤 Donor Management</h3>
            <p>Maintain donor records efficiently.</p>
          </div>

          <div className="feature-card">
            <h3>⚡ Fast & Secure</h3>
            <p>Secure and rapid response system.</p>
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="about">
        <div className="about-content">
          <div className="about-text">
            <h2>About LyfInk</h2>
            <p>
              <b>LyfInk</b> is a smart Blood Bank Management System connecting
              donors, hospitals, and blood banks on a single platform.
            </p>
            <p>
              It ensures real-time availability, quick requests, and secure data
              handling to save lives.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <p>© LyfInk</p>
        <p>Saving Lives, One Drop at a Time ❤️</p>
      </footer>
    </div>
  );
}
