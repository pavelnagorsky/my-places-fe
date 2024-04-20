import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import { NextSeo } from "next-seo";
import { Fragment } from "react";

const ReviewEditLazy = dynamic(
  () => import("@/containers/admin/places/place/tabs/reviews/edit/EditReview"),
  { ssr: false }
);

const ReviewEdit: NextPage = () => {
  return (
    <Fragment>
      <NextSeo
        title={"Редактировать заметку"}
        openGraph={{
          title: "Редактировать заметку",
        }}
      />
      <ReviewEditLazy />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
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

export default ReviewEdit;
