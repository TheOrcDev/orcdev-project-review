import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // TypeScript 7 has no JavaScript compiler API; Next typechecks via `tsc`.
  experimental: {
    useTypeScriptCli: true,
  },
};

export default nextConfig;
