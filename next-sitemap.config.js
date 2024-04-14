/** @type {import('next-sitemap').IConfig} */
const { Environment } = require("./src/shared/Environment");
module.exports = {
  siteUrl: `https://${Environment.domain}`,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  exclude: ["**/404", "**/auth/**", "**/moderation/**", "**/administration/**"],
  alternateRefs: [
    {
      href: "https://my-places.by/en",
      hreflang: "en",
    },
    {
      href: "https://my-places.by/be",
      hreflang: "be",
    },
  ],
};
