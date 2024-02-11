import { Box, useTheme } from "@mui/material";
import "chart.js/auto";
import { RadialLinearScaleOptions } from "chart.js/auto";
import { Radar } from "react-chartjs-2";
import { NAVBAR_HEIGHT } from "../constants";

export const RadarChart = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        maxWidth: "100%",
        maxHeight: `calc(100dvh - ${NAVBAR_HEIGHT}px - ${
          theme.typography.h2.fontSize
        } - (4 * ${theme.spacing(4)}) - (4 * ${theme.spacing(4)}))`,
        [theme.breakpoints.down("md")]: {
          maxHeight: `calc(100dvh - ${NAVBAR_HEIGHT}px - ${
            theme.typography.h2.fontSize
          } - (4 * ${theme.spacing(3)}) - (4 * ${theme.spacing(3)}))`,
        },
        [theme.breakpoints.down("sm")]: {
          maxHeight: `calc(100dvh - ${NAVBAR_HEIGHT}px - ${
            theme.typography.h2.fontSize
          } - (4 * ${theme.spacing(2)}) - (4 * ${theme.spacing(2)}))`,
        },
      }}
    >
      <Radar
        options={{
          responsive: true,
          maintainAspectRatio: true,
          animation: false,
          font: {
            family: theme.typography.fontFamily,
          },
          scales: {
            r: {
              angleLines: {
                color: `${theme.palette.primary.main}40`,
                borderDash: [6, 8],
              },
              grid: {
                color: `${theme.palette.primary.main}40`,
              },
              border: { dash: [6, 8] },
              beginAtZero: true,
              max: 100,
              ticks: {
                display: false,
              },
              pointLabels: {
                color: theme.palette.primary.main,
                font: {
                  size: 16,
                  family: theme.typography.fontFamily,
                },
                padding: 8,
              },
            } as RadialLinearScaleOptions & {
              // https://github.com/chartjs/Chart.js/issues/11661
              border: { dash: number[] };
            },
          },
          plugins: {
            legend: {
              position: "bottom",
              align: "center",
              labels: {
                color: theme.palette.text.secondary,
                usePointStyle: true,
                font: {
                  family: theme.typography.fontFamily,
                },
                padding: 24,
                boxPadding: 16,
              },
            },
          },
        }}
        data={{
          datasets: [
            {
              label: "Current",
              data: [90, 50, 90, 40, 50, 40],
              backgroundColor: `${theme.palette.primary.light}B0`,
              borderWidth: 0,
              pointRadius: 0,
            },
            {
              label: "Desired",
              data: [100, 60, 90, 60, 60, 80],
              backgroundColor: `${theme.palette.secondary.light}D0`,
              borderWidth: 0,
              pointRadius: 0,
            },
          ],
          labels: [
            "Agile",
            "Design",
            "Software",
            "Infrastructure",
            "Continuous Delivery",
            "Data",
          ].map((label) => label.split(" ")),
        }}
      />
    </Box>
  );
};
