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
import "./App.css";
import { Slide } from "./components/slide";
import { lightTheme } from "./theme";
import topSlideBackground from "./assets/lukas-blazek-EWDvHNNfUmQ-unsplash-min.jpg";

function App() {
  const theme = useTheme();
  return (
    <ThemeProvider theme={lightTheme}>
      <Slide primary={"Hi, I'm Hugo"} logo background={topSlideBackground}>
        <Typography variant="h2"></Typography>
        <Typography variant="h1">I'm a Software Engineer</Typography>
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
