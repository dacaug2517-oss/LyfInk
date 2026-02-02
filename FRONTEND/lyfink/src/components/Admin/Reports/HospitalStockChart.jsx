import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

export default function HospitalStockChart() {
  const [hospitalNames, setHospitalNames] = useState([]);
  const [stockValues, setStockValues] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5048/api/BloodStock").then((res) => {
      const grouped = {};

      // ✅ Group total stock by hospital
      res.data.forEach((item) => {
        grouped[item.hospitalName] =
          (grouped[item.hospitalName] || 0) + item.ml;
      });

      setHospitalNames(Object.keys(grouped));
      setStockValues(Object.values(grouped));
    });
  }, []);

  return (
    <Chart
      options={{
        chart: { type: "bar" },
        title: {
          text: "Total Blood Stock Available per Hospital",
          align: "center",
        },
        xaxis: {
          categories: hospitalNames,
        },
        yaxis: {
          title: {
            text: "Stock (ml)",
          },
        },
      }}
      series={[
        {
          name: "Stock (ml)",
          data: stockValues,
        },
      ]}
      type="bar"
      height={350}
    />
  );
}
