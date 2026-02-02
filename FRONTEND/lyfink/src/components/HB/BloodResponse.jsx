import React, { useEffect, useState } from "react";
import apiService from "../../services/apiService";
import "./Style.css";
import authService from "../../services/authService";

export default function BloodResponses() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const user = authService.getCurrentUser();
    console.log("userid from localStorage:", Number(user["userid"]));

    const userid = Number(user["userid"]) ? Number(user["userid"]) : Number(user["hbid"]);

    if (!userid || isNaN(userid)) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    apiService.getRequestsFromOtherHospitals(userid)
      .then((res) => {
        console.log("Blood Requests API:", res.data);

        // Ensure response is array
        if (Array.isArray(res.data)) {
          setRequests(res.data);
          setError("");
        } else {
          console.warn("API response is not an array:", res.data);
          setRequests([]);
          setError("No blood requests available");
        }
      })
      .catch((err) => {
        console.error("Error fetching blood requests:", err);
        setError("Failed to load blood requests");
        setRequests([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleRespond = (brid) => {
    const comment = prompt("Enter response comment");
    if (!comment) return;

    apiService.addResponse({
      brid,
      comment,
      status: "APPROVED",
    })
      .then(() => {
        alert("Response saved successfully");
        setRequests((prev) => prev.filter((r) => r.brid !== brid));
      })
      .catch((err) => {
        console.error("Error saving response:", err);
        alert("Failed to save response");
      });
  };

  return (
    <div className="hb-card">
      <h2 className="hb-title">Blood Requests From Other Hospitals</h2>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : error ? (
        <p style={{ textAlign: "center", color: "red" }}>{error}</p>
      ) : requests.length === 0 ? (
        <p style={{ textAlign: "center" }}>No blood requests available</p>
      ) : (
        <table className="hb-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Blood Component</th>
              <th>Quantity</th>
              <th>Required By</th>
              <th>Purpose</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r, index) => {
              // safe access
              const brid = r.brid || "-";
              const bc_name = r.bcid?.bc_name || "-";
              const quantity = r.quantity || "-";
              const requiredby = r.requiredby || "-";
              const purpose = r.purpose || "-";

              return (
                <tr key={index}>
                  <td>{brid}</td>
                  <td>{bc_name}</td>
                  <td>{quantity}</td>
                  <td>{requiredby}</td>
                  <td>{purpose}</td>
                  <td>
                    <button
                      className="hb-view"
                      onClick={() => handleRespond(brid)}
                    >
                      Respond
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
