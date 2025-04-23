import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import { Fragment } from "react";

const RoutePageLazy = dynamic(() => import("@/containers/route/RoutePage"));

const Route: NextPage = () => {
  return (
    <Fragment>
      <RoutePageLazy />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "personal-area",
        "route-management",
        "common",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default Route;
