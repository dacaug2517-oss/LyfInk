import React from "react";
import { Heart, Droplet, CheckCircle } from "lucide-react";

// export default function DonorEligibility() {
  export default function DonorEligibility({ setPage }) {

  const checklist = [
    "You are between 18 and 65 years of age.",
    "You weigh at least 50 kg (110 lbs).",
    "Your hemoglobin level is within the normal range.",
    "You are in good general health today.",
    "You do not have any cold, flu, or other illness.",
    "You have not donated blood in the last 52 days.",
  ];

  return (
    <>
      {/* Page Title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px",
          color: "#fffdfd",
          fontWeight: "bold",
          fontSize: "22px",
        }}
      >
        <Heart size={22} color="#fffdfd" />
        Check Eligibility
      </div>

      {/* Eligibility Card */}
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          padding: "30px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          display: "flex",
          gap: "40px",
        }}
      >
        {/* Checklist */}
        <div style={{ flex: 1 }}>
          <h2
            style={{
              color: "#c1121f",
              fontSize: "20px",
              marginBottom: "20px",
              fontWeight: "bold",
            }}
          >
            Eligibility Criteria Checklist
          </h2>

          {checklist.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "14px",
                color: "#444",
                fontSize: "14px",
              }}
            >
              <CheckCircle size={18} color="#4caf50" />
              {item}
            </div>
          ))}

          <div
            style={{
              marginTop: "10px",
              fontSize: "13px",
              color: "#1e88e5",
              cursor: "pointer",
            }}
             onClick={() => setPage("donate")}
          >
            See Full Eligibility Guidelines
          </div>
        </div>
        

        {/* Illustration + Button */}
        <div
          style={{
            width: "260px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "160px",
              height: "200px",
              background:
                "linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 14px rgba(211, 47, 47, 0.25)",
            }}
          >
            <Droplet size={80} color="#d32f2f" fill="#d32f2f" />
          </div>

          {/* <button
            style={{
              marginTop: "20px",
              padding: "12px 28px",
              background:
                "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "600",
              boxShadow: "0 4px 10px rgba(238, 90, 111, 0.4)",
            }}
          >
            See Full Eligibility Guidelines
          </button> */}
          <button
  onClick={() => setPage("donate")}
  style={{
    marginTop: "20px",
    padding: "12px 28px",
    background:
      "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    boxShadow: "0 4px 10px rgba(238, 90, 111, 0.4)",
  }}
>
  See Full Eligibility Guidelines
</button>

        </div>
      </div>
    </>
  );
}