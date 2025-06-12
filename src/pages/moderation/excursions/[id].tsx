import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import { useTranslation } from "next-i18next";
import { Fragment } from "react";
import { NextSeo } from "next-seo";

const ExcursionModerationLazy = dynamic(
  () =>
    import(
      "@/containers/moderation/excursions/excursion-moderation/ExcursionModeration"
    ),
  {
    ssr: false,
  }
);

const ExcursionModeration: NextPage = () => {
  const { t } = useTranslation("moderation");
  return (
    <Fragment>
      <NextSeo
        title={t("form.titleExcursion")}
        openGraph={{
          title: t("form.titleExcursion"),
        }}
      />
      <ExcursionModerationLazy />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "moderation",
        "excursion-management",
        "place",
        "route-management",
        "common",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default ExcursionModeration;
