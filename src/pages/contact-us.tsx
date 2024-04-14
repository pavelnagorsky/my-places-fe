import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import dynamic from "next/dynamic";
import { Fragment } from "react";
import { NextSeo } from "next-seo";
import { useTranslation } from "next-i18next";
import useAlternateLinks from "@/hooks/useAlternateLinks";

const ContactUsPageLazy = dynamic(
  () => import("../containers/contact-us/ContactUs")
);

const ContactUs: NextPage = () => {
  const { t } = useTranslation("contact-us");
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
      <ContactUsPageLazy />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "common",
        "contact-us",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default ContactUs;
