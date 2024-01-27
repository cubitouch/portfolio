import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { useState } from "react";
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
