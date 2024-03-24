import { GetStaticProps, Metadata, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import dynamic from "next/dynamic";

const HomePageLazy = dynamic(() => import("../containers/home-page/HomePage"));

const Index: NextPage = () => {
  return <HomePageLazy />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "homePage",
        "common",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default Index;
