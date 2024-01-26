import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaptopIcon from "@mui/icons-material/Laptop";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import ScrollSpy from "react-ui-scrollspy";
import topSlideBackground from "../assets/blanca-paloma-sanchez-AvfTRF9QINM-unsplash-min.jpg";
import { HintButton } from "../components/hint-button";
import { NavBar } from "../components/nav-bar";
import { Slide } from "../components/slide";
import { SwiperWrapper } from "../components/swipper-wrapper";
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

  const journeyItems = [
    // FLAG Informatique
    {
      time: "April 2010",
      companyIcon: <LaptopIcon />,
      companyTopology: "Software Editor",
      duration: "3 years",
      industry: "Charity",
      technology: "Intranet",
    },
    // Grand Optical (Altimate)
    {
      time: "February 2013",
      companyIcon: <BusinessCenterIcon />,
      companyTopology: "Contractor",
      duration: "9 months",
      industry: "Optical Retail",
      technology: "Intranet",
    },
    // AssurOne Group (Altimate + SoftFluent)
    {
      time: "November 2013",
      companyIcon: <BusinessCenterIcon />,
      companyTopology: "Contractor",
      duration: "1.5 year",
      industry: "Insurance",
      technology: "White Label",
    },
    // SoftFluent
    {
      time: "August 2015",
      companyIcon: <LaptopIcon />,
      companyTopology: "Software Editor",
      duration: "1.5 year",
      industry: "Engineering",
      technology: "Microsoft Tech",
    },
    // Betclic
    {
      time: "November 2016",
      companyIcon: <LaptopIcon />,
      companyTopology: "Software Editor",
      duration: "1.5 year",
      industry: "Gambling",
      technology: "Web Application",
    },
    // Societe Generale
    {
      time: "August 2018",
      companyIcon: <BusinessCenterIcon />,
      companyTopology: "Contractor",
      duration: "1 year",
      industry: "Finance",
      technology: "Reporting",
    },
    // LEAP LEgal Software
    {
      time: "July 2019",
      companyIcon: <LaptopIcon />,
      companyTopology: "Software Editor",
      duration: "1 year",
      industry: "Legal",
      technology: "Marketplace",
    },
    // Crezco
    {
      time: "September 2020",
      companyIcon: <RocketLaunchIcon />,
      companyTopology: "Startup",
      duration: "6 months",
      industry: "Fintech",
      technology: "Open Banking",
    },
    // Leyline
    {
      time: "March 2021",
      companyIcon: <RocketLaunchIcon />,
      companyTopology: "Startup",
      duration: "4 months",
      industry: "Tech For Good",
      technology: "Blockchain",
    },
    // Infogrid
    {
      time: "February 2022",
      companyIcon: <RocketLaunchIcon />,
      companyTopology: "Startup",
      duration: "2 years (present)",
      industry: "Climate Tech",
      technology: "Internet of Things",
    },
  ];
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
          <SwiperWrapper
            slideSx={
              {
                // "&:nth-child(odd) .MuiCard-root": {
                //   borderBottomLeftRadius: theme.spacing(2),
                //   borderBottomRightRadius: theme.spacing(2),
                // },
                // "&:nth-child(even) .MuiCard-root": {
                //   borderTopLeftRadius: theme.spacing(2),
                //   borderTopRightRadius: theme.spacing(2),
                // },
              }
            }
            items={journeyItems.map((item) => (
              <Card
                sx={{
                  flex: 1,
                }}
              >
                <CardContent>
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      <Typography variant="h4">{item.industry}</Typography>
                      <Typography variant="h5">{item.technology}</Typography>
                    </Box>
                    <Box>
                      <Box
                        display="flex"
                        flexDirection="row"
                        gap={1}
                        alignItems="center"
                      >
                        <Typography variant="overline">
                          {item.companyTopology}
                        </Typography>
                        <Avatar
                          sx={{ backgroundColor: theme.palette.primary.main }}
                        >
                          {item.companyIcon}
                        </Avatar>
                      </Box>
                    </Box>
                  </Box>
                  <Box textAlign="right">
                    <Typography variant="h6">{item.time}</Typography>
                    <Typography variant="overline">{item.duration}</Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          />
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
