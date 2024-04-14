import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import dynamic from "next/dynamic";
import { Fragment, useMemo } from "react";
import { FAQPageJsonLd, NextSeo } from "next-seo";
import { useTranslation } from "next-i18next";
import useAlternateLinks from "@/hooks/useAlternateLinks";
import card1Image from "/public/images/about-us/card1.jpg";
import card2Image from "/public/images/about-us/card2.jpg";

const AboutPageLazy = dynamic(() => import("../containers/about-us/AboutUs"));

const About: NextPage = () => {
  const { t, i18n } = useTranslation("about");
  const { canonical, alternateLinks } = useAlternateLinks();

  const data = useMemo(
    () => [
      {
        questionName: t("faq.1.1.title"),
        acceptedAnswerName: t("faq.1.1.description"),
      },
      {
        questionName: t("faq.1.2.title"),
        acceptedAnswerName: t("faq.1.2.description"),
      },
      {
        questionName: t("faq.1.3.title"),
        acceptedAnswerName: t("faq.1.3.description"),
      },
      {
        questionName: t("faq.1.4.title"),
        acceptedAnswerName: t("faq.1.4.description"),
      },
      {
        questionName: t("faq.2.1.title"),
        acceptedAnswerName: t("faq.2.1.description"),
      },
      {
        questionName: t("faq.2.2.title"),
        acceptedAnswerName: t("faq.2.2.description"),
      },
      {
        questionName: t("faq.3.1.title"),
        acceptedAnswerName: t("faq.3.1.description"),
      },
      {
        questionName: t("faq.3.2.title"),
        acceptedAnswerName: t("faq.3.2.description"),
      },
      {
        questionName: t("faq.3.3.title"),
        acceptedAnswerName: t("faq.3.3.description"),
      },
      {
        questionName: t("faq.4.1.title"),
        acceptedAnswerName: t("faq.4.1.description"),
      },
    ],
    [i18n.language]
  );

  return (
    <Fragment>
      <NextSeo
        title={t("title")}
        description={t("description1")}
        canonical={canonical}
        languageAlternates={alternateLinks}
        openGraph={{
          url: canonical,
          title: t("title"),
          description: t("description1"),
          images: [
            {
              url: card1Image.src,
              width: card1Image.width,
              height: card1Image.height,
              alt: "Достопримечательности Беларуси 1",
            },
            {
              url: card2Image.src,
              width: card2Image.width,
              height: card2Image.height,
              alt: "Достопримечательности Беларуси 2",
            },
          ],
        }}
      />
      <FAQPageJsonLd mainEntity={data} />
      <AboutPageLazy />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "about",
        "common",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default About;
