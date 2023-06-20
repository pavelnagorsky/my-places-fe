const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  i18n,
  compiler: {
    styledComponents: true
  }
}

module.exports = nextConfig
