/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: `https://my-places.by`,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: ["https://my-places.by/server-sitemap-index.xml"],
  },
  exclude: [
    "**/404",
    "**/auth/**",
    "**/moderation/**",
    "**/administration/**",
    "/server-sitemap-index.xml",
    "**/places/**",
  ],
};
