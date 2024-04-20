import dynamic from "next/dynamic";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import { NextSeo } from "next-seo";
import { Fragment } from "react";

const PlacesLazy = dynamic(() => import("@/containers/admin/places/Places"), {
  ssr: false,
});

const Places: NextPage = () => {
  return (
    <Fragment>
      <NextSeo
        title={"Места"}
        openGraph={{
          title: "Места",
        }}
      />
      <PlacesLazy />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "personal-area",
        "common",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default Places;
