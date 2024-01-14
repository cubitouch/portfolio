import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
  Box,
  Fab,
  Stack,
  ThemeProvider,
  Typography,
  useTheme,
} from "@mui/material";
import { TypeAnimation } from "react-type-animation";
import "./App.css";
import topSlideBackground from "./assets/lukas-blazek-EWDvHNNfUmQ-unsplash-min.jpg";
import { Slide } from "./components/slide";
import { lightTheme } from "./theme";

function App() {
  const theme = useTheme();
  return (
    <ThemeProvider theme={lightTheme}>
      <Slide primary={"Hi, I'm Hugo"} logo background={topSlideBackground}>
        <Typography variant="h1">
          <TypeAnimation
            speed={40}
            sequence={[
              "I'm a Software Engineer",
              "I'm an Agilist",
              "I'm a Frontend Developer",
              "I'm a Data Analyst",
              "I'm a Design lover",
              "I'm a DevOps enthusiast",
            ].flatMap((item) => [item, 2000])}
            cursor={true}
            repeat={Infinity}
          />
        </Typography>
        <Fab
          size="large"
          color="primary"
          sx={{
            position: "absolute",
            bottom: theme.spacing(8),
            right: theme.spacing(8),
          }}
          onClick={() =>
            scrollBy({
              behavior: "smooth",
              top: window.innerHeight,
            })
          }
        >
          <ExpandMoreIcon />
        </Fab>
      </Slide>

      <Slide dark primary={"My journey"}>
        <Typography variant="h3">Coming soon</Typography>
      </Slide>

      <Slide light primary={"My interests"}>
        {/* * Agility
         * Frontend development
         * Data analysis */}
        <Typography variant="h3">Stay tuned</Typography>
      </Slide>

      <Slide dark primary={"What else?"}>
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
    </ThemeProvider>
  );
}

export default App;
