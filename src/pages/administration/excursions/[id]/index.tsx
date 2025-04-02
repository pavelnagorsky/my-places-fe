import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import { NextSeo } from "next-seo";
import { Fragment } from "react";

const ExcursionLazy = dynamic(
  () => import("@/containers/admin/excursions/excursion/Excursion"),
  { ssr: false }
);

const Excursion: NextPage = () => {
  return (
    <Fragment>
      <NextSeo
        title={"Экскурсия"}
        openGraph={{
          title: "Экскурсия",
        }}
      />
      <ExcursionLazy />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "excursion-management",
        "personal-area",
        "common",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default Excursion;
