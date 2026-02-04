import React, { useEffect, useState } from "react";
import apiService from "../../services/apiService";
import "./Style.css";
import authService from "../../services/authService";

export default function BloodStock() {
  const [bloodStock, setBloodStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const user = authService.getCurrentUser();
    console.log("userid from localStorage:", user);

    const hbid = Number(user?.hbid);

    // ✅ Fix: Only return if HBID is NOT present
    if (!hbid) {
      setError("Hospital ID not found");
      setLoading(false);
      return;
    }

    // ✅ Call API correctly
    apiService
      .getStockDetails(hbid)
      .then((res) => {
        console.log("Stock API Response:", res.data);

        if (!Array.isArray(res.data)) {
          setError("Invalid response from server");
          return;
        }

        setBloodStock(res.data);
        setError("");
      })
      .catch((err) => {
        console.error("Stock Fetch Error:", err);
        setError("Failed to load blood stock");
        setBloodStock([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="hb-card">
      <h2 className="hb-title">Blood Stock</h2>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : error ? (
        <p style={{ textAlign: "center", color: "red" }}>{error}</p>
      ) : bloodStock.length === 0 ? (
        <p style={{ textAlign: "center" }}>No blood stock available</p>
      ) : (
        <table className="hb-table">
          <thead>
            <tr>
              <th>Blood Component</th>
              <th>Quantity (ml)</th>
              <th>Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {bloodStock.map((b, index) => (
              <tr key={index}>
                <td>{b.bcName}</td>
                <td>{b.ml}</td>
                <td>
                  {b.expiryDate
                    ? new Date(b.expiryDate).toLocaleDateString("en-GB")
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
