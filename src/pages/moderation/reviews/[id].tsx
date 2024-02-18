import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";

const ReviewModerationLazy = dynamic(
  () => import("@/containers/moderation/review-moderation/ReviewModeration"),
  {
    ssr: false,
  }
);

const ReviewModeration: NextPage = () => {
  return <ReviewModerationLazy />;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, ["common"])),
      // Will be passed to the page component as props
    },
  };
};

export default ReviewModeration;
