import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../style/admin.css";

export default function InventoryManagement() {
  const [stock, setStock] = useState([]); // ✅ Always initialize as array
  const [loading, setLoading] = useState(true);

  // ===============================
  // ✅ Fetch Blood Stock from Backend
  // ===============================
  useEffect(() => {
    axios
      .get("http://localhost:5048/api/BloodStock")
      .then((res) => {
        console.log("Blood Stock Data:", res.data);
        setStock(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error Fetching Stock:", err);
        setLoading(false);
      });
  }, []);

  // ===============================
  // ✅ Total Units Calculation
  // ===============================
  const totalUnits = stock.reduce((sum, item) => sum + item.ml, 0);

  return (
    <div className="page-box">
      <h2>Inventory Management</h2>

      {/* ✅ Loading State */}
      {loading && <p>Loading Blood Stock...</p>}

      {/* ✅ Summary Cards */}
      {!loading && (
        <div className="cards-row">
          <div className="card-box">
            Total Units Available <b>{totalUnits} ml</b>
          </div>

          <div className="card-box">
            Total Stock Records <b>{stock.length}</b>
          </div>
        </div>
      )}

      {/* ✅ Stock Table */}
      {!loading && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Stock ID</th>
              <th>Hospital Name</th>
              <th>Blood Component</th>
              <th>Quantity (ml)</th>
              <th>Expiry Date</th>
            </tr>
          </thead>

          <tbody>
            {stock.length > 0 ? (
              stock.map((s) => (
                <tr key={s.bsid}>
                  <td>{s.bsid}</td>

                  {/* ✅ Hospital Name */}
                  <td>{s.hospitalName}</td>

                  {/* ✅ Blood Component Name */}
                  <td>{s.componentName}</td>

                  <td>{s.ml}</td>

                  {/* ✅ Date Formatting */}
                  <td>
                    {new Date(s.expiryDate).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No Blood Stock Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
