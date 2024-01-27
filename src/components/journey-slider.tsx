import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LaptopIcon from "@mui/icons-material/Laptop";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
} from "@mui/material";
import financeImage from "../assets/cards/anne-nygard-x07ELaNFt34-unsplash-min.jpg";
import retailOpticalImage from "../assets/cards/bartosz-sujkowski-0zA84TFRjI8-unsplash-min.jpg";
import blockchainImage from "../assets/cards/drawkit-illustrations-8iIUDnRq87o-unsplash-min.jpg";
import climatetechImage from "../assets/cards/eugene-golovesov-0ElieIojOUk-unsplash-min.jpg";
import insuranceImage from "../assets/cards/gustavo-S-W9vDL5whU-unsplash-min.jpg";
import engineeringImage from "../assets/cards/james-harrison-vpOeXr5wmR4-unsplash-min.jpg";
import gamblingImage from "../assets/cards/jonathan-petersson-W8V3G-Nk8FE-unsplash-min.jpg";
import charitySportImage from "../assets/cards/nii-shu-pHQDyS-k5F0-unsplash-min.jpg";
import legalImage from "../assets/cards/scott-graham-OQMZwNd3ThU-unsplash-min.jpg";
import fintechImage from "../assets/cards/thriday-DV2g6qL39Cs-unsplash-min.jpg";
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
    image: charitySportImage,
  },
  // Grand Optical (Altimate)
  {
    time: "February 2013",
    companyIcon: <BusinessCenterIcon />,
    companyTopology: "Contractor",
    duration: "9 months",
    industry: "Optical Retail",
    technology: "Intranet",
    image: retailOpticalImage,
  },
  // AssurOne Group (Altimate + SoftFluent)
  {
    time: "November 2013",
    companyIcon: <BusinessCenterIcon />,
    companyTopology: "Contractor",
    duration: "1.5 year",
    industry: "Insurance",
    technology: "White Label",
    image: insuranceImage,
  },
  // SoftFluent
  {
    time: "August 2015",
    companyIcon: <LaptopIcon />,
    companyTopology: "Software Editor",
    duration: "1.5 year",
    industry: "Engineering",
    technology: "Microsoft Tech",
    image: engineeringImage,
  },
  // Betclic
  {
    time: "November 2016",
    companyIcon: <LaptopIcon />,
    companyTopology: "Software Editor",
    duration: "1.5 year",
    industry: "Gambling",
    technology: "Web Application",
    image: gamblingImage,
  },
  // Societe Generale
  {
    time: "August 2018",
    companyIcon: <BusinessCenterIcon />,
    companyTopology: "Contractor",
    duration: "1 year",
    industry: "Finance",
    technology: "Reporting",
    image: financeImage,
  },
  // LEAP LEgal Software
  {
    time: "July 2019",
    companyIcon: <LaptopIcon />,
    companyTopology: "Software Editor",
    duration: "1 year",
    industry: "Legal",
    technology: "Marketplace",
    image: legalImage,
  },
  // Crezco
  {
    time: "September 2020",
    companyIcon: <RocketLaunchIcon />,
    companyTopology: "Startup",
    duration: "6 months",
    industry: "Fintech",
    technology: "Open Banking",
    image: fintechImage,
  },
  // Leyline
  {
    time: "March 2021",
    companyIcon: <RocketLaunchIcon />,
    companyTopology: "Startup",
    duration: "4 months",
    industry: "Tech For Good",
    technology: "Blockchain",
    image: blockchainImage,
  },
  // Infogrid
  {
    time: "February 2022",
    companyIcon: <RocketLaunchIcon />,
    companyTopology: "Startup",
    duration: "2 years (present)",
    industry: "Climate Tech",
    technology: "Internet of Things",
    image: climatetechImage,
  },
];

export const JourneySlider = () => {
  const theme = useTheme();
  return (
    <SwiperWrapper
      slideSx={{
        display: "flex",
        alignItems: "center",
      }}
      items={journeyItems.map((item) => (
        <Card
          sx={{
            flex: 1,
            borderTopLeftRadius: theme.spacing(2),
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
                <Typography variant="overline">
                  {item.companyTopology}
                </Typography>
                <Avatar sx={{ backgroundColor: theme.palette.primary.main }}>
                  {item.companyIcon}
                </Avatar>
              </Box>
            </Box>
          </CardContent>
          <CardMedia image={item.image} sx={{ height: 140 }}></CardMedia>
          <CardContent
            sx={{ "&:last-child": { paddingBottom: theme.spacing(2) } }}
          >
            <Box textAlign="right">
              <Typography variant="h6">{item.time}</Typography>
              <Typography variant="overline">{item.duration}</Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    />
  );
};
