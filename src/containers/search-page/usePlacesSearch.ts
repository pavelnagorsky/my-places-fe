import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form-mui";
import { useEffect } from "react";
import {
  ISearchForm,
  SearchOrderByStringEnum,
} from "@/containers/search-page/interfaces";
import { ISearchPlacesRequest } from "@/services/search-service/interfaces/interfaces";
import searchService from "@/services/search-service/search.service";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getMapResultsThunk,
  getSearchResultsThunk,
  selectCurrentItemsLength,
  selectIsDataFetched,
  selectScrollPosition,
  selectSearchFilters,
  setFilters,
  setScrollPosition,
} from "@/store/search-slice/search.slice";
import utils from "@/shared/utils";
import { debounce } from "@mui/material";

const usePlacesSearch = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const initialFilters = useAppSelector(selectSearchFilters);
  const isDataFetched = useAppSelector(selectIsDataFetched);
  const currentItemsLength = useAppSelector(selectCurrentItemsLength);
  const scrollPosition = useAppSelector(selectScrollPosition);

  const formContext = useForm<ISearchForm>({
    mode: "onChange",
    defaultValues: initialFilters,
  });

  useEffect(() => {
    if (scrollPosition) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollPosition);
        });
      }, 0);
    }
  }, []);

  useEffect(() => {
    const handleScroll = debounce(() => {
      dispatch(setScrollPosition(window.scrollY));
    }, 300);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onSubmit = (fromStart = true) => {
    formContext.handleSubmit((data) => {
      // calculate page for pagination
      const requestedPage = fromStart
        ? 0
        : utils.calculateCurrentScrollPage(
            currentItemsLength,
            searchService.SEARCH_PLACES_PER_PAGE
          );
      const payload: ISearchPlacesRequest & { language: string } = {
        searchCoordinates: data.search,
        radius: data.radius,
        categoriesIds: data.categories,
        typesIds: data.types,
        title: data.title,
        orderBy: +data.orderBy,
        pageSize: searchService.SEARCH_PLACES_PER_PAGE,
        page: requestedPage,
        language: i18n.language,
      };
      if (fromStart) {
        dispatch(setFilters(data));
        // fetch map results
        dispatch(getMapResultsThunk(payload));
      }
      dispatch(getSearchResultsThunk(payload));
    })();
  };

  useEffect(() => {
    if (isDataFetched) return;
    onSubmit();
  }, [i18n.language, isDataFetched]);

  return {
    formContext,
    onSubmit,
  };
};

export default usePlacesSearch;

export const defaultSearchFilters: ISearchForm = {
  title: "",
  radius: 100,
  searchByMe: false,
  types: [],
  categories: [],
  search: null,
  locationTitle: "",
  locationInputValue: "",
  showMap: false,
  orderBy: SearchOrderByStringEnum.CREATED_AT,
};
