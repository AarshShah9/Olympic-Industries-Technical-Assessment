import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "./LineChart.css";

function LineChart(props) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: props.title,
      },
    },
  };

  const data = {
    labels: props.labels,
    datasets: [
      {
        label: props.name,
        data: props.data,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <section className="chart">
      <Line data={data} options={options} />;
    </section>
  );
}

export default LineChart;
