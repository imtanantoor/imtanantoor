import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "main.d34wwwwm8ixeus.amplifyapp.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
        pathname: "/**",
      },
       // Strapi Cloud media (PRODUCTION)
       {
        protocol: "https",
        hostname: "delicate-duck-17a40e310f.media.strapiapp.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
