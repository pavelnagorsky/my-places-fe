import dynamic from "next/dynamic";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import { NextSeo } from "next-seo";
import { Fragment } from "react";

const PlaceCategoryLazy = dynamic(
  () =>
    import("@/containers/admin/place-categories/place-category/PlaceCategory"),
  { ssr: false }
);

const PlaceCategory: NextPage = () => {
  return (
    <Fragment>
      <NextSeo
        title={"Категории мест"}
        openGraph={{
          title: "Категории мест",
        }}
      />
      <PlaceCategoryLazy />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, ["common"])),
      // Will be passed to the page component as props
    },
  };
};

export default PlaceCategory;
