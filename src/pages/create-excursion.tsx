import dynamic from "next/dynamic";
import { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import useAlternateLinks from "@/hooks/useAlternateLinks";
import { Fragment } from "react";
import { NextSeo } from "next-seo";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";

const ExcursionBuilderPageLazy = dynamic(
  () => import("../containers/excursion-builder/ExcursionBuilder"),
  { ssr: false }
);

const CreateExcursion: NextPage = () => {
  const { t } = useTranslation("excursion-management");
  const { canonical, alternateLinks } = useAlternateLinks();

  return (
    <Fragment>
      <NextSeo
        title={t("seo.create.title")}
        description={t("seo.create.description")}
        canonical={canonical}
        languageAlternates={alternateLinks}
        openGraph={{
          url: canonical,
          title: t("seo.create.title"),
          description: t("seo.create.description"),
        }}
      />
      <ExcursionBuilderPageLazy />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "search",
        "excursion-management",
        "route-management",
        "common",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default CreateExcursion;
