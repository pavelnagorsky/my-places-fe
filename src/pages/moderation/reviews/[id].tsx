import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";
import { Fragment } from "react";

const ReviewModerationLazy = dynamic(
  () =>
    import(
      "@/containers/moderation/reviews/review-moderation/ReviewModeration"
    ),
  {
    ssr: false,
  }
);

const ReviewModeration: NextPage = () => {
  const { t } = useTranslation("moderation");
  return (
    <Fragment>
      <NextSeo
        title={t("form.titleReview")}
        openGraph={{
          title: t("form.titleReview"),
        }}
      />
      <ReviewModerationLazy />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "moderation",
        "review-management",
        "common",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default ReviewModeration;
