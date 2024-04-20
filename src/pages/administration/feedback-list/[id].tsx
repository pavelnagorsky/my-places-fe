import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import { NextSeo } from "next-seo";
import { Fragment } from "react";

const FeedbackLazy = dynamic(
  () => import("@/containers/admin/feedback-list/feedback/Feedback"),
  { ssr: false }
);

const Feedback: NextPage = () => {
  return (
    <Fragment>
      <NextSeo
        title={"Обратная связь"}
        openGraph={{
          title: "Обратная связь",
        }}
      />
      <FeedbackLazy />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
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

export default Feedback;
