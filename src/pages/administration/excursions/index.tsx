import dynamic from "next/dynamic";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import { NextSeo } from "next-seo";
import { Fragment } from "react";

const ExcursionsLazy = dynamic(
  () => import("@/containers/admin/excursions/excursions-list/Excursions"),
  {
    ssr: false,
  }
);

const Places: NextPage = () => {
  return (
    <Fragment>
      <NextSeo
        title={"Экскурсии"}
        openGraph={{
          title: "Экскурсии",
        }}
      />
      <ExcursionsLazy />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "personal-area",
        "excursion-management",
        "common",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default Places;
