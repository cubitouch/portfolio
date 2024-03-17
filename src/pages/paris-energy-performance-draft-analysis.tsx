import { Box, alpha, useTheme } from "@mui/material";
import { ChartOptions } from "chart.js";
import { Bar } from "react-chartjs-2";
import { SimpleNavBar } from "../components/nav-bar";
import { Slide } from "../components/slide";
import monthlyReports from "./data/monthly_reports.json";

export const ParisEnergyPerformanceDraftAnalysis = () => {
  const theme = useTheme();

  const chartData = {
    labels: Object.keys(monthlyReports),
    datasets: [
      {
        label: "# Reports",
        data: Object.values(monthlyReports),
        backgroundColor: theme.palette.common.white,
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
        border: {
          color: alpha(theme.palette.common.white, 0.1),
        },
      },
      x: {
        ticks: {
          color: theme.palette.common.white,
        },
        border: {
          color: alpha(theme.palette.common.white, 0.1),
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
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
        displayColors: false,
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
        <Box sx={{ maxHeight: "60dvh" }}>
          <Bar data={chartData} options={options} />
        </Box>
      </Slide>
    </>
  );
};
