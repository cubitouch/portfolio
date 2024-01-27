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
              "&::before": {
                content: "''",
                display: "inline-block",
                height: theme.spacing(2),
                width: theme.spacing(4),
                marginLeft: theme.spacing(3),
                marginRight: theme.spacing(1),
                borderTop: `1px dashed ${theme.palette.secondary.main}`,
                borderLeft: `1px dashed ${theme.palette.secondary.main}`,
              },
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
                  <Avatar sx={{ backgroundColor: theme.palette.primary.main }}>
                    {item.companyIcon}
                  </Avatar>
                </Box>
              </Box>
            </CardContent>
            <Divider sx={{ borderStyle: "dashed" }} />
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
              "&::after": {
                content: "''",
                display: "inline-block",
                height: theme.spacing(2),
                width: theme.spacing(4),
                marginLeft: theme.spacing(1),
                marginRight: theme.spacing(3),
                borderBottom: `1px dashed ${theme.palette.secondary.main}`,
                borderRight: `1px dashed ${theme.palette.secondary.main}`,
              },
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
          </Box>
        </>
      ))}
    />
  );
};
