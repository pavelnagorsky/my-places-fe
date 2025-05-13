import dynamic from "next/dynamic";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import { NextSeo } from "next-seo";
import { Fragment } from "react";

const RegionsPageLazy = dynamic(
  () => import("@/containers/admin/regions/Regions"),
  { ssr: false }
);

const Regions: NextPage = () => {
  return (
    <Fragment>
      <NextSeo
        title={"Области"}
        openGraph={{
          title: "Области",
        }}
      />
      <RegionsPageLazy />
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

export default Regions;
