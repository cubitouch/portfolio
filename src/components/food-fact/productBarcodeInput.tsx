import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

import {
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  useTheme,
} from "@mui/material";
import { useState } from "react";

interface Props {
  onChange: (value: string) => void;
}
const ProductBarcodeInput = ({ onChange }: Props) => {
  const theme = useTheme();
  const [barcode, setBarcode] = useState("");
  return (
    <>
      <Paper
        sx={{
          display: "flex",
          padding: theme.spacing(1),
          width: `calc(100% - ${theme.spacing(2)})`,

          position: "absolute",
          bottom: 0,
          gap: theme.spacing(1),
        }}
      >
        <TextField
          id="barcode"
          label="Code bar"
          variant="outlined"
          color="primary"
          value={barcode}
          onChange={(value) => setBarcode(value.currentTarget.value)}
          sx={{
            flex: 1,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton color="inherit" onClick={() => setBarcode("")}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <IconButton color="primary" onClick={() => onChange(barcode)}>
          <SearchIcon />
        </IconButton>
      </Paper>
    </>
  );
};

export default ProductBarcodeInput;
