import Footer from "@/components/Footer/Footer";
import { PropsWithChildren, useEffect } from "react";
import Header from "@/components/Header/Header";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { useAppDispatch } from "@/store/hooks";
import { logoutIfNotRememberMe } from "@/store/user-slice/user.slice";
import { autoLoginThunk } from "@/store/user-slice/thunks";
const SnackbarAlert = dynamic(() => import("@/components/UI/SnackbarAlert"), {
  ssr: false,
});
const AuthModal = dynamic(() => import("@/containers/Auth/AuthModal"), {
  ssr: false,
});

export default function Layout({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();

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
