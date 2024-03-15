import { Box, alpha, useTheme } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { SimpleNavBar } from "../components/nav-bar";
import { Slide } from "../components/slide";
import monthlyReports from "./data/monthly_reports.json";
import { ChartOptions } from "chart.js";

export const ParisEnergyPerformanceDraftAnalysis = () => {
  const theme = useTheme();

  const chartData = {
    labels: Object.keys(monthlyReports),
    datasets: [
      {
        label: "Number of Reports",
        data: Object.values(monthlyReports),
        backgroundColor: alpha(theme.palette.common.white, 0.5),
        borderWidth: 0,
      },
    ],
  };
  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: theme.palette.common.white,
        },
        grid: {
          color: alpha(theme.palette.common.white, 0.1),
        },
      },
      x: {
        ticks: {
          color: theme.palette.common.white,
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          color: theme.palette.common.white,
          font: {
            family: theme.typography.fontFamily,
          },
        },
      },
      tooltip: {
        titleFont: {
          family: theme.typography.fontFamily,
        },
        bodyFont: {
          family: theme.typography.fontFamily,
        },
        footerFont: {
          family: theme.typography.fontFamily,
        },
        usePointStyle: true,
      },
    },
  };
  return (
    <>
      <SimpleNavBar />
      <Slide first light primary={"Energy Performance in Paris"}>
        <Box>test</Box>
      </Slide>
      <Slide dark primary={"Energy Performance Reports since June 2021"}>
        <Bar data={chartData} options={options} />
      </Slide>
    </>
  );
};
