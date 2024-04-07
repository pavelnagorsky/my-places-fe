import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";

const EditMyReviewLazy = dynamic(
  () => import("@/containers/personal-area/edit-my-review/EditMyReview"),
  { ssr: false }
);

const EditReview: NextPage = () => {
  return <EditMyReviewLazy />;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, ["common"])),
      // Will be passed to the page component as props
    },
  };
};

export default EditReview;
