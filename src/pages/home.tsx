import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import "chart.js/auto";
import { RadialLinearScaleOptions } from "chart.js/auto";
import { useState } from "react";
import { Radar } from "react-chartjs-2";
import { TypeAnimation } from "react-type-animation";
import ScrollSpy from "react-ui-scrollspy";
import topSlideBackground from "../assets/blanca-paloma-sanchez-AvfTRF9QINM-unsplash-min.jpg";
import { HintButton } from "../components/hint-button";
import { JourneySlider } from "../components/journey-slider";
import { NavBar } from "../components/nav-bar";
import { Slide } from "../components/slide";
import { NAVBAR_HEIGHT } from "../constants";

export const HOME_ID = "top";

export const HomePage = () => {
  const theme = useTheme();
  const [currentSection, setCurentSection] = useState(HOME_ID);
  const scrollTo = (id: string) => {
    window.scrollTo({
      top: (document.getElementById(id)?.offsetTop ?? 0) - NAVBAR_HEIGHT,
      behavior: "smooth",
    });
  };

  return (
    <>
      <NavBar
        currentSection={currentSection}
        scrollTo={scrollTo}
        defaultSectionId={HOME_ID}
      />
      <ScrollSpy
        offsetBottom={NAVBAR_HEIGHT}
        scrollThrottle={50}
        onUpdateCallback={(id) => setCurentSection(id)}
      >
        <Slide
          background={topSlideBackground}
          dark
          id={HOME_ID}
          hint={<HintButton onClick={() => scrollTo("journey")} />}
        >
          <Typography
            variant="h1"
            color={theme.palette.common.white}
            sx={{
              display: "flex",
              flex: 1,
              alignItems: "center",
              "& .type-animation::after": {
                content: "'_'",
              },
            }}
          >
            <TypeAnimation
              speed={40}
              sequence={[
                "I'm a Software Engineer",
                "I'm a Climate Tech actor",
                "I'm an Agilist",
                "I'm a Design partner",
                "I'm a DevOps enthusiast",
              ].flatMap((item) => [item, 2000])}
              cursor={true}
              repeat={Infinity}
              className="type-animation"
            />
          </Typography>
        </Slide>

        <Slide dark primary={"My journey"} id="journey">
          <JourneySlider />
        </Slide>

        <Slide light primary={"My skillset"} id="interests">
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
                      borderDash: [6, 8],
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
                        size: 14,
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
                  "CI/CD",
                  "Data",
                ],
              }}
            />
          </Box>
        </Slide>

        <Slide dark primary={"What else?"} id="more">
          <Box flex="1" />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <IconButton
              size="large"
              color="secondary"
              href="https://github.com/cubitouch/portfolio"
              target="_blank"
            >
              <GitHubIcon fontSize="large" />
            </IconButton>
            <IconButton
              size="large"
              color="secondary"
              href="https://www.linkedin.com/in/hugo-carnicelli"
              target="_blank"
            >
              <LinkedInIcon fontSize="large" />
            </IconButton>
          </Stack>
        </Slide>
      </ScrollSpy>
    </>
  );
};
