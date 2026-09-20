import type { NextConfig } from "next";

const isGithub = process.env.GITHUB_ACTIONS === "true";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isGithub ? "/Portfolio" : "",
};

export default nextConfig;