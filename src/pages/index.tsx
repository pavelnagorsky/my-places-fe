import { GetStaticProps, Metadata, NextPage, NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import dynamic from "next/dynamic";
import { Fragment } from "react";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";
import mainImageMd from "../../public/images/home-page/main-image.jpg";
import useAlternateLinks from "@/hooks/useAlternateLinks";

const HomePageLazy = dynamic(() => import("../containers/home/HomePage"));

const Index: NextPage = (props, context: NextPageContext) => {
  const { t } = useTranslation("home");
  const { canonical, alternateLinks } = useAlternateLinks();
  return (
    <Fragment>
      <NextSeo
        title={t("seo.title")}
        description={t("seo.description")}
        canonical={canonical}
        languageAlternates={alternateLinks}
        openGraph={{
          url: canonical,
          title: t("seo.title"),
          description: t("seo.description"),
          images: [
            {
              url: mainImageMd.src,
              width: mainImageMd.width,
              height: mainImageMd.height,
              alt: "Достопримечательности Беларуси",
            },
          ],
        }}
      />
      <HomePageLazy />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "home",
        "common",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default Index;
