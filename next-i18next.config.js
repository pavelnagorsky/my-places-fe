module.exports = {
  i18n: {
    defaultLocale: "ru",
    locales: ["ru", "be", "en"],
    localeDetection: false,
  },
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
