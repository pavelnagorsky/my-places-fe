import dynamic from "next/dynamic";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import { Fragment } from "react";
import { NextSeo } from "next-seo";

const FeedbackListLazy = dynamic(
  () => import("@/containers/admin/feedback-list/FeedbackList"),
  {
    ssr: false,
  }
);

const FeedbackList: NextPage = () => {
  return (
    <Fragment>
      <NextSeo
        title={"Обратная связь"}
        openGraph={{
          title: "Обратная связь",
        }}
      />
      <FeedbackListLazy />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "contact-us",
        "common",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default FeedbackList;
