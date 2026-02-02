import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

export default function RegisteredHospitalsChart() {
  const [hospitalNames, setHospitalNames] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.userid) {
      axios
        .get(`http://localhost:5048/api/HbDetails/admin/${user.userid}`)
        .then((res) => {
          setHospitalNames(res.data.map((h) => h.hbName));
        });
    }
  }, []);

  return (
    <Chart
      options={{
        chart: { type: "pie" },
        labels: hospitalNames,
        title: {
          text: "Hospitals Registered by Admin",
          align: "center",
        },
      }}
      series={hospitalNames.map(() => 1)} // each hospital counts as 1
      type="pie"
      height={350}
    />
  );
}
