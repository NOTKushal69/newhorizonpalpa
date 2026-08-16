import path from "node:path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray lockfile in the parent directory makes Turbopack guess the wrong
  // workspace root; pin it to this project.
  turbopack: {
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
