import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
  Box,
  IconButton,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import "chart.js/auto";
import { TypeAnimation } from "react-type-animation";
import topSlideBackground from "../assets/blanca-paloma-sanchez-AvfTRF9QINM-unsplash-min.jpg";
import { HintButton } from "../components/home/hint-button";
import { JourneySlider } from "../components/home/journey-slider";
import { RadarChart } from "../components/home/radar-chart";
import { Slide } from "../components/home/slide";
import { NavBar } from "../components/nav-bar";
import { NAVBAR_HEIGHT } from "../constants";
import type { Route } from "./+types/home";

export const HOME_ID = "top";

const HomePage = () => {
  const theme = useTheme();
  const scrollTo = (id: string) => {
    window.scrollTo({
      top: (document.getElementById(id)?.offsetTop ?? 0) - NAVBAR_HEIGHT,
      behavior: "smooth",
    });
  };

  return (
    <>
      <NavBar scrollTo={scrollTo} defaultSectionId={HOME_ID} />
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
        <RadarChart />
      </Slide>

      <Slide dark primary={"What else?"} id="more">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            flexDirection: "column",
          }}
        >
          <Typography component="div" variant="h4" align="center">
            Check out my new data app{" "}
            <Link
              href="https://energy-data-exploration.vercel.app"
              target="_blank"
            >
              here
            </Link>{" "}
            🎉
          </Typography>
          <Typography variant="subtitle1" align="center">
            Built to visually explore French energy open datasets!
          </Typography>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="right">
          <Stack direction="row" spacing={2}>
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
        </Box>
      </Slide>
    </>
  );
};

export function meta({}: Route.MetaArgs) {
  return [{ title: "Hugo Carnicelli - Software Engineer" }];
}
export default function Home() {
  return <HomePage />;
}
