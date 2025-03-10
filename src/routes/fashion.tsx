import { Box } from "@mui/material";
import MapView from "~/components/fashion/mapView";
import type { Route } from "./+types/fashion";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Men Sustainable Fashion Shops" }];
}
export default function Fashion() {
  return (
    <Box sx={{}}>
      <MapView />
    </Box>
  );
}
