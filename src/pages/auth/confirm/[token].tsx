import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";

const ConfirmLazy = dynamic(
  () => import("@/containers/auth/content/ConfirmEmail"),
  {
    ssr: false,
  }
);

const ConfirmEmailPage: NextPage = () => {
  return <ConfirmLazy />;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, ["common"])),
      // Will be passed to the page component as props
    },
  };
};

export default ConfirmEmailPage;
