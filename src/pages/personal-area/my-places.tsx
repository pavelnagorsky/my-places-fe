import dynamic from "next/dynamic";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";

const MyPlacesLazy = dynamic(
  () => import("@/containers/PersonalArea/MyPlaces/MyPlacesPage"),
  { ssr: false }
);

const MyPlaces: NextPage = () => {
  return <MyPlacesLazy />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, ["common"])),
      // Will be passed to the page component as props
    },
  };
};

export default MyPlaces;
