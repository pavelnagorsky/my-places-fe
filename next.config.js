const { i18n } = require("./next-i18next.config");
const redirectsList = require("./redirects");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "storage.googleapis.com",
      "storage.googleapis.com/my-places-bucket-1/images/",
    ],
  },
  env: {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    EMAIL: process.env.EMAIL,
    DOMAIN: process.env.DOMAIN,
  },
  async redirects() {
    return redirectsList;
  },
  i18n,
  compiler: {
    styledComponents: true,
  },
  transpilePackages: ["mui-tel-input"],
};

module.exports = nextConfig;
