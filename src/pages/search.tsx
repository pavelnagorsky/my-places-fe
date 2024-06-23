import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import dynamic from "next/dynamic";
import { Fragment } from "react";
import { NextSeo } from "next-seo";
import { useTranslation } from "next-i18next";
import useAlternateLinks from "@/hooks/useAlternateLinks";
import searchService from "@/services/search-service/search.service";

const SearchPageLazy = dynamic(
  () => import("../containers/search-page/SearchPage")
);

const Search: NextPage = () => {
  const { t } = useTranslation("search");
  const { canonical, alternateLinks } = useAlternateLinks();
  return (
    <Fragment>
      <NextSeo
        title={t("seo.title")}
        description={t("seo.description")}
        canonical={canonical}
        languageAlternates={alternateLinks}
        openGraph={{
          url: canonical,
          title: t("seo.title"),
          description: t("seo.description"),
        }}
      />
      <SearchPageLazy />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "search",
        "common",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default Search;
