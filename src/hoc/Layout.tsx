import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { Box, LinearProgress } from "@mui/material";
import dynamic from "next/dynamic";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectChangeLanguage,
  selectUserPreferredLanguage,
} from "@/store/user-slice/user.slice";
import { autoLoginThunk } from "@/store/user-slice/thunks";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import utils from "@/shared/utils";
import parseLanguageToId from "@/shared/parseLanguageToId";
import { routerLinks } from "@/routing/routerLinks";
import GoogleOAuthOneTap from "@/components/auth/content/oauth/google/content/one-tap-login/GoogleOAuthOneTap";
import useAnalytics from "@/hooks/analytics/useAnalytics";
import { AnalyticsEventsEnum } from "@/hooks/analytics/analytic-events.enum";

const SnackbarAlert = dynamic(
  () => import("@/components/UI/alert/SnackbarAlert"),
  {
    ssr: false,
  }
);
const AuthModal = dynamic(() => import("@/components/auth/AuthModal"), {
  ssr: false,
});
const CookieConsent = dynamic(
  () => import("@/components/cookie-consent/CookieConsent"),
  {
    ssr: false,
  }
);
const TTSPlayer = dynamic(() => import("@/components/tts-player/TTSPlayer"), {
  ssr: false,
});
const CelebrationPopup = dynamic(
  () => import("@/components/celebration-popup/CelebrationPopup"),
  {
    ssr: false,
  }
);

const wideDesignPathNames = [
  routerLinks.administrationBasePath,
  routerLinks.personalAreaBasePath,
  routerLinks.moderationBasePath,
  "404",
];

export default function Layout({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();
  const checkLanguage = useAppSelector(selectChangeLanguage);
  const preferredLanguageId = useAppSelector(selectUserPreferredLanguage);
  const router = useRouter();
  const { i18n } = useTranslation();
  const [pageLoading, setPageLoading] = useState(false);
  const sendAnalytics = useAnalytics();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      setPageLoading(true);
    };

    const handleRouteChangeComplete = (url: string) => {
      setPageLoading(false);
      sendAnalytics(AnalyticsEventsEnum.PageChange, { page: url });
    };

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeComplete);
    };
  }, [router.events]);

  const wideDesign = useMemo(() => {
    return wideDesignPathNames.some((link) => router.pathname.includes(link));
  }, [router.pathname]);

  useEffect(() => {
    // when user manually logs in and the user data is retrieved, redirect to predefined language
    if (!checkLanguage || !preferredLanguageId) return;
    if (parseLanguageToId(i18n.language) !== preferredLanguageId) {
      router.push(
        { pathname: router.pathname, query: router.query },
        undefined,
        {
          locale: utils.parseLanguageIdToLocale(preferredLanguageId),
        }
      );
    }
  }, [checkLanguage]);

  useEffect(() => {
    dispatch(autoLoginThunk());
  }, []);

  return (
    <Box height={"100vh"} display={"flex"} flexDirection={"column"}>
      <GoogleOAuthOneTap />
      {pageLoading && (
        <LinearProgress
          sx={{ zIndex: 5000, position: "fixed", top: 0, width: "100vw" }}
        />
      )}
      <CookieConsent />
      <SnackbarAlert />
      <TTSPlayer />
      <AuthModal />
      <CelebrationPopup />
      <Box flexGrow={1}>
        <Header wideMode={wideDesign} />
        <main>{children}</main>
      </Box>
      {!wideDesign && <Footer />}
    </Box>
  );
}
