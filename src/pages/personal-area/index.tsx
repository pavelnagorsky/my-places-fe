import dynamic from "next/dynamic";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import { routerLinks } from "@/staticData/routerLinks";

const PersonalAreaLazy = dynamic(
  () => import("@/containers/PersonalArea/Layout/PersonalAreaLayout"),
  { ssr: false }
);

const PersonalArea: NextPage = () => {
  return <PersonalAreaLazy />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    redirect: {
      destination: routerLinks.personalAreaPlaces,
    },
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, ["common"])),
      // Will be passed to the page component as props
    },
  };
};

export default PersonalArea;
