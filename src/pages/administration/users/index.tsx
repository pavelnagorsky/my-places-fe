import dynamic from "next/dynamic";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import { NextSeo } from "next-seo";
import { Fragment } from "react";

const UsersLazy = dynamic(
  () => import("@/containers/admin/users/users-list/Users"),
  {
    ssr: false,
  }
);

const Users: NextPage = () => {
  return (
    <Fragment>
      <NextSeo
        title={"Пользователи"}
        openGraph={{
          title: "Пользователи",
        }}
      />
      <UsersLazy />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, ["common"])),
      // Will be passed to the page component as props
    },
  };
};

export default Users;
