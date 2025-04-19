import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Tab,
  Tabs,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
  barcode?: string;
  onClose: () => void;
}
const ProductDetail = ({ barcode, onClose }: Props) => {
  const theme = useTheme();
  const [product, setProduct] = useState<any>(null);
  const [tab, setTab] = useState("allergens");

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

    if (barcode && !product) {
      fetchProduct();
    } else {
      setProduct(null);
    }
  }, [barcode]);
  return (
    <Dialog open={!!product} onClose={onClose} fullScreen>
      <DialogTitle>
        {product?.brands} - {product?.generic_name_fr}
      </DialogTitle>
      <DialogContent>
        <Tabs
          sx={{ background: theme.palette.primary.main }}
          value={tab}
          onChange={(_, value) => setTab(value)}
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
        <Button onClick={onClose}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDetail;
