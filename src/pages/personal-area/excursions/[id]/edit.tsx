import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import { Fragment } from "react";
import { NextSeo } from "next-seo";
import { useTranslation } from "next-i18next";

const EditMyExcursionLazy = dynamic(
  () =>
    import(
      "@/containers/personal-area/my-excursions/edit-excursion/EditExcursion"
    ),
  { ssr: false }
);

const EditExcursion: NextPage = () => {
  const { t } = useTranslation("excursion-management");
  return (
    <Fragment>
      <NextSeo
        title={t("seo.edit.title")}
        description={t("seo.edit.description")}
        openGraph={{
          title: t("seo.edit.title"),
          description: t("seo.edit.description"),
        }}
      />
      <EditMyExcursionLazy />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "personal-area",
        "excursion-management",
        "route-management",
        "common",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default EditExcursion;
