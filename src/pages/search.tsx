import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import WithSearch from "@/containers/search-page/WithSearch";
import I18nLanguages from "@/shared/I18nLanguages";
import dynamic from "next/dynamic";

const SearchPageLazy = dynamic(
  () => import("../containers/search-page/SearchPage")
);

const Search: NextPage = () => {
  return (
    <WithSearch>
      <SearchPageLazy />
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
  };
};

export default Search;
