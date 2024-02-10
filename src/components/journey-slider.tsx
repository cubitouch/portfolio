import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LaptopIcon from "@mui/icons-material/Laptop";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import { SwiperWrapper } from "../components/swipper-wrapper";

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

export const JourneySlider = () => {
  const theme = useTheme();
  return (
    <>
      <Box
        gap={{ xs: 3, md: 4 }}
        display="grid"
        gridAutoRows="auto"
        sx={{
          alignSelf: "self-end",
          gridTemplateColumns: "repeat(2, min-content)",
          [theme.breakpoints.up("md")]: {
            gridTemplateColumns: "repeat(4, 1fr)",
          },
          [theme.breakpoints.down("sm")]: {
            alignSelf: "self-start",
          },
        }}
      >
        <Typography variant="h4">
          10+
          <br />
          Industries
        </Typography>
        <Typography variant="h4">
          4<br />
          Publications
        </Typography>
        <Typography variant="h4">
          2<br />
          Countries
        </Typography>
        <Typography variant="h4">
          13
          <br />
          Years
        </Typography>
      </Box>
      <SwiperWrapper
        slideSx={{
          "& .annotation": {
            transform: "none",
            opacity: 1,
            transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
          },
          "&.swiper-slide-prev .annotation": {
            opacity: 0,
            "&.top": {
              transform: "translateY(+100%)",
            },
            "&.bottom": {
              transform: "translateY(-100%)",
            },
          },
        }}
        items={journeyItems.map((item) => (
          <>
            <Box
              className="annotation top"
              sx={{
                display: "flex",
                textAlignLast: "start",
                alignItems: "flex-end",
              }}
            >
              <Box
                sx={{
                  height: 16,
                  width: 39,
                  overflow: "hidden",
                  marginLeft: theme.spacing(3),
                  marginRight: theme.spacing(1),
                  "&::after": {
                    content: "''",
                    backgroundImage: `url(dashed-border-background-light.svg)`,
                    display: "block",
                    height: 17,
                    width: 40,
                  },
                }}
              />
              <Typography
                variant="overline"
                sx={{
                  flex: 1,
                  right: theme.spacing(8),
                  bottom: -24,
                  color: theme.palette.common.white,
                }}
              >
                {item.companyTopology}
              </Typography>
            </Box>
            <Card
              sx={{
                flex: 1,
                borderTopLeftRadius: theme.spacing(1),
                borderTopRightRadius: theme.spacing(1),
                borderBottomLeftRadius: theme.spacing(1),
              }}
            >
              <CardContent
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
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
                    <Avatar
                      sx={{ backgroundColor: theme.palette.primary.main }}
                    >
                      {item.companyIcon}
                    </Avatar>
                  </Box>
                </Box>
              </CardContent>
              <Divider
                sx={{
                  "&::after": {
                    content: "''",
                    backgroundImage: `url(dashed-border-background.svg)`,
                    display: "block",
                    height: "2px",
                    width: "100%",
                  },
                  height: "1px",
                  overflow: "hidden",
                  border: "none",
                }}
              />
              <CardContent sx={{ position: "relative" }}>
                <Box textAlign="right">
                  <Typography variant="h6">{item.time}</Typography>
                </Box>
              </CardContent>
            </Card>
            <Box
              className="annotation bottom"
              sx={{
                display: "flex",
                textAlignLast: "end",
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  flex: 1,
                  right: theme.spacing(8),
                  bottom: -24,
                  color: theme.palette.common.white,
                }}
              >
                {item.duration}
              </Typography>
              <Box
                sx={{
                  height: 16,
                  width: 39,
                  overflow: "hidden",
                  marginLeft: theme.spacing(1),
                  marginRight: theme.spacing(3),
                  "&::after": {
                    content: "''",
                    backgroundImage: `url(dashed-border-background-light.svg)`,
                    display: "block",
                    height: 17,
                    width: 40,
                    marginTop: "-1px",
                    marginLeft: "-1px",
                  },
                }}
              />
            </Box>
          </>
        ))}
      />
    </>
  );
};
