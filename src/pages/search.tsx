import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import dynamic from "next/dynamic";
import placesService from "@/services/places-service/places.service";
import { IPaginationResponse } from "@/services/interfaces";
import { ISearchPlace } from "@/services/places-service/interfaces/search-place.interface";
import { Fragment } from "react";
import { NextSeo } from "next-seo";
import { useTranslation } from "next-i18next";
import useAlternateLinks from "@/hooks/useAlternateLinks";
import JsonLd from "@/shared/json-ld/JsonLd";
import searchPageJsonld from "@/shared/json-ld/search-page-jsonld";

const SearchPageLazy = dynamic(
  () => import("../containers/search-page/SearchPage")
);

const Search: NextPage<{
  ssrResults: IPaginationResponse<ISearchPlace>;
}> = ({ ssrResults }) => {
  const { t } = useTranslation("search");
  const { canonical, alternateLinks } = useAlternateLinks();
  const jsonLdData = searchPageJsonld(ssrResults.items);
  return (
    <Fragment>
      <NextSeo
        title={t("seo.title")}
        description={t("seo.description")}
        canonical={canonical}
        languageAlternates={alternateLinks}
        openGraph={{
          url: canonical,
          title: t("seo.title"),
          description: t("seo.description"),
        }}
      />
      <JsonLd data={jsonLdData} />
      <SearchPageLazy ssrResults={ssrResults} />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
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
        "search",
        "common",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default Search;
