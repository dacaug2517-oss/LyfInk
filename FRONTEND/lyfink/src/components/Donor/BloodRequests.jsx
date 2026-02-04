import React, { useState, useEffect } from "react";
import axios from "axios";
import { Droplet, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const BloodRequests = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bcid = location.state?.bcid;

  // ✅ Added so old lines using bloodGroup will not break
  const bloodGroup = bcid;

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Modal States
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [comment, setComment] = useState("");

  // ✅ Fetch Blood Requests on Load
  useEffect(() => {
    if (bcid) {
      fetchRequests();
    }
  }, [bcid]);

  // ✅ Fetch Blood Requests (FIXED)
  const fetchRequests = () => {
    setLoading(true);

    axios
      .get(`http://localhost:8083/api/request/blood/hospital/${bcid}`)
      .then((res) => {
        setRequests(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  };

  // ✅ Open Modal When Accept Clicked
  const handleAccept = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  // ✅ Submit Response to Backend (DTO Format)
  const submitResponse = () => {
    if (!comment.trim()) {
      alert("Please enter a comment before submitting!");
      return;
    }

    console.log("Submitting Response for Request ID:", selectedRequest.brid);

    axios
      .post("http://localhost:8083/api/response/data", {
        brid: selectedRequest.brid,
        comment: comment,
        status: "ACCEPTED",
      })
      .then(() => {
        alert("Response Saved Successfully ✅");

        // Reset Modal
        setShowModal(false);
        setComment("");
        setSelectedRequest(null);

        // Refresh requests
        fetchRequests();
      })
      .catch((err) => {
        console.error("Backend Error:", err.response?.data || err.message);
        alert("Error saving response ❌");
      });
  };

  // ✅ Back to Blood Group Selection
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <button onClick={handleBack} style={styles.backButton}>
          <ArrowLeft size={20} />
          <span>Back to Blood Groups</span>
        </button>

        <h2 style={styles.title}>
          <Droplet size={24} color="#c1121f" />
          Blood Requests for {bloodGroup}
        </h2>
      </div>

      {/* Table Section */}
      {loading ? (
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading blood requests...</p>
        </div>
      ) : requests.length === 0 ? (
        <div style={styles.noDataContainer}>
          <Droplet size={60} color="#ccc" />
          <p style={styles.noDataText}>
            No blood requests found for {bloodGroup}
          </p>
          <p style={styles.noDataSubtext}>
            Try selecting a different blood group
          </p>
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.th}>Blood Group</th>
                <th style={styles.th}>Required Units</th>
                <th style={styles.th}>Hospital</th>
                <th style={styles.th}>Location</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((req, index) => (
                <tr
                  key={req.brid}
                  style={{
                    ...styles.tableRow,
                    backgroundColor: index % 2 === 0 ? "#fff" : "#f8f9fa",
                  }}
                >
                  <td style={styles.td}>
                    <div style={styles.bloodGroupCell}>
                      <span style={styles.bloodDroplet}>🩸</span>
                      <span style={styles.bloodGroupText}>
                        {req.bloodGroup}
                      </span>
                    </div>
                  </td>

                  <td style={styles.td}>
                    <span style={styles.unitsText}>{req.quantity} Units</span>
                  </td>

                  <td style={styles.td}>
                    <span style={styles.hospitalText}>
                      {req.hospitalName || "N/A"} <br />
                      📧 {req.hospitalEmail || "N/A"} <br />
                      📞 {req.hospitalPhone || "N/A"}
                    </span>
                  </td>

                  <td style={styles.td}>
                    <span style={styles.locationText}>
                      {req.city || "N/A"}
                    </span>
                  </td>

                  <td style={styles.td}>
                    <button
                      onClick={() => handleAccept(req)}
                      style={styles.acceptButton}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "scale(1.05)";
                        e.target.style.boxShadow =
                          "0 4px 12px rgba(46, 125, 50, 0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1)";
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      Accept Request
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Comment Modal */}
      {showModal && (
        <>
          <div
            style={styles.modalOverlay}
            onClick={() => setShowModal(false)}
          ></div>

          <div style={styles.modalBox}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Accept Donation Request</h3>

              <button
                style={styles.closeButton}
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            <div style={styles.requestDetails}>
              <p>
                <strong>Blood Group:</strong> {selectedRequest?.bloodGroup}
              </p>
              <p>
                <strong>Required Units:</strong> {selectedRequest?.quantity}
              </p>
              <p>
                <strong>Hospital:</strong>{" "}
                {selectedRequest?.hospitalName || "N/A"}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {selectedRequest?.hospitalEmail || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                {selectedRequest?.hospitalPhone || "N/A"}
              </p>
            </div>

            <label style={styles.label}>Add Your Comment:</label>

            <textarea
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter your comment here..."
              style={styles.textarea}
            />

            <div style={styles.modalFooter}>
              <button
                style={styles.btnCancel}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button style={styles.btnSubmit} onClick={submitResponse}>
                Submit Response
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },

  header: {
    marginBottom: "25px",
  },

  backButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "linear-gradient(135deg, #42A5F5 0%, #5C6BC0 100%)",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "500",
    marginBottom: "15px",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 8px rgba(66, 165, 245, 0.3)",
  },

  title: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "26px",
    fontWeight: "bold",
    color: "#c1121f",
    margin: 0,
  },

  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
  },

  spinner: {
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #c1121f",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    animation: "spin 1s linear infinite",
  },

  loadingText: {
    marginTop: "20px",
    color: "#666",
    fontSize: "16px",
  },

  noDataContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
    textAlign: "center",
  },

  noDataText: {
    marginTop: "20px",
    fontSize: "18px",
    color: "#666",
    fontWeight: "500",
  },

  noDataSubtext: {
    fontSize: "14px",
    color: "#999",
    marginTop: "5px",
  },

  tableContainer: {
    background: "#fff",
    borderRadius: "15px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    overflow: "hidden",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  tableHeaderRow: {
    background: "linear-gradient(135deg, #c1121f 0%, #a00f1a 100%)",
    color: "#fff",
  },

  th: {
    padding: "16px 20px",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "15px",
    letterSpacing: "0.5px",
  },

  tableRow: {
    transition: "all 0.2s ease",
    cursor: "pointer",
  },

  td: {
    padding: "16px 20px",
    borderBottom: "1px solid #f0f0f0",
  },

  bloodGroupCell: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  bloodDroplet: {
    fontSize: "20px",
  },

  bloodGroupText: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#c1121f",
  },

  unitsText: {
    fontSize: "15px",
    color: "#333",
    fontWeight: "500",
  },

  hospitalText: {
    fontSize: "15px",
    color: "#555",
  },

  locationText: {
    fontSize: "15px",
    color: "#666",
  },

  acceptButton: {
    background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    backdropFilter: "blur(4px)",
  },

  modalBox: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    width: "90%",
    maxWidth: "500px",
    zIndex: 1000,
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  modalTitle: {
    margin: 0,
    color: "#c1121f",
    fontSize: "22px",
    fontWeight: "bold",
  },

  closeButton: {
    background: "transparent",
    border: "none",
    fontSize: "28px",
    cursor: "pointer",
    color: "#999",
    padding: "0",
    width: "35px",
    height: "35px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    transition: "all 0.2s",
  },

  requestDetails: {
    background: "#f8f9fa",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#333",
    fontSize: "15px",
  },

  textarea: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "14px",
    fontFamily: "Arial, sans-serif",
    resize: "vertical",
    marginBottom: "20px",
  },

  modalFooter: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
  },

  btnCancel: {
    background: "#888",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },

  btnSubmit: {
    background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
};

export default BloodRequests;
