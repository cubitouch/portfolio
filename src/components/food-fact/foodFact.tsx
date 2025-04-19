import CropFreeIcon from "@mui/icons-material/CropFree";
import { BarcodeScanner } from "react-barcode-scanner";
import "react-barcode-scanner/polyfill";

import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";
import { useCallback, useState } from "react";
import ProductDetail from "./productDetail";

/// TODOs:
///  - normalize `e-XXX` if a name is available in the taxinomy
///  - allow selection of risky ingredients and change result color for better UX

const FoodFact = () => {
  const [barcode, setBarcode] = useState("");
  const [activeBarcode, setActiveBarcode] = useState("");

  const onCapture = useCallback(
    (codes: any[]) => {
      console.log(codes);
      //   alert(codes[0].rawValue);
      setActiveBarcode(codes[0].rawValue);
    },
    [setActiveBarcode]
  );

  return (
    <>
      <Box sx={{ height: "100vh" }}>
        {!activeBarcode && (
          <BarcodeScanner
            options={{ formats: ["ean_13"], delay: 500 }}
            onCapture={onCapture}
            paused={!!activeBarcode}
          />
        )}
      </Box>

      <FormControl
        variant="standard"
        fullWidth
        sx={{
          position: "absolute",
          bottom: 0,
          backgroundColor: "white",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <InputLabel htmlFor="input-with-icon-adornment">Code bar</InputLabel>
          <Input
            id="input-with-icon-adornment"
            sx={{ width: "100%" }}
            onChange={(value) => setBarcode(value.currentTarget.value)}
          />
        </Box>
        <Button
          startIcon={<CropFreeIcon />}
          sx={{ flex: 0 }}
          onClick={() => setActiveBarcode(barcode)}
        >
          Go
        </Button>
      </FormControl>

      <ProductDetail
        barcode={activeBarcode}
        onClose={() => setActiveBarcode("")}
      />
    </>
  );
};

export default FoodFact;
