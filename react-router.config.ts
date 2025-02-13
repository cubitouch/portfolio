import type { Config } from "@react-router/dev/config";

export default {
  // all static route paths
  // (no dynamic segments like "/post/:slug")
  // prerender: true,
  ssr: false,
  // not `app`
  appDirectory: "src",
} satisfies Config;
