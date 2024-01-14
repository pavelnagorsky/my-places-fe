import dynamic from "next/dynamic";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";

const FavouritesLazy = dynamic(
  () => import("@/containers/personal-area/my-favourites/MyFavouritesPage"),
  { ssr: false }
);

const Favourites: NextPage = () => {
  return <FavouritesLazy />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, ["common"])),
      // Will be passed to the page component as props
    },
  };
};

export default Favourites;
