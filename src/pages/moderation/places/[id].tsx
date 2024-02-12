import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";

const PlaceModerationLazy = dynamic(
  () => import("@/containers/moderation/place-moderation/PlaceModeration"),
  {
    ssr: false,
  }
);

const PlaceModeration: NextPage = () => {
  return <PlaceModerationLazy />;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, ["common"])),
      // Will be passed to the page component as props
    },
  };
};

export default PlaceModeration;
