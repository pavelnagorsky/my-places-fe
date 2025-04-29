import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import dynamic from "next/dynamic";
import { Fragment } from "react";
import { FAQPageJsonLd, NextSeo } from "next-seo";
import { useTranslation } from "next-i18next";
import useAlternateLinks from "@/hooks/useAlternateLinks";
import card1Image from "/public/images/about-us/card1.jpg";
import card2Image from "/public/images/about-us/card2.jpg";
import useFAQ from "@/containers/about-us/faq/logic/useFAQ";

const AboutPageLazy = dynamic(() => import("../containers/about-us/AboutUs"));

const About: NextPage = () => {
  const { t } = useTranslation("about");
  const { canonical, alternateLinks } = useAlternateLinks();
  const faq = useFAQ();
  const metaFAQ = faq.flatMap((section) =>
    section.questions.map((question) => ({
      questionName: question.title,
      acceptedAnswerText: question.description,
    }))
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
      <FAQPageJsonLd mainEntity={metaFAQ} />
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
