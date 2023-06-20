const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  },
  i18n,
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
