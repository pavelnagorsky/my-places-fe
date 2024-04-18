import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import { Fragment } from "react";
import { NextSeo } from "next-seo";
import { useTranslation } from "next-i18next";

const EditMyPlaceLazy = dynamic(
  () => import("@/containers/personal-area/edit-my-place/EditMyPlace"),
  { ssr: false }
);

const EditPlace: NextPage = () => {
  const { t } = useTranslation("place-management");
  return (
    <Fragment>
      <NextSeo
        title={t("edit.title")}
        description={t("edit.description")}
        openGraph={{
          title: t("edit.title"),
          description: t("edit.description"),
        }}
      />
      <EditMyPlaceLazy />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "place-management",
        "common",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default EditPlace;
