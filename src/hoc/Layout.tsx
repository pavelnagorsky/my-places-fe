import Footer from "@/components/Footer/Footer";
import { Fragment, PropsWithChildren } from "react";
import Header from "@/components/Header/Header";
import { Box } from "@mui/material";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Fragment>
      <Box minHeight={"calc(100vh - 90px)"}>
        <Header />
        <main>{children}</main>
      </Box>
      <Footer />
    </Fragment>
  );
}
