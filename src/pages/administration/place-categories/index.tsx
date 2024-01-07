import dynamic from "next/dynamic";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";

const PlaceCategoriesLazy = dynamic(
  () => import("@/containers/admin/place-categories/PlaceCategories"),
  { ssr: false }
);

const PlaceCategories: NextPage = () => {
  return <PlaceCategoriesLazy />;
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
