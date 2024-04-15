import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import dynamic from "next/dynamic";
import { Fragment } from "react";
import { NextSeo } from "next-seo";
import { useTranslation } from "next-i18next";
import useAlternateLinks from "@/hooks/useAlternateLinks";

const CreatePlacePageLazy = dynamic(
  () => import("../containers/create-place/CreatePlace")
);

const Place: NextPage = () => {
  const { t } = useTranslation("place-management");
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
      <CreatePlacePageLazy />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "place-management",
        "common",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default Place;
