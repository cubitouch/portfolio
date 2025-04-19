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
import useStore from "./useStore";

interface Props {
  barcode?: string;
  onClose: () => void;
}
const ProductDetail = ({ barcode, onClose }: Props) => {
  const theme = useTheme();

  const [_, translate] = useStore();
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
      <DialogTitle noWrap>
        {product?.brands} - {product?.generic_name_fr}
      </DialogTitle>
      <Tabs
        sx={{ background: theme.palette.primary.main, height: 48 }}
        value={tab}
        onChange={(_, value) => setTab(value)}
      >
        <Tab
          label={`Allergènes (${product?.allergens_tags.length})`}
          value="allergens"
        />
        <Tab
          label={`Ingrédients (${product?.ingredients_tags.length})`}
          value="ingredients"
        />
      </Tabs>
      <DialogContent dividers sx={{ padding: 0 }}>
        <List disablePadding>
          {tab === "allergens" &&
            product?.allergens_tags.map((allergen: string) => (
              <ListItem key={allergen}>
                {translate("allergens", allergen)}
              </ListItem>
            ))}
          {tab === "ingredients" &&
            product?.ingredients_tags.map((ingredient: string) => (
              <ListItem key={ingredient}>
                {translate("ingredients", ingredient)}
              </ListItem>
            ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Retour</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDetail;
