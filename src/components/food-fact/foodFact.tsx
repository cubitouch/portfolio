import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import ProductBarcodeInput from "./productBarcodeInput";
import ProductDetail from "./productDetail";
import ProductScanner from "./productScanner";
import useStore from "./useStore";

/// TODOs:
///  - normalize `e-XXX` if a name is available in the taxinomy
///  - allow selection of risky ingredients and change result color for better UX

const useTaxinomy = () => {
  const [storeData] = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllergens = async () => {
      try {
        const res = await fetch(
          `https://world.openfoodfacts.org/data/taxonomies/allergens.json`
        );
        const data = await res.json();
        storeData("allergens", data);
      } catch (err) {
        console.error(err);
      }
    };
    const fetchIngredients = async () => {
      try {
        const res = await fetch(
          `https://world.openfoodfacts.org/data/taxonomies/ingredients.json`
        );
        const data = await res.json();
        storeData("ingredients", data);
      } catch (err) {
        console.error(err);
      }
    };

    if (isLoading) {
      Promise.all([fetchAllergens(), fetchIngredients()]).then(() => {
        setIsLoading(false);
      });
    }
  }, [isLoading]);

  return [isLoading /*, allergens, ingredients*/];
};

const FoodFact = () => {
  const theme = useTheme();
  const [isLoading] = useTaxinomy();
  const [activeBarcode, setActiveBarcode] = useState("");

  if (isLoading) {
    return (
      <>
        <Box
          sx={{
            height: "100dvh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="primary" />
          <Typography
            variant="subtitle1"
            color="primary"
            sx={{ padding: theme.spacing(2) }}
          >
            Chargement des Ingrédients
          </Typography>
        </Box>
      </>
    );
  }
  return (
    <>
      <Box sx={{ height: "100dvh", overflow: "hidden" }}>
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
