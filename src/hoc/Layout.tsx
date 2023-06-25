import Footer from "@/components/Footer/Footer";
import { Fragment, PropsWithChildren } from "react";
import Header from "@/components/Header/Header";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Fragment>
      <Header />
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
}
