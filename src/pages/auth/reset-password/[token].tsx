import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";
import { Fragment } from "react";

const ResetPasswordLazy = dynamic(
  () => import("@/containers/auth/content/ResetPassword"),
  {
    ssr: false,
  }
);

const ResetPasswordPage: NextPage = () => {
  const { t } = useTranslation("common");

  return (
    <Fragment>
      <NextSeo
        title={t("auth.resetPassword.title")}
        description={t("auth.signup.passwordHelper")}
        openGraph={{
          title: t("auth.resetPassword.title"),
          description: t("auth.signup.passwordHelper"),
        }}
      />
      <ResetPasswordLazy />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, ["common"])),
      // Will be passed to the page component as props
    },
  };
};

export default ResetPasswordPage;
