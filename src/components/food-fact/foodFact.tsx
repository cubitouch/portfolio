import CropFreeIcon from "@mui/icons-material/CropFree";
import { BarcodeScanner } from "react-barcode-scanner";
import "react-barcode-scanner/polyfill";

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
  const [barcode, setBarcode] = useState("");
  const [activeBarcode, setActiveBarcode] = useState("");
  const [product, setProduct] = useState<any>(null);
  const [tab, setTab] = useState("allergens");
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://world.openfoodfacts.org/api/v3/product/${activeBarcode}.json`
        );
        const data = await res.json();
        setProduct(data.product);
      } catch (err) {
        console.error(err);
      }
    };

    if (activeBarcode && !product) {
      fetchProduct();
    } else {
      setProduct(null);
    }
  }, [activeBarcode]);

  return (
    <>
      <Box sx={{ height: "100vh" }}>
        {!activeBarcode && (
          <BarcodeScanner
            options={{ formats: ["ean_13"], delay: 500 }}
            onCapture={(codes: any[]) => {
              console.log(codes);
              alert(codes[0].rawValue);
              setActiveBarcode(codes[0].rawValue);
            }}
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
              product?.allergens_tags.map((allergen: string) => (
                <ListItem key={allergen}>{allergen.substring(3)}</ListItem>
              ))}
            {tab === "ingredients" &&
              product?.ingredients_tags.map((ingredient: string) => (
                <ListItem key={ingredient}>{ingredient.substring(3)}</ListItem>
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
