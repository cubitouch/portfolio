import { Box } from "@mui/material";
import { useState } from "react";
import ProductBarcodeInput from "./productBarcodeInput";
import ProductDetail from "./productDetail";
import ProductScanner from "./productScanner";

/// TODOs:
///  - normalize `e-XXX` if a name is available in the taxinomy
///  - allow selection of risky ingredients and change result color for better UX

const FoodFact = () => {
  const [activeBarcode, setActiveBarcode] = useState("");

  return (
    <>
      <Box sx={{ height: "100vh" }}>
        <ProductScanner
          barcode={activeBarcode}
          onChange={(value) => setActiveBarcode(value)}
        />
      </Box>

      <ProductBarcodeInput onChange={(value) => setActiveBarcode(value)} />

      <ProductDetail
        barcode={activeBarcode}
        onClose={() => setActiveBarcode("")}
      />
    </>
  );
};

export default FoodFact;
