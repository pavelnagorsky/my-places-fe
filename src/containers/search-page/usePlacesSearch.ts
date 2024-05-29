import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form-mui";
import { useCallback, useEffect, useRef, useState } from "react";
import { IPaginationRequest, IPaginationResponse } from "@/services/interfaces";
import usePagination from "@/hooks/usePagination";
import { ISearchPlace } from "@/services/search-service/interfaces/search-place.interface";
import { ISearchForm } from "@/containers/search-page/interfaces";
import { ISearchPlacesRequest } from "@/services/search-service/interfaces/interfaces";
import searchService from "@/services/search-service/search.service";

const usePlacesSearch = (ssrResults?: IPaginationResponse<ISearchPlace>) => {
  const { i18n } = useTranslation();
  // flag to skip first fetch to support SSR results
  const skipFirstFetchRef = useRef(true);

  const [mapResults, setMapResults] = useState<ISearchPlace[]>(
    ssrResults?.items || []
  );

  const formContext = useForm<ISearchForm>({
    mode: "onChange",
    defaultValues: {
      title: "",
      radius: 100,
      searchByMe: false,
      types: [],
      categories: [],
      search: null,
      locationTitle: "",
      locationInputValue: "",
      showMap: false,
    },
  });

  const fetchMapResults = () => {
    const data = formContext.getValues();
    const payload: ISearchPlacesRequest = {
      searchCoordinates: data.search,
      radius: data.radius,
      categoriesIds: data.categories,
      typesIds: data.types,
      title: data.title,
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
        ...pagination,
      };
      return searchService.search(i18n.language, payload);
    },
    [i18n.language]
  );

  const paginator = usePagination<ISearchPlace>({
    defaultOrderBy: 1, // no order by on search
    pageSize: searchService.SEARCH_PLACES_PER_PAGE,
    apiCall: apiCall,
    defaultItems: ssrResults?.items,
    defaultTotalItems: ssrResults?.totalItems,
  });

  const onSubmit = () => {
    formContext.handleSubmit((data) => {
      fetchMapResults()
      paginator.fetch();
    })();
  };

  useEffect(() => {
    formContext.handleSubmit((data) => {
      fetchMapResults()
    })();
    if (skipFirstFetchRef.current) {
      skipFirstFetchRef.current = false;
      return;
    }
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
