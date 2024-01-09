import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Box, ThemeProvider } from "@mui/material";
import { lightTheme } from "../theme";

interface SlideProps {
  children: React.ReactNode;
  isFirst?: boolean;
}
export const Slide = ({ children, isFirst }: SlideProps) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Box
        sx={{
          width: "100vw",
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          flex="1"
          justifyContent="center"
        >
          {children}
        </Box>
        {isFirst && (
          <Box
            sx={{
              "& svg": {
                fontSize: 40,
              },
            }}
          >
            <ArrowDropDownIcon />
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};
