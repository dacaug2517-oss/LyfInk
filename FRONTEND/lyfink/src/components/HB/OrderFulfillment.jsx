import React from "react";
import "./Style.css";

const orders = [
  { id: 1008, hospital: "Greenfield Medical Center", blood: "O+", status: "Completed" },
  { id: 1095, hospital: "Springfield Blood Center", blood: "B+", status: "Pending" },
];

export default function OrderFulfillment() {
  return (
    <div className="hb-card">
      <h2 className="hb-title">Order Fulfillment</h2>

      <table className="hb-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Hospital</th>
            <th>Blood Type</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.hospital}</td>
              <td>{o.blood}</td>
              <td>
                <span
                  className={
                    o.status === "Completed"
                      ? "hb-status ok"
                      : "hb-status urgent"
                  }
                >
                  {o.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}