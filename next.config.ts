import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // TypeScript 7 has no JavaScript compiler API; Next typechecks via `tsc`.
  experimental: {
    useTypeScriptCli: true,
  },
  turbopack: {
    resolveAlias: {
      "@better-auth/kysely-adapter": "./stubs/empty-kysely-adapter.mjs",
    },
  },
};

export default nextConfig;
