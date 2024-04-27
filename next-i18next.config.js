const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "ru",
    locales: ["ru", "be", "en"],
    localeDetection: false,
  },
  localePath: path.resolve("./public/locales"),
  localeStructure: "{{lng}}/{{ns}}",
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
