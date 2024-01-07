import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import dynamic from "next/dynamic";

const TermsOfUseLazy = dynamic(
  () => import("../containers/terms-of-use/TermsOfUse")
);

const TermsOfUse: NextPage = () => {
  return <TermsOfUseLazy />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "termsOfUse",
        "common",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default TermsOfUse;
