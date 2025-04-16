// import { BarcodeScanner } from "react-barcode-scanner";
// import "react-barcode-scanner/polyfill";
import CropFreeIcon from "@mui/icons-material/CropFree";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  List,
  ListItem,
  Tab,
  Tabs,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";

const FoodFact = () => {
  const theme = useTheme();
  const [BarcodeScanner, setBarcodeScanner] = useState<any>(null);
  useEffect(() => {
    console.log("loading `react-barcode-scanner`");
    import("react-barcode-scanner").then((mod) => {
      console.log(mod);
      setBarcodeScanner(() => mod.BarcodeScanner);
    });
  }, []);

  const [barcode, setBarcode] = useState("");
  const [activeBarcode, setActiveBarcode] = useState("");
  const [product, setProduct] = useState<any>(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://world.openfoodfacts.org/api/v3/product/${barcode}.json`
        );
        const data = await res.json();
        setProduct(data.product);
      } catch (err) {
        console.error(err);
      }
    };

    if (activeBarcode) {
      fetchProduct();
    } else {
      setProduct(null);
    }
  }, [activeBarcode]);

  const [tab, setTab] = useState("allergens");
  return (
    <>
      <Box sx={{ height: "100vh" }}>
        {BarcodeScanner ? (
          <BarcodeScanner onScan={(code: any) => setActiveBarcode(code)} />
        ) : (
          <div>Loading scanner...</div>
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

      <Dialog open={!!product} onClose={() => setActiveBarcode("")} fullScreen>
        <DialogTitle id="alert-dialog-title">
          {product?.brands} - {product?.generic_name_fr}
        </DialogTitle>
        <DialogContent>
          <Tabs
            sx={{ background: theme.palette.primary.main }}
            value={tab}
            onChange={(_, value) => setTab(value)}
            aria-label="basic tabs example"
          >
            <Tab label="Allergènes" value="allergens" />
            <Tab label="Ingrédients" value="ingredients" />
          </Tabs>
          <List>
            {tab === "allergens" &&
              product?.allergens_imported
                .split(",")
                .map((allergen: string) => <ListItem> {allergen}</ListItem>)}
            {tab === "ingredients" &&
              product?.ingredients.map((ingredient: any) => (
                <ListItem> {ingredient.text}</ListItem>
              ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setActiveBarcode("")}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FoodFact;
