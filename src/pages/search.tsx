import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SearchPage from "@/containers/SearchPage/SearchPage";
import WithSearch from "@/hoc/WithSearch";
import I18nLanguages from "@/shared/I18nLanguages";

const Search: NextPage = () => {
  return (
    <WithSearch>
      <SearchPage />
    </WithSearch>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "searchPage",
        "common",
      ])),
      // Will be passed to the page component as props
    },
    revalidate: 60,
  };
};

export default Search;
