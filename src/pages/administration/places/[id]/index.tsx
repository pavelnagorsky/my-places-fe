import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import { NextSeo } from "next-seo";
import { Fragment } from "react";

const PlaceLazy = dynamic(
  () => import("@/containers/admin/places/place/Place"),
  { ssr: false }
);

const Place: NextPage = () => {
  return (
    <Fragment>
      <NextSeo
        title={"Место"}
        openGraph={{
          title: "Место",
        }}
      />
      <PlaceLazy />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "review-management",
        "personal-area",
        "common",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default Place;
