import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "./LineChart.css";

function LineChart(props) {
  const options = {
    scales: {
      y: {
        ticks: {
          color: "white",
        },
        beginAtZero: true,
      },
      x: {
        ticks: {
          color: "white",
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        color: "white",
        text: "Data Chart of Stocks at '" + props.title + "' Price",
      },
    },
  };

  const data = {
    labels: props.labels,
    datasets: [
      {
        data: props.data,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <section className="chart">
      <Line data={data} options={options} />
    </section>
  );
}

export default LineChart;
