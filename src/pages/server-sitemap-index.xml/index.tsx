import { getServerSideSitemapLegacy, ISitemapField } from "next-sitemap";
import { GetServerSideProps } from "next";
import placesService from "@/services/places-service/places.service";
import { Environment } from "@/shared/Environment";
import I18nLanguages from "@/shared/I18nLanguages";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await placesService.getPlacesSlugs();

  let localizedSlugs: ISitemapField[] = [];
  const locales = ["", I18nLanguages.be + "/", I18nLanguages.en + "/"];
  locales.forEach((locale) => {
    const slugs: ISitemapField[] = data.map((item) => ({
      loc: `https://${Environment.domain}/${locale}places/${item.slug || ""}`,
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }));
    localizedSlugs = [...localizedSlugs, ...slugs];
  });

  return getServerSideSitemapLegacy(ctx, localizedSlugs);
};

// Default export to prevent next.js errors
export default function SitemapIndex() {}
