import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
  AppBar,
  Box,
  Fab,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { TypeAnimation } from "react-type-animation";
import topSlideBackground from "../assets/blanca-paloma-sanchez-AvfTRF9QINM-unsplash-min.jpg";
import { Slide } from "../components/slide";

import ScrollSpy from "react-ui-scrollspy";
import Logo from "../assets/logo.svg?react";
const NavBar = () => {
  const srollTo = (id: string) => {
    window.scrollTo({
      top: (document.getElementById(id)?.offsetTop ?? 0) - 64,
      behavior: "smooth",
    });
  };
  return (
    <AppBar>
      <Toolbar>
        <Stack spacing={1} direction="row" alignItems="center" flex="1">
          <Logo fontSize={32} />
          <Typography variant="h6" component="div">
            Hi, I'm Hugo
          </Typography>
          <Box flex="1"></Box>
          <Tabs value={false}>
            {["Journey", "Interests", "More"].map((tab) => (
              <Tab
                key={tab.toLowerCase()}
                label={tab}
                data-to-scrollspy-id={tab.toLowerCase()}
                onClick={() => srollTo(tab.toLowerCase())}
              />
            ))}
          </Tabs>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export const HomePage = () => {
  const theme = useTheme();
  return (
    <>
      <NavBar />
      <ScrollSpy activeClass="Mui-selected" scrollThrottle={50}>
        <Slide background={topSlideBackground} dark>
          <Box flex="1" />
          <Typography variant="h1">
            <TypeAnimation
              speed={40}
              sequence={[
                "I'm a Software Engineer",
                "I'm a Climate Tech actor",
                "I'm an Agilist",
                "I'm a Design lover",
                "I'm a DevOps enthusiast",
              ].flatMap((item) => [item, 2000])}
              cursor={true}
              repeat={Infinity}
            />
          </Typography>
        </Slide>

        <Slide dark primary={"My journey"} id="journey">
          <Typography variant="h3">Coming soon</Typography>
        </Slide>

        <Slide light primary={"My interests"} id="interests">
          {/* * Agility
           * Frontend development
           * Data analysis */}
          <Typography variant="h3">Stay tuned</Typography>
        </Slide>

        <Slide dark primary={"What else?"} id="more">
          <Stack direction="row" justifyContent="space-around">
            <Box>
              <Fab
                aria-label="GitHub repository"
                size="large"
                target="_blank"
                href="https://github.com/cubitouch/portfolio"
                sx={{ marginBottom: theme.spacing(1) }}
              >
                <GitHubIcon />
              </Fab>
              <Typography variant="h5">How I've built this</Typography>
            </Box>
            <Box>
              <Fab
                aria-label="LinkedIn profile"
                size="large"
                target="_blank"
                href="https://www.linkedin.com/in/hugo-carnicelli/"
                sx={{ marginBottom: theme.spacing(1) }}
              >
                <LinkedInIcon />
              </Fab>
              <Typography variant="h5">How to reach me</Typography>
            </Box>
          </Stack>
        </Slide>
      </ScrollSpy>
    </>
  );
};
