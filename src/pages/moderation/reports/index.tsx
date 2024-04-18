import dynamic from "next/dynamic";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";
import { Fragment } from "react";

const ReportsLazy = dynamic(
  () => import("@/containers/moderation/reports/ReportsPage"),
  { ssr: false }
);

const Index: NextPage = () => {
  const { t } = useTranslation("moderation");
  return (
    <Fragment>
      <NextSeo
        title={t("reports.title")}
        openGraph={{
          title: t("reports.title"),
        }}
      />
      <ReportsLazy />
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
