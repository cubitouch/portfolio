import { Box } from "@mui/material";
import FoodFact from "~/components/food-fact/foodFact";
import type { Route } from "./+types/foodFact";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Food Fact (allergies)" }];
}
export default function Fashion() {
  return (
    <Box sx={{}}>
      <FoodFact />
    </Box>
  );
}
