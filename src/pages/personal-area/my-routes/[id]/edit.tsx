import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import { Fragment } from "react";
import { NextSeo } from "next-seo";
import { useTranslation } from "next-i18next";

const EditMyRouteLazy = dynamic(
  () => import("@/containers/personal-area/my-routes/edit-route/EditRoute"),
  { ssr: false }
);

const EditRoute: NextPage = () => {
  const { t } = useTranslation("route-management");
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
      <EditMyRouteLazy />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "personal-area",
        "route-management",
        "common",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default EditRoute;
