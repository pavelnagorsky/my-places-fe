import { Box } from "@mui/material";
import { useTranslation } from "next-i18next";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import mainImageMd from "public/images/home-page/main-image-md.jpg";
import mainImageXs from "public/images/home-page/main-image-xs.jpg";
import card1Image from "public/images/home-page/card1.jpg";
import card2Image from "public/images/home-page/card2.jpg";

import TextAndMainImage from "@/components/TextAndImage/TextAndMainImage";
import TextAndImage from "@/components/TextAndImage/TextAndImage";
import TextWithBubbles from "@/components/TextAndImage/TextWithBubbles";
import BoxWithCircles from "@/components/UI/BoxWithCircles/BoxWithCircles";
import I18nLanguages from "@/shared/I18nLanguages";
import dynamic from "next/dynamic";

const HomePageLazy = dynamic(() => import("../containers/HomePage/HomePage"));

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
