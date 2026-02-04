import React, { useEffect, useState, useMemo } from "react";
import { Droplet, Search } from "lucide-react";
import axios from "axios";

export default function DonationHistory({ donorId }) {
  const [donations, setDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Determine donorId safely
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const finalDonorId = donorId || storedUser?.did || storedUser?.donorId || storedUser?.id;

  // ✅ Fetch donation history
  useEffect(() => {
    if (!finalDonorId) return;

    setLoading(true);
    console.log("Fetching donation history for donorId:", finalDonorId);

    axios
      .get(`http://localhost:8080/api/donations/history/${finalDonorId}`)
      .then((res) => {
        console.log("API Response:", res.data);
        setDonations(res.data || []);
      })
      .catch((err) => console.error("Error fetching donation history:", err))
      .finally(() => setLoading(false));
  }, [finalDonorId]);

  // ✅ Filter donations by blood bank
  const filteredDonations = useMemo(
    () =>
      donations.filter((d) =>
        d.bloodBank?.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [donations, searchTerm]
  );

  // ✅ Status badge colors
  const getStatusColor = (status) => {
    if (!status) return "#4caf50"; // Completed by default
    switch (status.toLowerCase()) {
      case "pending":
        return "#ff9800";
      case "cancelled":
        return "#f44336";
      default:
        return "#4caf50";
    }
  };

  return (
    <div style={{ padding: "10px 0 0" }}>
      {/* TITLE ROW */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px", color: "#fff" }}>
        <h2 style={{ margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
          <Droplet size={20} /> Donation History
        </h2>
        <div style={{ background: "#fff", padding: "6px 10px", borderRadius: "8px", display: "flex", alignItems: "center", gap: 6 }}>
          <input
            placeholder="Search by Blood Bank..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: "none", outline: "none", fontSize: "14px" }}
          />
          <Search size={16} />
        </div>
      </div>

      {/* MAIN CARD */}
      <div style={{ background: "#f8f9fc", borderRadius: "18px", padding: "18px", boxShadow: "0 10px 24px rgba(0,0,0,0.15)" }}>
        {/* SUMMARY */}
        <div style={{ background: "#fff", borderRadius: "12px", padding: "12px 16px", marginBottom: "16px", display: "flex", gap: "20px", flexWrap: "wrap", fontSize: "14px", fontWeight: 600 }}>
          <span>Total Donations: <b style={{ color: "#d32f2f" }}>{donations.length}</b></span>
        </div>

        {/* TABLE */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#eef1f7", textAlign: "left" }}>
              {["Date", "Hospital/Blood Bank", "Blood Type", "Status"].map((h) => (
                <th key={h} style={{ padding: "12px", fontSize: "14px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" style={{ padding: 20, textAlign: "center" }}>Loading...</td>
              </tr>
            ) : filteredDonations.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ padding: 20, textAlign: "center" }}>No Donation History Found</td>
              </tr>
            ) : (
              filteredDonations.map((d, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "12px", fontSize: "14px" }}>
                    {new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td style={{ padding: "12px", fontSize: "14px" }}>{d.bloodBank}</td>
                  <td style={{ padding: "12px", fontSize: "14px" }}>{d.bloodType}</td>
                  <td style={{ padding: "12px", fontSize: "14px" }}>
                    <span style={{
                      background: getStatusColor(d.status),
                      color: "#fff",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "13px"
                    }}>
                      {d.status || "Completed"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}