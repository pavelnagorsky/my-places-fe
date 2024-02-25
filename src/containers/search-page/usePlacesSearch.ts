import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form-mui";
import { useCallback, useEffect, useRef } from "react";
import { IPaginationRequest, IPaginationResponse } from "@/services/interfaces";
import { ISearchPlacesRequest } from "@/services/places-service/interfaces/interfaces";
import placesService from "@/services/places-service/places.service";
import usePagination from "@/hooks/usePagination";
import { ISearchPlace } from "@/services/places-service/interfaces/search-place.interface";
import { ISearchForm } from "@/containers/search-page/interfaces";

const usePlacesSearch = (ssrResults?: IPaginationResponse<ISearchPlace>) => {
  const { i18n } = useTranslation();
  // flag to skip first fetch to support SSR results
  const skipFirstFetchRef = useRef(true);

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
      return placesService.search(i18n.language, payload);
    },
    [i18n.language]
  );

  const paginator = usePagination<ISearchPlace>({
    defaultOrderBy: 1, // no order by on search
    pageSize: placesService.SEARCH_PLACES_PER_PAGE,
    apiCall: apiCall,
    defaultItems: ssrResults?.items,
    defaultTotalItems: ssrResults?.totalItems,
  });

  const onSubmit = () => {
    formContext.handleSubmit((data) => {
      paginator.fetch();
    })();
  };

  useEffect(() => {
    if (skipFirstFetchRef.current) {
      skipFirstFetchRef.current = false;
      return;
    }
    onSubmit();
  }, [i18n.language]);

  return {
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
