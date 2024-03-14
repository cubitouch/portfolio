/// <reference types="vite-plugin-svgr/client" />
import { ThemeProvider } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/home";
import { lightTheme } from "./theme";
import { ParisEnergyPerformanceDraftAnalysis } from "./pages/paris-energy-performance-draft-analysis";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/paris-energy-performance-draft-analysis",
      element: <ParisEnergyPerformanceDraftAnalysis />,
    },
  ]);
  return (
    <ThemeProvider theme={lightTheme}>
      <RouterProvider router={router} />      
    </ThemeProvider>
  );
}

export default App;
