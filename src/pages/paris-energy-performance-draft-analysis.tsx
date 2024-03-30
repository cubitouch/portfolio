import InsightsIcon from "@mui/icons-material/Insights";
import {
  Avatar,
  Box,
  Button,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { ChartOptions } from "chart.js";
import { merge } from "chart.js/helpers";
import { Bar } from "react-chartjs-2";
import Heatmap from "../components/heatmap";
import { SimpleNavBar } from "../components/nav-bar";
import { Slide } from "../components/slide";
import dpePerPostalCode from "./data/dpe_per_postal_code.json";
import eraDpeRatios from "./data/era_dpe_ratios.json";
import floorGesCounts from "./data/floor_ges_counts_filtered.json";
import monthlyReports from "./data/monthly_reports.json";

interface ChartContainerProps {
  children: React.ReactNode;
  flex?: boolean;
}
const ChartContainer = ({ children, flex }: ChartContainerProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: "50dvh",
        maxWidth: {
          md: `calc(100dvw - ${theme.spacing(8)})`,
          sm: `calc(100dvw - ${theme.spacing(4)})`,
        },
        display: flex ? "flex" : undefined,
      }}
    >
      {children}
    </Box>
  );
};

interface NotesListProps {
  list: string[];
  numbered?: boolean;
}
const NotesList = ({ list, numbered }: NotesListProps) => {
  const theme = useTheme();
  return (
    <List dense disablePadding>
      {list.map((item, index) => (
        <ListItem disableGutters key={index}>
          {numbered && (
            <ListItemAvatar sx={{ minWidth: 32 }}>
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  fontSize: 14,
                  background: theme.palette.primary.main,
                }}
              >
                {index + 1}
              </Avatar>
            </ListItemAvatar>
          )}
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  );
};

export const ParisEnergyPerformanceDraftAnalysis = () => {
  const theme = useTheme();

  const reportsData = {
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

  const sortedRatings = Object.entries(dpePerPostalCode).sort(
    (a, b) => b[1].ABC_sum - a[1].ABC_sum
  );
  const ratingsData = {
    labels: sortedRatings.map(([key]) => key),
    datasets: [
      {
        label: "A, B, C",
        data: sortedRatings.map(
          ([_, values]) => values.A + values.B + values.C
        ),
        backgroundColor: theme.palette.primary.main,
        borderWidth: 0,
      },
      {
        label: "C, D, E",
        data: sortedRatings.map(([_, values]) => values[">C"]),
        backgroundColor: theme.palette.common.white,
        borderWidth: 0,
      },
    ],
  };

  const emissionsData = {
    labels: Object.keys(floorGesCounts),
    datasets: [
      {
        label: "A, B, C",
        data: Object.values(floorGesCounts).map(
          (value) => value.A + value.B + value.C
        ),
        backgroundColor: theme.palette.primary.dark,
        borderWidth: 0,
      },
      {
        label: "C, D, E",
        data: Object.values(floorGesCounts).map((value) => value[">C"]),
        backgroundColor: theme.palette.common.white,
        borderWidth: 0,
      },
    ],
  };

  const options = (color: string): ChartOptions<"bar"> => ({
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: color,
        },
        grid: {
          color: alpha(color, 0.1),
        },
        border: {
          color: alpha(color, 0.1),
        },
      },
      x: {
        ticks: {
          color: color,
        },
        border: {
          color: alpha(color, 0.1),
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: color,
          usePointStyle: true,
          padding: 16,
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
        displayColors: true,
        usePointStyle: true,
        boxPadding: 8,
      },
    },
  });

  const eras = Object.keys(eraDpeRatios).reverse();
  const dpeRatings = ["A", "B", "C", "D", "E", "F", "G"];
  const ratingsPerEraData = {
    label: "DPE Rating vs Construction Era",
    data: eras.flatMap((era, y) => {
      return dpeRatings.map((rating, x) => ({
        x: dpeRatings[x],
        y: eras[y],
        value: (eraDpeRatios as any)[era][rating] || 0,
      }));
    }),
  };

  return (
    <>
      <SimpleNavBar />
      <Slide maxWidth="lg" first light primary={"Energy Performance in Paris"}>
        <Typography variant="h4">Problem</Typography>
        <Typography variant="body1">
          Where to search in Paris to find an energy efficient property to rent?
        </Typography>
        <Typography variant="h4">Assumptions</Typography>

        <NotesList
          numbered
          list={[
            "Paris has a decent amount of well rated properties.",
            "Some postal codes have a higher amount of energy efficient flats (say, rated from A to C).",
            "Flats located on the ground floor have a worst rating, as they as less well isolated.",
            "Some construction eras have most efficient ratings than others.",
          ]}
        />
        <Typography variant="h4">Data source</Typography>
        <Link
          onClick={() =>
            window.open(
              "https://data.ademe.fr/datasets/dpe-v2-logements-existants/full?Type_b%C3%A2timent_eq=appartement&cols=N%C2%B0DPE,Date_%C3%A9tablissement_DPE,Etiquette_GES,Etiquette_DPE,Ann%C3%A9e_construction,Type_installation_ECS_%28g%C3%A9n%C3%A9ral%29,P%C3%A9riode_construction,Surface_habitable_logement,Classe_inertie_b%C3%A2timent,Typologie_logement,Position_logement_dans_immeuble,Nom__commune_%28BAN%29,N%C2%B0_r%C3%A9gion_%28BAN%29,Code_postal_%28BAN%29&Code_postal_%28BAN%29_starts=75",
              "_blank"
            )
          }
        >
          data.ademe.fr
        </Link>
      </Slide>
      <Slide
        maxWidth="lg"
        dark
        primary={"How many Energy Performance reports since June 2021?"}
      >
        <ChartContainer>
          <Bar
            data={reportsData}
            options={options(theme.palette.common.white)}
          />
        </ChartContainer>
        <Typography variant="body1">
          Question: Why hasn't there been much data, if at all, from February
          2023 to September 2023? 🤔
        </Typography>
      </Slide>
      <Slide
        maxWidth="lg"
        primary={"Which postal codes have most A, B or C energy ratings?"}
      >
        <ChartContainer>
          <Bar
            data={ratingsData}
            options={merge(options(theme.palette.primary.main), {
              scales: { y: { stacked: true }, x: { stacked: true } },
            } as ChartOptions<"bar">)}
          />
        </ChartContainer>

        <NotesList
          list={[
            "Note: There is a low amount of properties rated A, B or C.",
            "Assumption #1 - incorrect ❌",
            "Note: 75019, 75013 and 75018 postal codes have a higher number of properties having been energy performance rated either A, B or C.",
            "Assumption #2 - confirmed ✅",
          ]}
        />
      </Slide>
      <Slide
        maxWidth="lg"
        dark
        primary={"How efficient are ground floor properties?"}
      >
        <ChartContainer>
          <Bar
            data={emissionsData}
            options={options(theme.palette.common.white)}
          />
        </ChartContainer>
        <NotesList
          list={[
            "Note: There seem to be more well rated properties on the ground floor than on other floors. Especially for GES rating.",
            "Assumption #3 - incorrect ❌",
          ]}
        />
      </Slide>
      <Slide
        maxWidth="lg"
        primary={"How efficient are ground floor properties?"}
      >
        <ChartContainer flex>
          <Heatmap data={ratingsPerEraData.data} />
        </ChartContainer>
        <NotesList
          list={[
            "Notes: Properties built since 1983 have +20% C ratings, properties built between 2001 and 2021 offer an even higher amount C ratings ratio, and a growing amount of B ratings, properties built recently (since 2021) offer the best rating.",
            "Assumption #4 - confirmed ✅",
          ]}
        />
      </Slide>
      <Slide maxWidth="lg" primary={"Conclusions"}>
        <NotesList
          numbered
          list={[
            "❌ Paris has few well rated properties,",
            "✅ 75019, 75013 and 75018 are more efficient,",
            "❌ Ground floor flats are actually more efficient,",
            "✅ Recent constructions are usually more efficient.",
          ]}
        />
        <Typography variant="body1">
          Further analysis: Can we represent a corelation of assumptions #2 and
          #4 via a construction era breakdown per postal codes? This would
          re-enforce assumption #2 findings, if 75019, 75013 and 75018 postal
          codes have higher amount of properties built since 1982 and/or since
          2001, compared to other postal codes.
        </Typography>

        <Button
          startIcon={<InsightsIcon />}
          onClick={() =>
            window.open(
              "https://colab.research.google.com/drive/1L-K23XB9Alm94My2JKvLrTilHC-6S7r0?usp=sharing",
              "_blank"
            )
          }
        >
          See how I explored this on Colab
        </Button>
      </Slide>
    </>
  );
};
