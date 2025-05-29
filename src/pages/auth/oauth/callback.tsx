import I18nLanguages from "@/shared/I18nLanguages";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect } from "react";
import { useRouter } from "next/router";
import BackdropLoader from "@/components/UI/loader/BackdropLoader";

const OAuthCallback = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    let payload = router.query;
    if (window.location.hash?.length > 0) {
      const hashFragment = window.location.hash.substring(1);
      const params = new URLSearchParams(hashFragment);
      params.forEach((value, key) => {
        payload[key] = value;
      });
    }
    const sendMessage = () => {
      const message = {
        type: "oauth-callback",
        source: "my-places.by",
        payload,
      };
      window.opener?.postMessage(message, window.location.origin);
      window.close(); // Close the popup after sending the message
    };

    // Send a message when the component mounts
    sendMessage();
  }, [router.isReady]);

  return <BackdropLoader loading />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.en)),
      // Will be passed to the page component as props
    },
    revalidate: 60,
  };
};

export default OAuthCallback;
