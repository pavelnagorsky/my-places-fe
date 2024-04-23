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
    GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    EMAIL: process.env.NEXT_PUBLIC_EMAIL,
    DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
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
