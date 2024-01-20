/// <reference types="vite-plugin-svgr/client" />
import { ThemeProvider } from "@mui/material";
import "./App.css";
import { HomePage } from "./pages/home";
import { lightTheme } from "./theme";


function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
