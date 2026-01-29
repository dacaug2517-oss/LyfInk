import React from "react";
import "./Style.css";

const stockData = [
  { type: "A+", units: 20, status: "URGENT" },
  { type: "B+", units: 15, status: "URGENT" },
  { type: "AB+", units: 12, status: "OK" },
  { type: "O+", units: 8, status: "URGENT" },
];

export default function BloodStock() {
  return (
    <div className="hb-card">
      <h2 className="hb-title">Blood Stock</h2>

      <table className="hb-table">
        <thead>
          <tr>
            <th>Blood Type</th>
            <th>Units Available</th>
            <th>Critical Level</th>
          </tr>
        </thead>

        <tbody>
          {stockData.map((s, i) => (
            <tr key={i}>
              <td>{s.type}</td>
              <td>{s.units}</td>
              <td>
                <span
                  className={
                    s.status === "URGENT"
                      ? "hb-status urgent"
                      : "hb-status ok"
                  }
                >
                  {s.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="hb-btn">Order Blood</button>
    </div>
  );
}















// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Style.css";

// export default function BloodStock() {
//   const [stockData, setStockData] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/api/request")
//       .then((res) => {
//         setStockData(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching blood stock", err);
//       });
//   }, []);

//   return (
//     <div className="hb-card">
//       <h2 className="hb-title">Blood Stock</h2>

//       <table className="hb-table">
//         <thead>
//           <tr>
//             <th>Blood Type</th>
//             <th>Units Available</th>
//             <th>Critical Level</th>
//           </tr>
//         </thead>

//         <tbody>
//           {stockData.map((s, i) => (
//             <tr key={i}>
//               <td>{s.type}</td>
//               <td>{s.units}</td>
//               <td>
//                 <span
//                   className={
//                     s.status === "URGENT"
//                       ? "hb-status urgent"
//                       : "hb-status ok"
//                   }
//                 >
//                   {s.status}
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <button className="hb-btn">Order Blood</button>
//     </div>
//   );
// }
