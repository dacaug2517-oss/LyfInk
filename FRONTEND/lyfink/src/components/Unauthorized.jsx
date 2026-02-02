import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
    const navigate = useNavigate();

    return (
        <>
            <style>{`
        .unauthorized-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #E3F2FD 0%, #F0F4F8 100%);
          padding: 20px;
        }

        .unauthorized-card {
          max-width: 500px;
          background-color: white;
          border-radius: 20px;
          padding: 3rem;
          text-align: center;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        }

        .error-code {
          font-size: 6rem;
          font-weight: bold;
          color: #EF5350;
          margin-bottom: 1rem;
        }

        .error-title {
          font-size: 2rem;
          font-weight: 600;
          color: #37474F;
          margin-bottom: 1rem;
        }

        .error-message {
          font-size: 1.1rem;
          color: #78909C;
          margin-bottom: 2rem;
        }

        .back-btn {
          background: linear-gradient(135deg, #42A5F5 0%, #5C6BC0 100%);
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          padding: 12px 30px;
          color: white;
          box-shadow: 0 4px 12px rgba(66, 165, 245, 0.25);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .back-btn:hover {
          background: linear-gradient(135deg, #2196F3 0%, #5C6BC0 100%);
          box-shadow: 0 6px 16px rgba(66, 165, 245, 0.35);
          transform: translateY(-2px);
        }
      `}</style>

            <div className="unauthorized-container">
                <div className="unauthorized-card">
                    <div className="error-code">403</div>
                    <h1 className="error-title">Access Denied</h1>
                    <p className="error-message">
                        You don't have permission to access this page.
                    </p>
                    <button
                        className="back-btn"
                        onClick={() => navigate('/login')}
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        </>
    );
}
