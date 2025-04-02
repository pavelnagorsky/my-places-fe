import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";
import { Fragment } from "react";

const EditMyReviewLazy = dynamic(
  () =>
    import("@/containers/personal-area/my-reviews/edit-my-review/EditMyReview"),
  { ssr: false }
);

const EditReview: NextPage = () => {
  const { t } = useTranslation("review-management");
  return (
    <Fragment>
      <NextSeo
        title={t("edit.title")}
        description={t("edit.description")}
        openGraph={{
          title: t("edit.title"),
          description: t("edit.description"),
        }}
      />
      <EditMyReviewLazy />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "personal-area",
        "review-management",
        "common",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default EditReview;
