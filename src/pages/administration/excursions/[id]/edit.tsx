import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import { NextSeo } from "next-seo";
import { Fragment } from "react";

const ExcursionEditLazy = dynamic(
  () => import("@/containers/admin/excursions/excursion/edit/EditExcursion"),
  { ssr: false }
);

const ExcursionEdit: NextPage = () => {
  return (
    <Fragment>
      <NextSeo
        title={"Редактировать экскурсию"}
        openGraph={{
          title: "Редактировать экскурсию",
        }}
      />
      <ExcursionEditLazy />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "personal-area",
        "excursion-management",
        "route-management",
        "common",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default ExcursionEdit;
