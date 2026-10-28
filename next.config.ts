import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

// Markdown-driven country sections: every content/sites/<code>/_site.md is served at /<code>
const SITES_DIR = path.join(process.cwd(), "content/sites");
const countrySites = fs.existsSync(SITES_DIR)
  ? fs
      .readdirSync(SITES_DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory() && fs.existsSync(path.join(SITES_DIR, d.name, "_site.md")))
      .map((d) => d.name)
  : [];

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Low-RAM optimizations to prevent OOM build failure and server crashes
  experimental: {
    cpus: 2,
    memoryBasedWorkersCount: true,
    turbopackMemoryLimit: 2048 * 1024 * 1024,
    webpackMemoryOptimizations: true,
    parallelServerCompiles: false,
    parallelServerBuildTraces: false,
  },
  turbopack: {
    root: process.cwd(),
  },
  allowedDevOrigins: [
    "http://192.168.1.4:3000",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",

      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Vary",
            value: "Accept",
          },
          {
            key: "Content-Signal",
            value: "ai-train=no, search=yes, ai-input=yes",
          },
        ],
      },
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value: '</llms.txt>; rel="service-desc"',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: countrySites.flatMap((code) => [
        { source: `/${code}`, destination: `/sites/${code}` },
        { source: `/${code}/:path*`, destination: `/sites/${code}/:path*` },
      ]),
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    return [
      // Country sections are only reachable through their public prefix (see rewrites)
      {
        source: "/sites/:path*",
        destination: "/:path*",
        permanent: true,
      },
      // German guides hub lives at /de/guides; /de/ratgeber was a duplicate route
      {
        source: "/de/ratgeber",
        destination: "/de/guides",
        permanent: true,
      },
      {
        source: "/de/ratgeber/:slug",
        destination: "/de/guides/:slug",
        permanent: true,
      },
      // Duplicate ICAO pages consolidated into one canonical page
      {
        source: "/icao-standard-photo",
        destination: "/icao-standard-photograph",
        permanent: true,
      },
      {
        source: "/icao-compliant-photo",
        destination: "/icao-standard-photograph",
        permanent: true,
      },
      // Checker subpath redirects to canonical routes
      {
        source: "/visa-photo-validator/australian-passport-photo-checker",
        destination: "/australian-passport-photo-checker",
        permanent: true,
      },
      {
        source: "/visa-photo-validator/diversity-visa-lottery-photo-checker",
        destination: "/diversity-visa-lottery-photo-checker",
        permanent: true,
      },
      {
        source: "/visa-photo-validator/passport-photo-checker",
        destination: "/passport-photo-checker",
        permanent: true,
      },
      {
        source: "/visa-photo-validator/online-passport-photo-checker",
        destination: "/passport-photo-checker",
        permanent: true,
      },
      // Consolidated: same search intent as /passport-photo-checker
      {
        source: "/online-passport-photo-checker",
        destination: "/passport-photo-checker",
        permanent: true,
      },
      // Normalize ICAO slashes
      {
        source: "/icao-/-eu-visa-photo-editor",
        destination: "/icao-visa-photo-editor",
        permanent: true,
      },
      {
        source: "/icao-/-eu-passport-photo-editor",
        destination: "/icao-passport-photo-editor",
        permanent: true,
      },
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
      // Legacy American photo pages -> /us-passport-photo-editor
      {
        source: "/photo-for-american-visa",
        destination: "/us-passport-photo-editor",
        permanent: true,
      },
      {
        source: "/america-passport-photo",
        destination: "/us-passport-photo-editor",
        permanent: true,
      },
      {
        source: "/america-passport-photo-size",
        destination: "/us-passport-photo-editor",
        permanent: true,
      },
      {
        source: "/america-passport-size",
        destination: "/us-passport-photo-editor",
        permanent: true,
      },
      {
        source: "/america-passport-size-photo",
        destination: "/us-passport-photo-editor",
        permanent: true,
      },
      {
        source: "/america-visa-size-photo",
        destination: "/us-passport-photo-editor",
        permanent: true,
      },
      {
        source: "/america-visa-photo",
        destination: "/us-passport-photo-editor",
        permanent: true,
      },
      {
        source: "/america-visa-photo-size",
        destination: "/us-passport-photo-editor",
        permanent: true,
      },
      {
        source: "/america-visa-size",
        destination: "/us-passport-photo-editor",
        permanent: true,
      },
      {
        source: "/american-passport-pic",
        destination: "/us-passport-photo-editor",
        permanent: true,
      },
      {
        source: "/american-passport-picture-size",
        destination: "/us-passport-photo-editor",
        permanent: true,
      },
      {
        source: "/american-passport-photo",
        destination: "/us-passport-photo-editor",
        permanent: true,
      },
      {
        source: "/american-passport-photo-size",
        destination: "/us-passport-photo-editor",
        permanent: true,
      },
      {
        source: "/american-passport-size",
        destination: "/us-passport-photo-editor",
        permanent: true,
      },
      {
        source: "/american-passport-size-photo",
        destination: "/us-passport-photo-editor",
        permanent: true,
      },
      {
        source: "/american-visa-photo",
        destination: "/us-passport-photo-editor",
        permanent: true,
      },
      {
        source: "/american-visa-size-photo",
        destination: "/us-passport-photo-editor",
        permanent: true,
      },
      {
        source: "/american-visa-picture-size",
        destination: "/us-passport-photo-editor",
        permanent: true,
      },
      // DMV and Driver's License Consolidation -> /usa-driver-license-photo-editor
     
      {
        source: "/usa-dmv-photo",
        destination: "/usa-driver-license-photo-editor",
        permanent: true,
      },
      {
        source: "/dmv-photo-editor",
        destination: "/usa-driver-license-photo-editor",
        permanent: true,
      },
      {
        source: "/dmv-picture",
        destination: "/usa-driver-license-photo-editor",
        permanent: true,
      },
      // Singapore pixel dimension consolidation
      {
        source: "/singapore-passport-photo-pixels",
        destination: "/resize-passport-photo-singapore",
        permanent: true,
      },
      // Programmatic Singapore passport page duplicated the hand-built hub's intent ("Singapore passport photo maker")
      {
        source: "/singapore-passport-photo-editor",
        destination: "/resize-passport-photo-singapore",
        permanent: true,
      },
      // Singapore passport photo hub retired, consolidated into the resize tool
      {
        source: "/singapore-passport-photo",
        destination: "/resize-passport-photo-singapore",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
