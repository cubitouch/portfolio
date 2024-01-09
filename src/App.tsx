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
import { Slider } from "./components/slider";
import { Logo } from "./logo";
import { lightTheme } from "./theme";

function App() {
  const theme = useTheme();
  return (
    <ThemeProvider theme={lightTheme}>
      <Slider
        slides={[
          <>
            <Logo />
            <Typography variant="h1">Hi, I'm Hugo</Typography>
          </>,
          <>
            <Typography variant="h1">My journey</Typography>
            <Typography variant="h3">Coming soon</Typography>
          </>,

          <>
            <Typography variant="h1">My interests</Typography>
            {/* * Agility
             * Frontend development
             * Data analysis */}
            <Typography variant="h3">Stay tuned</Typography>
          </>,
          <>
            <Typography variant="h1">What else?</Typography>
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
          </>,
        ]}
      />
    </ThemeProvider>
  );
}

export default App;
