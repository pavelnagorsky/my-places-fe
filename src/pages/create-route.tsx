import dynamic from "next/dynamic";
import { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import useAlternateLinks from "@/hooks/useAlternateLinks";
import { Fragment } from "react";
import { NextSeo } from "next-seo";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";

const RouteBuilderPageLazy = dynamic(
  () => import("../containers/route-builder/RouteBuilder")
);

const CreateRoute: NextPage = () => {
  const { t } = useTranslation("route-builder");
  const { canonical, alternateLinks } = useAlternateLinks();

  return (
    <Fragment>
      <NextSeo
        title={t("creation.title")}
        description={t("creation.description")}
        canonical={canonical}
        languageAlternates={alternateLinks}
        openGraph={{
          url: canonical,
          title: t("creation.title"),
          description: t("creation.description"),
        }}
      />
      <RouteBuilderPageLazy />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "route-builder",
        "search",
        "review-management",
        "common",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default CreateRoute;
