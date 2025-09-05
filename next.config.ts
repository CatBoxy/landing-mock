import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "72.60.58.137",
        port: "",
        pathname: "/api/notes/image/**"
      }
    ]
  }
};

export default nextConfig;
