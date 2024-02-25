import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import dynamic from "next/dynamic";
import placesService from "@/services/places-service/places.service";
import { IPaginationResponse } from "@/services/interfaces";
import { ISearchPlace } from "@/services/places-service/interfaces/search-place.interface";

const SearchPageLazy = dynamic(
  () => import("../containers/search-page/SearchPage")
);

const Search: NextPage<{
  ssrResults: IPaginationResponse<ISearchPlace>;
}> = ({ ssrResults }) => {
  return <SearchPageLazy ssrResults={ssrResults} />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const { data } = await placesService.search(locale as string, {
    page: 0,
    pageSize: placesService.SEARCH_PLACES_PER_PAGE,
    typesIds: [],
    categoriesIds: [],
    radius: 100,
    searchCoordinates: null,
    title: "",
  });

  return {
    props: {
      ssrResults: data,
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "searchPage",
        "common",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default Search;
