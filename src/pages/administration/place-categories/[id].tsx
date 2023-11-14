import dynamic from "next/dynamic";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";

const PlaceCategoryLazy = dynamic(
  () =>
    import("@/containers/Admin/PlaceCategories/PlaceCategory/PlaceCategory"),
  { ssr: false }
);

const PlaceCategory: NextPage = () => {
  return <PlaceCategoryLazy />;
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
