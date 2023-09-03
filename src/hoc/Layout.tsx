import Footer from "@/components/Footer/Footer";
import { PropsWithChildren } from "react";
import Header from "@/components/Header/Header";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
const SnackbarAlert = dynamic(() => import("@/components/UI/SnackbarAlert"), {
  ssr: false,
});
const AuthModal = dynamic(() => import("@/containers/Auth/AuthModal"), {
  ssr: false,
});

export default function Layout({ children }: PropsWithChildren) {
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
