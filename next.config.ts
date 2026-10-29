import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: "",
  eslint: { ignoreDuringBuilds: true },
};
export default nextConfig;
