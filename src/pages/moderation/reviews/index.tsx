import dynamic from "next/dynamic";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";
import { Fragment } from "react";

const ModerationReviewsLazy = dynamic(
  () =>
    import(
      "@/containers/moderation/reviews/reviews-list/ReviewsModerationPage"
    ),
  { ssr: false }
);

const Index: NextPage = () => {
  const { t } = useTranslation("moderation");
  return (
    <Fragment>
      <NextSeo
        title={t("reviews.title")}
        openGraph={{
          title: t("reviews.title"),
        }}
      />
      <ModerationReviewsLazy />
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
