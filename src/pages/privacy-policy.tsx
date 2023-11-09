import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import dynamic from "next/dynamic";

const PrivacyPolicyLazy = dynamic(
  () => import("../containers/PrivacyPolicy/PrivacyPolicy")
);

const PrivacyPolicy: NextPage = () => {
  return <PrivacyPolicyLazy />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "privacyPolicy",
        "common",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default PrivacyPolicy;
