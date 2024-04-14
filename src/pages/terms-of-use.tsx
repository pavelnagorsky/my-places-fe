import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import dynamic from "next/dynamic";
import { NextSeo } from "next-seo";
import { Fragment } from "react";
import { useTranslation } from "next-i18next";
import useAlternateLinks from "@/hooks/useAlternateLinks";

const TermsOfUseLazy = dynamic(
  () => import("../containers/terms-of-use/TermsOfUse")
);

const TermsOfUse: NextPage = () => {
  const { t } = useTranslation("terms");
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
      <TermsOfUseLazy />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "terms",
        "common",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default TermsOfUse;
