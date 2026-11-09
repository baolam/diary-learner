import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/diary-learner",
  assetPrefix: "/diary-learner/",
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
