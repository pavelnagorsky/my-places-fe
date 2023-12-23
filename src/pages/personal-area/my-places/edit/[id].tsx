import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";

const EditMyPlaceLazy = dynamic(
  () => import("@/containers/PersonalArea/EditMyPlace/EditMyPlace"),
  { ssr: false }
);

const EditPlace: NextPage = () => {
  return <EditMyPlaceLazy />;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, ["common"])),
      // Will be passed to the page component as props
    },
  };
};

export default EditPlace;
