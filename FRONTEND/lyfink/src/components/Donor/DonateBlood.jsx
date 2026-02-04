import React, { useState, useEffect } from "react";
import axios from "axios";
import { Droplet, ArrowLeft } from "lucide-react";

const Eligibility = () => {
  const [isEligible, setIsEligible] = useState(false);
  const [showBloodGroupModal, setShowBloodGroupModal] = useState(false);
  const [showBloodRequestsModal, setShowBloodRequestsModal] = useState(false);
  
  const [bloodGroups, setBloodGroups] = useState([]);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState(null);
  
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [comment, setComment] = useState("");

  // Fetch blood groups from API
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/bloodcomponents/category/1")
      .then((res) => {
        setBloodGroups(res.data);
      })
      .catch((err) => {
        console.error("Error fetching blood groups:", err);
        // Fallback blood groups if API fails
        setBloodGroups([
          { bcid: 1, bc_name: "A+" },
          { bcid: 2, bc_name: "A-" },
          { bcid: 3, bc_name: "B+" },
          { bcid: 4, bc_name: "B-" },
          { bcid: 5, bc_name: "AB+" },
          { bcid: 6, bc_name: "AB-" },
          { bcid: 7, bc_name: "O+" },
          { bcid: 8, bc_name: "O-" },
        ]);
      });
  }, []);

  const handleProceed = () => {
    if (!isEligible) return;
    setShowBloodGroupModal(true);
  };

  const handleBloodGroupSelect = (bloodGroup) => {
    setSelectedBloodGroup(bloodGroup);
    setShowBloodGroupModal(false);
    setShowBloodRequestsModal(true);
    fetchRequests(bloodGroup.bcid);
  };

  const fetchRequests = (bcid) => {
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

  const handleBackToBloodGroups = () => {
    setShowBloodRequestsModal(false);
    setShowBloodGroupModal(true);
    setSelectedBloodGroup(null);
    setRequests([]);
  };

  const handleCloseAllModals = () => {
    setShowBloodGroupModal(false);
    setShowBloodRequestsModal(false);
    setSelectedBloodGroup(null);
    setRequests([]);
  };

  const handleAccept = (request) => {
    setSelectedRequest(request);
    setShowCommentModal(true);
  };

  const submitResponse = () => {
    if (!comment.trim()) {
      alert("Please enter a comment before submitting!");
      return;
    }

    axios
      .post("http://localhost:8083/api/response/data", {
        brid: selectedRequest.brid,
        comment: comment,
        status: "ACCEPTED",
      })
      .then(() => {
        alert("Response Saved Successfully ✅");
        
        // Remove the accepted request from the list
        setRequests(prevRequests => 
          prevRequests.filter(req => req.brid !== selectedRequest.brid)
        );
        
        setShowCommentModal(false);
        setComment("");
        setSelectedRequest(null);
      })
      .catch((err) => {
        console.error("Backend Error:", err.response?.data || err.message);
        alert("Error saving response ❌");
      });
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Title */}
        <h2 style={styles.heading}>Eligibility Criteria Checklist</h2>

        {/* Checklist */}
        <ul style={styles.list}>
          <li style={styles.listItem}>
            ✓ You must have waited at least 90 days (3 months) since your last whole-blood donation.
          </li>
          <li style={styles.listItem}>
            ✓ Your blood pressure and pulse must be within a normal and safe range.
          </li>
          <li style={styles.listItem}>
            ✓ Women must not be pregnant and must wait at least 6 months after delivery or miscarriage.
          </li>
          <li style={styles.listItem}>
            ✓ You must not be taking restricted medicines, such as antibiotics or blood thinners.
          </li>
          <li style={styles.listItem}>
            ✓ You must not have any chronic or serious diseases such as HIV, Hepatitis B or C, cancer, heart disease, or epilepsy.
          </li>
        </ul>

        {/* Confirmation Checkbox */}
        <div style={styles.checkboxContainer}>
          <input
            type="checkbox"
            checked={isEligible}
            onChange={() => setIsEligible(!isEligible)}
          />
          <label style={styles.checkboxLabel}>
            I confirm that I meet all the above eligibility criteria.
          </label>
        </div>

        {/* Bottom Section */}
        <div style={styles.footer}>
          <div>
            <p style={styles.question}>Are you eligible to donate blood?</p>
            <p style={styles.subText}>Please confirm before proceeding</p>
          </div>

          <button
            style={{
              ...styles.button,
              background: isEligible
                ? "linear-gradient(to right, #ff4d4d, #cc0000)"
                : "#ccc",
              cursor: isEligible ? "pointer" : "not-allowed",
            }}
            disabled={!isEligible}
            onClick={handleProceed}
          >
            Proceed to Donate
          </button>
        </div>
      </div>

      {/* Blood Group Selection Modal */}
      {showBloodGroupModal && (
        <>
          <div style={styles.overlay} onClick={handleCloseAllModals}></div>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Select Your Blood Group</h3>
              <button style={styles.closeButton} onClick={handleCloseAllModals}>
                ✕
              </button>
            </div>

            <p style={styles.modalSubtitle}>
              Click on your blood group to view available donation requests
            </p>

            <div style={styles.bloodGroupGrid}>
              {bloodGroups.map((bg) => (
                <div
                  key={bg.bcid}
                  style={styles.bloodGroupCard}
                  onClick={() => handleBloodGroupSelect(bg)}
                >
                  <div style={styles.bloodGroupIcon}>🩸</div>
                  <h4 style={styles.bloodGroupName}>{bg.bc_name}</h4>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Blood Requests Modal */}
      {showBloodRequestsModal && (
        <>
          <div style={styles.overlay} onClick={handleCloseAllModals}></div>
          <div style={styles.requestsModal}>
            <div style={styles.requestsHeader}>
              <button onClick={handleBackToBloodGroups} style={styles.backButton}>
                <ArrowLeft size={20} />
                <span>Back to Blood Groups</span>
              </button>

              <button style={styles.closeButton} onClick={handleCloseAllModals}>
                ✕
              </button>
            </div>

            <h3 style={styles.requestsTitle}>
              <Droplet size={24} color="#c1121f" />
              Blood Requests for {selectedBloodGroup?.bc_name}
            </h3>

            <div style={styles.requestsContent}>
              {loading ? (
                <div style={styles.loadingContainer}>
                  <div style={styles.spinner}></div>
                  <p style={styles.loadingText}>Loading blood requests...</p>
                </div>
              ) : requests.length === 0 ? (
                <div style={styles.noDataContainer}>
                  <Droplet size={60} color="#ccc" />
                  <p style={styles.noDataText}>
                    No blood requests found for {selectedBloodGroup?.bc_name}
                  </p>
                  <p style={styles.noDataSubtext}>Try selecting a different blood group</p>
                </div>
              ) : (
                <div style={styles.tableContainer}>
                  <table style={styles.table}>
                    <thead>
                      <tr style={styles.tableHeaderRow}>
                        <th style={styles.th}>Blood Group</th>
                        <th style={styles.th}>Required Units</th>
                        <th style={styles.th}>Hospital</th>
                        <th style={styles.th}>Contact No</th>
                        <th style={styles.th}>Email</th>
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
                                {req.bloodGroup || "N/A"}
                              </span>
                            </div>
                          </td>
                          <td style={styles.td}>
                            <span style={styles.unitsText}>{req.quantity} Units</span>
                          </td>
                          <td style={styles.td}>
                            <span style={styles.hospitalText}>
                              {req.hospitalName || "N/A"}
                            </span>
                          </td>
                          <td style={styles.td}>
                            <span style={styles.contactText}>
                              {req.hospitalPhone || "N/A"}
                            </span>
                          </td>
                          <td style={styles.td}>
                            <span style={styles.emailText}>
                              {req.hospitalEmail || "N/A"}
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
            </div>
          </div>
        </>
      )}

      {/* Comment Modal */}
      {showCommentModal && (
        <>
          <div style={styles.commentOverlay} onClick={() => setShowCommentModal(false)}></div>
          <div style={styles.commentModal}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Accept Donation Request</h3>
              <button
                style={styles.closeButton}
                onClick={() => setShowCommentModal(false)}
              >
                ✕
              </button>
            </div>

            <div style={styles.requestDetails}>
              <p>
                <strong>Blood Group:</strong> {selectedRequest?.bloodGroup || "N/A"}
              </p>
              <p>
                <strong>Required Units:</strong> {selectedRequest?.quantity}
              </p>
              <p>
                <strong>Hospital:</strong> {selectedRequest?.hospitalName || "N/A"}
              </p>
              <p>
                <strong>Contact No:</strong> {selectedRequest?.hospitalPhone || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {selectedRequest?.hospitalEmail || "N/A"}
              </p>
              <p>
                <strong>Location:</strong> {selectedRequest?.city || "N/A"}
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
                onClick={() => setShowCommentModal(false)}
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
  page: {
    padding: "30px 20px",
    borderRadius: "14px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "700px",
  },

  heading: {
    color: "#c1121f",
    marginBottom: "20px",
  },

  list: {
    listStyle: "none",
    padding: 0,
    marginBottom: "25px",
  },

  listItem: {
    padding: "12px 0",
    color: "#222",
    fontSize: "15px",
    lineHeight: "1.6",
  },

  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  },

  checkboxLabel: {
    fontSize: "14px",
    color: "#333",
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f4f6ff",
    padding: "16px 20px",
    borderRadius: "14px",
    marginTop: "10px",
  },

  question: {
    fontWeight: "bold",
    margin: 0,
  },

  subText: {
    fontSize: "13px",
    color: "#555",
    margin: 0,
  },

  button: {
    border: "none",
    padding: "12px 22px",
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "10px",
    transition: "0.3s",
  },

  // Modal Styles
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
    backdropFilter: "blur(4px)",
  },

  modal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    borderRadius: "20px",
    padding: "30px",
    maxWidth: "500px",
    width: "90%",
    maxHeight: "80vh",
    overflowY: "auto",
    zIndex: 1000,
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
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
    fontSize: "24px",
    cursor: "pointer",
    color: "#999",
    padding: "0",
    width: "30px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    transition: "all 0.2s",
  },

  modalSubtitle: {
    color: "#666",
    marginBottom: "20px",
    fontSize: "14px",
  },

  bloodGroupGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "12px",
    marginBottom: "10px",
  },

  bloodGroupCard: {
    border: "2px solid #e0e0e0",
    borderRadius: "12px",
    padding: "15px 10px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backgroundColor: "#fff",
  },

  bloodGroupIcon: {
    fontSize: "28px",
    marginBottom: "5px",
  },

  bloodGroupName: {
    margin: 0,
    color: "#333",
    fontSize: "18px",
    fontWeight: "bold",
  },

  // Blood Requests Modal Styles
  requestsModal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    borderRadius: "20px",
    padding: "25px",
    maxWidth: "1100px",
    width: "95%",
    maxHeight: "85vh",
    overflowY: "auto",
    zIndex: 1000,
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
  },

  requestsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
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
    transition: "all 0.3s ease",
    boxShadow: "0 2px 8px rgba(66, 165, 245, 0.3)",
  },

  requestsTitle: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#c1121f",
    marginBottom: "20px",
  },

  requestsContent: {
    minHeight: "200px",
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
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid #e0e0e0",
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
    padding: "14px 16px",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "14px",
    letterSpacing: "0.5px",
  },

  tableRow: {
    transition: "all 0.2s ease",
  },

  td: {
    padding: "14px 16px",
    borderBottom: "1px solid #f0f0f0",
    fontSize: "14px",
  },

  bloodGroupCell: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  bloodDroplet: {
    fontSize: "18px",
  },

  bloodGroupText: {
    fontSize: "15px",
    fontWeight: "bold",
    color: "#c1121f",
  },

  unitsText: {
    fontSize: "14px",
    color: "#333",
    fontWeight: "500",
  },

  hospitalText: {
    fontSize: "14px",
    color: "#555",
  },

  contactText: {
    fontSize: "14px",
    color: "#555",
  },

  emailText: {
    fontSize: "13px",
    color: "#555",
    wordBreak: "break-word",
  },

  locationText: {
    fontSize: "14px",
    color: "#666",
  },

  acceptButton: {
    background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },

  // Comment Modal Styles
  commentOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 1500,
    backdropFilter: "blur(4px)",
  },

  commentModal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    width: "90%",
    maxWidth: "500px",
    zIndex: 1501,
    boxShadow: "0 25px 70px rgba(0, 0, 0, 0.4)",
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

export default Eligibility;