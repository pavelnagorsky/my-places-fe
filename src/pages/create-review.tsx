import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import dynamic from "next/dynamic";
import { NextSeo } from "next-seo";
import { Fragment } from "react";
import { useTranslation } from "next-i18next";
import useAlternateLinks from "@/hooks/useAlternateLinks";

const CreateReviewPageLazy = dynamic(
  () => import("../containers/create-review/CreateReview")
);

const Review: NextPage = () => {
  const { t } = useTranslation("review-management");
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
      <CreateReviewPageLazy />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "review-management",
        "common",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default Review;
