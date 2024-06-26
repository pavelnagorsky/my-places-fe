import dynamic from "next/dynamic";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import { NextSeo } from "next-seo";
import { Fragment } from "react";

const PlaceCategoriesLazy = dynamic(
  () => import("@/containers/admin/place-categories/PlaceCategories"),
  { ssr: false }
);

const PlaceCategories: NextPage = () => {
  return (
    <Fragment>
      <NextSeo
        title={"Категории мест"}
        openGraph={{
          title: "Категории мест",
        }}
      />
      <PlaceCategoriesLazy />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, ["common"])),
      // Will be passed to the page component as props
    },
  };
};

export default PlaceCategories;
