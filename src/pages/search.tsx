import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import WithSearch from "@/hoc/WithSearch";
import I18nLanguages from "@/shared/I18nLanguages";
import dynamic from "next/dynamic";
import placesService from "@/services/places-service/places.service";
import {
  ISearchResultsState,
  setInitialState,
} from "@/store/search-results-slice/search-results.slice";
import { useAppDispatch } from "@/store/hooks";

const SearchPageLazy = dynamic(
  () => import("../containers/SearchPage/SearchPage")
);

const Search: NextPage<{ ssrSearchResults: ISearchResultsState }> = ({
  ssrSearchResults,
}) => {
  const dispatch = useAppDispatch();
  dispatch(setInitialState(ssrSearchResults));
  return (
    <WithSearch>
      <SearchPageLazy />
    </WithSearch>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ssrSearchResults: await placesService.getSsrSearchResults(
        locale || I18nLanguages.ru
      ),
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
