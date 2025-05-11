import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import { NextSeo } from "next-seo";
import { Fragment } from "react";

const RegionPageLazy = dynamic(
  () => import("@/containers/admin/regions/region/Region"),
  { ssr: false }
);

const Region: NextPage = () => {
  return (
    <Fragment>
      <NextSeo
        title={"Область"}
        openGraph={{
          title: "Область",
        }}
      />
      <RegionPageLazy />
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

export default Region;
