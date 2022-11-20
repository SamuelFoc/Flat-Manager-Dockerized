import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const LineChart = ({ chartData }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "white",
          padding: 5,
          boxHeight: 8,
          boxWidth: 8,
          font: {
            size: 18,
            family: "Orbitron",
          },
        },
        tooltip: {
          bodyFont: {},
          titleFont: {},
        },
      },
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
    },
    scales: {
      yAxes: {
        barPercentage: 1.6,
        grid: {
          display: true,
          color: "#B3B3B3",
          zeroLineColor: "transparent",
        },
        ticks: {
          suggestedMin: 0,
          suggestedMax: 125000,
          padding: 2,
          backdropPadding: 2,
          backdropColor: "rgba(255,255,255,1)",
          color: "white",
          font: {
            size: 14,
          },
          major: {
            enable: true,
          },
        },
      },
      xAxes: {
        barPercentage: 1.6,
        grid: {
          display: false,
          zeroLineColor: "transparent",
        },
        ticks: {
          padding: 20,
          color: "white",
          font: {
            size: function (context) {
              var height = context?.chart?.height / 22;
              if (height < 8) {
                return 0;
              }
              return height;
            },
          },

          major: {
            enable: false,
          },
        },
      },
    },
  };

  return <Line className="chartBox" data={chartData} options={options} />;
};

export default LineChart;
