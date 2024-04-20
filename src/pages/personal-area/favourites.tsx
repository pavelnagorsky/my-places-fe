import dynamic from "next/dynamic";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";
import { Fragment } from "react";

const FavouritesLazy = dynamic(
  () => import("@/containers/personal-area/my-favourites/MyFavouritesPage"),
  { ssr: false }
);

const Favourites: NextPage = () => {
  const { t } = useTranslation("personal-area");
  return (
    <Fragment>
      <NextSeo
        title={t("favourites.title")}
        openGraph={{
          title: t("favourites.title"),
        }}
      />
      <FavouritesLazy />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "personal-area",
        "common",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default Favourites;
