import CropFreeIcon from "@mui/icons-material/CropFree";

import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";
import { useState } from "react";

interface Props {
  onChange: (value: string) => void;
}
const ProductBarcodeInput = ({ onChange }: Props) => {
  const [barcode, setBarcode] = useState("");
  return (
    <>
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
          onClick={() => onChange(barcode)}
        >
          Go
        </Button>
      </FormControl>
    </>
  );
};

export default ProductBarcodeInput;
