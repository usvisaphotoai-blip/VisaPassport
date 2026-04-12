import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: [
    "http://192.168.1.4:3000",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/ddxu2wqfm/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      // Normalize United States -> US
      {
        source: "/united-states-passport-photo-editor",
        destination: "/us-passport-photo-editor",
        permanent: true,
      },
      {
        source: "/united-states-visa-photo-editor",
        destination: "/us-visa-photo-editor",
        permanent: true,
      },
      // Visa silo to root consolidation (Catch-all)
      {
        source: "/visa-photo/:slug",
        destination: "/:slug",
        permanent: true,
      },
      // Silo legacy cleanup
      {
        source: "/photo/:slug",
        destination: "/:slug",
        permanent: true,
      },
      // Global pattern cleanup: *-photo -> *-photo-editor
      {
        source: "/us-passport-photo",
        destination: "/us-passport-photo-editor",
        permanent: true,
      },
      {
        source: "/us-visa-photo",
        destination: "/us-visa-photo-editor",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
