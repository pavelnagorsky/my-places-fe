import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form-mui";
import { useCallback, useEffect, useRef } from "react";
import {
  ISearchForm,
  SearchModesEnum,
} from "@/containers/search-page/logic/interfaces";
import { ISearchPlacesRequest } from "@/services/search-service/interfaces/interfaces";
import searchService from "@/services/search-service/search.service";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectCurrentItemsLength,
  selectIsDataFetched,
  selectSearchFilters,
  setFilters,
} from "@/store/search-slice/search.slice";
import utils from "@/shared/utils";
import {
  getMapResultsThunk,
  getPlaceCategoriesThunk,
  getPlaceTypesThunk,
  getSearchResultsThunk,
} from "@/store/search-slice/thunks";

const usePlacesSearch = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const initialFilters = useAppSelector(selectSearchFilters);
  const isDataFetched = useAppSelector(selectIsDataFetched);
  const isFirstFetchRef = useRef(true);
  const currentItemsLength = useAppSelector(selectCurrentItemsLength);

  const formContext = useForm<ISearchForm>({
    mode: "onChange",
    defaultValues: initialFilters,
  });

  const onSubmit = useCallback(
    (fromStart = true) => {
      formContext.handleSubmit((data) => {
        // calculate page for pagination
        const requestedPage = fromStart
          ? 0
          : utils.calculateCurrentScrollPage(
              currentItemsLength,
              searchService.SEARCH_PLACES_PER_PAGE
            );
        const payload: ISearchPlacesRequest & { language: string } = {
          searchStartCoordinates: data.locationStartCoordinates,
          searchEndCoordinates:
            data.mode === SearchModesEnum.ROUTE
              ? data.locationEndCoordinates
              : null,
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
    },
    [i18n.language, dispatch, currentItemsLength]
  );

  useEffect(() => {
    if (isDataFetched && isFirstFetchRef.current) return;
    isFirstFetchRef.current = false;
    onSubmit();
  }, [i18n.language, isDataFetched]);

  useEffect(() => {
    dispatch(getPlaceTypesThunk({ language: i18n.language }));
    dispatch(getPlaceCategoriesThunk({ language: i18n.language }));
  }, [i18n.language]);

  return {
    formContext,
    onSubmit,
  };
};

export default usePlacesSearch;
