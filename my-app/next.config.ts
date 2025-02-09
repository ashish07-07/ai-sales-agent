// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   reactStrictMode: true, // Enables React strict mode
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "**", // Allows images from any domain
//       },
//     ],
//     domains: ["*"], // (Optional) Another way to allow any domain
//     unoptimized: false, // Keep optimized image handling enabled
//   },
//   typescript: {
//     ignoreBuildErrors: false, // Ensures TypeScript errors prevent production builds
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enables React strict mode
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false, // Ensures TypeScript errors prevent production builds
  },
};

export default nextConfig;

