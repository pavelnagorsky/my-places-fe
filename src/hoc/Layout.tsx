import Footer from "@/components/Footer/Footer";
import { Fragment, PropsWithChildren } from "react";
import Header from "@/components/Header/Header";
import { Box } from "@mui/material";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Box height={"100vh"} display={"flex"} flexDirection={"column"}>
      <Box flexGrow={1}>
        <Header />
        <main>{children}</main>
      </Box>
      <Footer />
    </Box>
  );
}
