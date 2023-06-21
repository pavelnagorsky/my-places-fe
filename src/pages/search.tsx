import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SearchPage } from "@/containers/SearchPage/SearchPage";
import placesService from "@/services/places-service/places.service";
import { ISearchPlace } from "@/services/places-service/search-place.interface";

const Search: NextPage<{ places: ISearchPlace[] }> = ({ places }) => {
  return <SearchPage places={places} />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  let placesData: ISearchPlace[] = [];
  try {
    const { data } = await placesService.getAllPlaces(1);
    placesData = data;
  } catch (e) {}
  return {
    props: {
      places: placesData,
      ...(await serverSideTranslations(locale ?? "ru", [
        "searchPage",
        "common",
      ])),
      // Will be passed to the page component as props
    },
    revalidate: 60,
  };
};

export default Search;
