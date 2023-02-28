import React from "react";

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import WidgetWrapper from "Components/WidgetWrapper";

ChartJS.register(
  CategoryScale,
  ArcElement,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const PieC = ({pieData}) => {
  const data = {
    labels: ["Canceled", "Success"],
    datasets: [
      {
        label: "Appointments",
        data: pieData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 3,
      },
    ],
  };
  return (
    <WidgetWrapper width={"100%"}>
      <Pie data={data} />
    </WidgetWrapper>
  );
};

export const LineC = ({cancelAppointmentData,successAppointmentData,lineLabel}) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };
  const data = {
    labels:lineLabel,
    datasets: [
      {
        label: "Canceled Appointments",
        data: cancelAppointmentData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Successfull Appointments",
        data: successAppointmentData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <WidgetWrapper width={"100%"}>
      <Line data={data} options={options} />
    </WidgetWrapper>
  );
};
