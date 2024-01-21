import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
  AppBar,
  Box,
  IconButton,
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

import { useState } from "react";
import ScrollSpy from "react-ui-scrollspy";
import Logo from "../assets/logo.svg?react";
import { NAVBAR_HEIGHT } from "../constants";

const HOME_ID = "top";

interface NavBarProps {
  currentSection: string;
}
const NavBar = ({ currentSection }: NavBarProps) => {
  const srollTo = (id: string) => {
    window.scrollTo({
      top: (document.getElementById(id)?.offsetTop ?? 0) - NAVBAR_HEIGHT,
      behavior: "smooth",
    });
  };
  return (
    <AppBar>
      <Toolbar>
        <Stack spacing={1} direction="row" alignItems="center" flex="1">
          <Typography
            variant="h6"
            component="div"
            sx={{ display: { xs: "none", md: "inherit" } }}
          >
            Hi, I'm
          </Typography>
          <Logo fontSize={32} />
          <Box flex="1"></Box>
          <Tabs value={currentSection}>
            {["", "Journey", "Interests", "More"].map((tab) => {
              const id = tab.toLowerCase();
              const value = !!id ? id : HOME_ID;
              return (
                <Tab
                  sx={!id ? { width: 0, minWidth: 0, padding: 0 } : undefined}
                  value={value}
                  key={value}
                  label={tab}
                  data-to-scrollspy-id={value}
                  onClick={() => srollTo(id)}
                />
              );
            })}
          </Tabs>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export const HomePage = () => {
  const theme = useTheme();
  const [currentSection, setCurentSection] = useState(HOME_ID);

  return (
    <>
      <NavBar currentSection={currentSection} />
      <ScrollSpy
        offsetBottom={NAVBAR_HEIGHT}
        scrollThrottle={50}
        onUpdateCallback={(id) => setCurentSection(id)}
      >
        <Slide background={topSlideBackground} dark id={HOME_ID}>
          <Box flex="1" />
          <Typography
            variant="h1"
            color={theme.palette.common.white}
            sx={{
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
          <Typography variant="h3">Coming soon</Typography>
        </Slide>

        <Slide light primary={"My interests"} id="interests">
          {/* * Agility
           * Frontend development
           * Data analysis */}
          <Typography variant="h3">Stay tuned</Typography>
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
