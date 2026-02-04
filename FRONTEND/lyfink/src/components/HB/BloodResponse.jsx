import React, { useEffect, useState } from "react";
import apiService from "../../services/apiService";
import "./Style.css";
import authService from "../../services/authService";

export default function BloodResponses() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Modal States
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBrid, setSelectedBrid] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const user = authService.getCurrentUser();

    const userid = Number(user["userid"])
      ? Number(user["userid"])
      : Number(user["hbid"]);

    if (!userid || isNaN(userid)) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    apiService
      .getFullBloodRequestDetails(userid)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setResponses(res.data);
          setError("");
        } else {
          setResponses([]);
          setError("No responses available");
        }
      })
      .catch((err) => {
        console.error("Error fetching responses:", err);
        setError("Failed to load blood responses");
      })
      .finally(() => setLoading(false));
  }, []);

  // ✅ Open Popup on Accept Click
  const handleAcceptClick = (brid) => {
    setSelectedBrid(brid);
    setComment("");
    setShowPopup(true);
  };

  // ✅ Submit Accept Response API
  const handleSubmitAccept = () => {
    if (!comment.trim()) {
      alert("Please enter a comment!");
      return;
    }

    const requestBody = {
      brid: selectedBrid,
      comment: comment,
      status: "accepted",
    };

    console.log("Sending Response:", requestBody);

    apiService
      .sendBloodResponse(requestBody)
      .then((res) => {
        alert("Request Accepted Successfully ✅");

        // ✅ Remove accepted request from UI
        setResponses((prev) =>
          prev.filter((r) => r.brid !== selectedBrid)
        );

        // ✅ Close Popup
        setShowPopup(false);
      })
      .catch((err) => {
        console.error("Accept API Error:", err);
        alert("Failed to accept request ❌");
      });
  };

  return (
    <div className="hb-card">
      <h2 className="hb-title">Blood Request Full Details</h2>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : error ? (
        <p style={{ textAlign: "center", color: "red" }}>{error}</p>
      ) : responses.length === 0 ? (
        <p style={{ textAlign: "center" }}>No blood request details found</p>
      ) : (
        <table className="hb-table">
          <thead>
            <tr>
              <th>Br-Id</th>
              <th>Blood Bank</th>
              <th>Email</th>
              <th>Contact</th>
              <th>City</th>
              <th>State</th>
              <th>Blood Group</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {responses.map((r) => (
              <tr key={r.brid}>
                <td>{r.brid}</td>
                <td>{r.hbName}</td>
                <td>{r.hbEmail}</td>
                <td>{r.contactNo}</td>
                <td>{r.cityName}</td>
                <td>{r.stateName}</td>
                <td>{r.bcName}</td>
                <td>{r.quantity}</td>

                <td>
                  <button
                    type="button"
                    style={{ cursor: "pointer", zIndex: 999 }}
                    className="hb-view"
                    onClick={() => handleAcceptClick(r.brid)}
                  >
                    Accept
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ✅ Popup Modal */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Accept Request</h3>

            <p>
              Request ID: <b>{selectedBrid}</b>
            </p>

            <textarea
              placeholder="Enter comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              style={{ width: "100%" }}
            />

            <div style={{ marginTop: "10px" }}>
              <button className="hb-view" onClick={handleSubmitAccept}>
                Submit
              </button>

              <button
                className="hb-cancel"
                onClick={() => setShowPopup(false)}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
