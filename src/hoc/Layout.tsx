import { PropsWithChildren, useEffect } from "react";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  logoutIfNotRememberMe,
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
const SnackbarAlert = dynamic(() => import("@/components/UI/SnackbarAlert"), {
  ssr: false,
});
const AuthModal = dynamic(() => import("@/containers/auth/AuthModal"), {
  ssr: false,
});

export default function Layout({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();
  const checkLanguage = useAppSelector(selectChangeLanguage);
  const preferredLanguageId = useAppSelector(selectUserPreferredLanguage);
  const router = useRouter();
  const { i18n } = useTranslation();

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

    // logout if not rememberMe
    window.onunload = function () {
      dispatch(logoutIfNotRememberMe());
    };
  }, []);

  return (
    <Box height={"100vh"} display={"flex"} flexDirection={"column"}>
      <SnackbarAlert />
      <AuthModal />
      <Box flexGrow={1}>
        <Header />
        <main>{children}</main>
      </Box>
      <Footer />
    </Box>
  );
}
