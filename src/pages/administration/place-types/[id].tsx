import dynamic from "next/dynamic";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import { NextSeo } from "next-seo";
import { Fragment } from "react";

const PlaceTypeLazy = dynamic(
  () => import("@/containers/admin/place-types/place-type/PlaceType"),
  { ssr: false }
);

const PlaceType: NextPage = () => {
  return (
    <Fragment>
      <NextSeo
        title={"Типы мест"}
        openGraph={{
          title: "Типы мест",
        }}
      />
      <PlaceTypeLazy />
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

export default PlaceType;
