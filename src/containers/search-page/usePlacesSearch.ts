import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form-mui";
import { useCallback, useEffect, useRef, useState } from "react";
import { IPaginationRequest, IPaginationResponse } from "@/services/interfaces";
import { ISearchPlace } from "@/services/search-service/interfaces/search-place.interface";
import {
  ISearchForm,
  SearchOrderByStringEnum,
} from "@/containers/search-page/interfaces";
import { ISearchPlacesRequest } from "@/services/search-service/interfaces/interfaces";
import searchService from "@/services/search-service/search.service";
import useSearchPagination from "./useSearchPagination";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectSearchFilters,
  setFilters,
} from "@/store/search-slice/search.slice";

const usePlacesSearch = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const initialFilters = useAppSelector(selectSearchFilters);
  const [mapResults, setMapResults] = useState<ISearchPlace[]>([]);

  const formContext = useForm<ISearchForm>({
    mode: "onChange",
    defaultValues: initialFilters,
  });

  const fetchMapResults = () => {
    const data = formContext.getValues();
    const payload: ISearchPlacesRequest = {
      searchCoordinates: data.search,
      radius: data.radius,
      categoriesIds: data.categories,
      typesIds: data.types,
      title: data.title,
      orderBy: +data.orderBy,
      // all places should be visible on map
      page: 0,
      pageSize: 1000,
    };
    searchService
      .search(i18n.language, payload)
      .then((res) => setMapResults(res.data.items))
      .catch((e) => {});
  };

  const apiCall = useCallback(
    (pagination: IPaginationRequest) => {
      const data = formContext.getValues();
      const payload: ISearchPlacesRequest = {
        searchCoordinates: data.search,
        radius: data.radius,
        categoriesIds: data.categories,
        typesIds: data.types,
        title: data.title,
        orderBy: +data.orderBy,
        ...pagination,
      };
      return searchService.search(i18n.language, payload);
    },
    [i18n.language]
  );

  const paginator = useSearchPagination({
    pageSize: searchService.SEARCH_PLACES_PER_PAGE,
    apiCall: apiCall,
  });

  const onSubmit = () => {
    formContext.handleSubmit((data) => {
      dispatch(setFilters(data));
      fetchMapResults();
      paginator.fetch();
    })();
  };

  useEffect(() => {
    onSubmit();
  }, [i18n.language]);

  return {
    mapResults,
    formContext,
    onSubmit,
    items: paginator.items,
    changeCurrentPage: paginator.changeCurrentPage,
    loading: paginator.loading,
    currentPage: paginator.currentPage,
    totalItems: paginator.totalItems,
    totalPages: paginator.totalPages,
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
