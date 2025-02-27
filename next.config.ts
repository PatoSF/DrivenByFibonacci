import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["ferf1mheo22r9ira.public.blob.vercel-storage.com"],
  },
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  }
};

export default nextConfig;
