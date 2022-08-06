const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    // Add SVGR:
    // https://react-svgr.com/docs/next/

    // Check what's different with the files under the icons folder:
    // https://react-svgr.com/docs/options/#icon

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      include: [path.resolve(__dirname, "public/images/icons")],
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    });

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      exclude: [path.resolve(__dirname, "public/images/icons")],
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
