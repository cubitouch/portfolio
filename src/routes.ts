import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/fashion", "routes/fashion.tsx"),
  route("/gmail-footprint", "routes/gmailFootprint.tsx"),
] satisfies RouteConfig;
