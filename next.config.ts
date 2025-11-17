import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: "/Portfolio",
  assetPrefix: "https://2hangz.github.io/Portfolio/",
};

export default nextConfig;
