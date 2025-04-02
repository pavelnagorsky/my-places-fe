import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import { useTranslation } from "next-i18next";
import { Fragment } from "react";
import { NextSeo } from "next-seo";

const PlaceModerationLazy = dynamic(
  () =>
    import("@/containers/moderation/places/place-moderation/PlaceModeration"),
  {
    ssr: false,
  }
);

const PlaceModeration: NextPage = () => {
  const { t } = useTranslation("moderation");
  return (
    <Fragment>
      <NextSeo
        title={t("form.titlePlace")}
        openGraph={{
          title: t("form.titlePlace"),
        }}
      />
      <PlaceModerationLazy />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "moderation",
        "place-management",
        "common",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default PlaceModeration;
