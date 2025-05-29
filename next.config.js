const { i18n } = require("./next-i18next.config");
const redirectsList = require("./redirects");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.googleapis.com",
        port: "",
      },
    ],
  },
  async redirects() {
    return redirectsList;
  },
  i18n,
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.resolve.extensionAlias = {
      ".js": [".js", ".ts", ".tsx"],
    };
    return config;
  },
  transpilePackages: ["mui-tel-input"],
};

module.exports = nextConfig;
