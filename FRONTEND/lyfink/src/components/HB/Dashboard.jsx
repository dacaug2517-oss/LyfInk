import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Style.css";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/request/blood")
      .then((res) => {
        setDashboardData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching dashboard data", err);
      });
  }, []);

  return (<>
    <div className="hb-card">
      {/* <h2 className="hb-title">Dashboard</h2> */}
      <h6 className="hb-title">Requested Blood</h6>

      <table className="hb-table">
        <thead>
          <tr>
            <th>Blood Type</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {dashboardData.map((d, i) => (
            <tr key={i}>
              <td>{d.type}</td>
              <td>{d.count}</td>
              <td>
                <span
                  className={
                    d.status === "HIGH"
                      ? "hb-status urgent"
                      : "hb-status ok"
                  }
                >
                  {d.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  </>);
}
