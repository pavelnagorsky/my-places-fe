import { PropsWithChildren, useEffect, useMemo } from "react";
import { Box } from "@mui/material";
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
const SnackbarAlert = dynamic(
  () => import("@/components/UI/alert/SnackbarAlert"),
  {
    ssr: false,
  }
);
const AuthModal = dynamic(() => import("@/containers/auth/AuthModal"), {
  ssr: false,
});

const wideDesignPathNames = [
  routerLinks.administrationBasePath,
  routerLinks.personalAreaBasePath,
  routerLinks.moderationBasePath,
];

export default function Layout({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();
  const checkLanguage = useAppSelector(selectChangeLanguage);
  const preferredLanguageId = useAppSelector(selectUserPreferredLanguage);
  const router = useRouter();
  const { i18n } = useTranslation();

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
      <SnackbarAlert />
      <AuthModal />
      <Box flexGrow={1}>
        <Header wideMode={wideDesign} />
        <main>{children}</main>
      </Box>
      {!wideDesign && <Footer />}
    </Box>
  );
}
