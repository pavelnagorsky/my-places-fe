import dynamic from "next/dynamic";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";
import { Fragment } from "react";

const SettingsLazy = dynamic(
  () => import("@/containers/personal-area/settings/UserSettingsPage"),
  { ssr: false }
);

const Settings: NextPage = () => {
  const { t } = useTranslation("personal-area");
  return (
    <Fragment>
      <NextSeo
        title={t("settings.title")}
        openGraph={{
          title: t("settings.title"),
        }}
      />
      <SettingsLazy />
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

export default Settings;
