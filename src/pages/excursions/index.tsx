import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import dynamic from "next/dynamic";
import { Fragment } from "react";
import { NextSeo } from "next-seo";
import { useTranslation } from "next-i18next";
import useAlternateLinks from "@/hooks/useAlternateLinks";

const ExcursionsPageLazy = dynamic(
  () =>
    import("../../containers/excursions/excursions-catalog/ExcursionsCatalog")
);

const Index: NextPage = () => {
  const { t } = useTranslation("excursion-management");
  const { canonical, alternateLinks } = useAlternateLinks();
  return (
    <Fragment>
      <NextSeo
        title={t("seo.search.title")}
        description={t("seo.search.description")}
        canonical={canonical}
        languageAlternates={alternateLinks}
        openGraph={{
          url: canonical,
          title: t("seo.search.title"),
          description: t("seo.search.description"),
        }}
      />
      <ExcursionsPageLazy />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "excursion-management",
        "common",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default Index;
