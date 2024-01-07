import dynamic from "next/dynamic";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";

const PlaceTypesLazy = dynamic(
  () => import("@/containers/admin/place-types/PlaceTypes"),
  { ssr: false }
);

const PlaceTypes: NextPage = () => {
  return <PlaceTypesLazy />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, ["common"])),
      // Will be passed to the page component as props
    },
  };
};

export default PlaceTypes;
