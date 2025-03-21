import dynamic from "next/dynamic";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import { NextSeo } from "next-seo";
import { useTranslation } from "next-i18next";
import { Fragment } from "react";

const ModerationExcursionsLazy = dynamic(
  () => import("@/containers/moderation/excursions/ExcursionsModerationPage"),
  { ssr: false }
);

const Index: NextPage = () => {
  const { t } = useTranslation("moderation");
  return (
    <Fragment>
      <NextSeo
        title={t("excursions.title")}
        openGraph={{
          title: t("excursions.title"),
        }}
      />
      <ModerationExcursionsLazy />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "moderation",
        "common",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default Index;
