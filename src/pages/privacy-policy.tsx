import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import dynamic from "next/dynamic";
import { Fragment } from "react";
import { useTranslation } from "next-i18next";
import useAlternateLinks from "@/hooks/useAlternateLinks";
import { NextSeo } from "next-seo";

const PrivacyPolicyLazy = dynamic(
  () => import("../containers/privacy-policy/PrivacyPolicy")
);

const PrivacyPolicy: NextPage = () => {
  const { t } = useTranslation("privacy-policy");
  const { canonical, alternateLinks } = useAlternateLinks();

  return (
    <Fragment>
      <NextSeo
        title={t("title")}
        description={t("description")}
        canonical={canonical}
        languageAlternates={alternateLinks}
        openGraph={{
          url: canonical,
          title: t("title"),
          description: t("description"),
        }}
      />
      <PrivacyPolicyLazy />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "privacy-policy",
        "common",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default PrivacyPolicy;
