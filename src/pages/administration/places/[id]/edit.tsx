import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import { NextSeo } from "next-seo";
import { Fragment } from "react";

const PlaceEditLazy = dynamic(
  () => import("@/containers/admin/places/place/edit/EditPlace"),
  { ssr: false }
);

const PlaceEdit: NextPage = () => {
  return (
    <Fragment>
      <NextSeo
        title={"Редактировать место"}
        openGraph={{
          title: "Редактировать место",
        }}
      />
      <PlaceEditLazy />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "place-management",
        "common",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default PlaceEdit;
