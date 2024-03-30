import { Box, useTheme } from "@mui/material";
import { ApexOptions } from "apexcharts";
import ApexCharts from "react-apexcharts";

interface DataPoint {
  x: string;
  y: string;
  value: number;
}

interface HeatmapProps {
  data: DataPoint[];
}

const Heatmap = ({ data }: HeatmapProps) => {
  const theme = useTheme();
  // Prepare data for ApexCharts
  const series = data.reduce<ApexAxisChartSeries>((acc, { x, y, value }) => {
    let seriesItem = acc.find((item) => item.name === y);
    if (!seriesItem) {
      seriesItem = { name: y, data: [] };
      acc.push(seriesItem);
    }
    seriesItem.data.push({ x, y: value } as any);
    return acc;
  }, []);

  const options: ApexOptions = {
    grid: {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 10,
      },
    },
    states: {
      active: {
        filter: {
          type: "none",
        },
      },
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    chart: {
      type: "heatmap",
      toolbar: {
        show: false,
      },
      animations: {
        enabled: false,
      },
      selection: {
        enabled: false,
        type: "xy",
      },
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        radius: 0,
        useFillColorAsStroke: true,
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 20,
              color: theme.palette.secondary.light,
              foreColor: theme.palette.secondary.contrastText,
            },
            {
              from: 20,
              to: 40,
              color: theme.palette.primary.light,
              foreColor: theme.palette.primary.contrastText,
            },
            {
              from: 40,
              to: 50,
              color: theme.palette.primary.main,
              foreColor: theme.palette.primary.contrastText,
            },
            {
              from: 50,
              to: 70,
              color: theme.palette.primary.dark,
              foreColor: theme.palette.primary.contrastText,
            },
          ],
        },
      },
    },
    dataLabels: {
      style: {
        fontFamily: "Titillium Web",
      },
      formatter: function (value: number) {
        return value.toFixed(1);
      },
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: true,
      theme: "dark",
      marker: { show: true },

      // Customizing the tooltip content
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const xValue = w.globals.labels[dataPointIndex];
        const yValue = series[seriesIndex][dataPointIndex];
        const name = w.globals.seriesNames[seriesIndex];
        // Construct the tooltip content. You can use HTML for styling.
        return (
          `<div class="apexcharts-tooltip-title" style="font-family: 'Titillium Web';">` +
          `<b>Era</b>: ${name}<br>` +
          `<b>Raiting</b>: ${xValue}<script>alert('pops')</script><br>` +
          `<b>Proportion</b>: ${yValue.toFixed(1)} %` +
          `</div>`
        );
      },
      style: {
        fontSize: "12px",
        fontFamily: "Helvetica, Arial, sans-serif",
      },
    },
    xaxis: {
      type: "category",
      labels: {
        style: {
          fontFamily: "Titillium Web",
          colors: theme.palette.text.primary,
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          fontFamily: "Titillium Web",
          colors: theme.palette.text.primary,
        },
      },
    },
  };

  return (
    <Box sx={{ display: "flex", flex: "1" }}>
      <Box flex="1">
        <ApexCharts
          options={options}
          series={series}
          type="heatmap"
          height="100%"
        />
      </Box>
    </Box>
  );
};

export default Heatmap;
