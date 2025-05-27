import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import useVkOAuth from "@/containers/auth/content/oauth/vk/logic/useVkOAuth";
import BackdropLoader from "@/components/UI/loader/BackdropLoader";

const VkOAuthRedirect: NextPage = () => {
  useVkOAuth();
  return <BackdropLoader loading />;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, ["common"])),
      // Will be passed to the page component as props
    },
  };
};

export default VkOAuthRedirect;
