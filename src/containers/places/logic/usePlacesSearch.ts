import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form-mui";
import { useCallback, useEffect, useRef } from "react";
import {
  ISearchForm,
  SearchModesEnum,
} from "@/containers/places/logic/interfaces";
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
import useAnalytics from "@/hooks/analytics/useAnalytics";
import { AnalyticsEventsEnum } from "@/hooks/analytics/analytic-events.enum";
import { useRouter } from "next/router";

const usePlacesSearch = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const initialFilters = useAppSelector(selectSearchFilters);
  const isDataFetched = useAppSelector(selectIsDataFetched);
  const isFirstFetchRef = useRef(true);
  const currentItemsLength = useAppSelector(selectCurrentItemsLength);
  const sendAnalytics = useAnalytics();
  const router = useRouter();

  const formContext = useForm<ISearchForm>({
    mode: "onChange",
    defaultValues: initialFilters,
  });

  useEffect(() => {
    if (!router.isReady) return;

    // Create a clean filters object that automatically excludes undefined values
    const queryFilters: Partial<ISearchForm> = Object.entries(
      router.query
    ).reduce((acc, [key, value]) => {
      if (value === undefined || value === "") return acc;

      switch (key) {
        case "orderBy":
          return { ...acc, orderBy: value as any };
        case "types":
          return { ...acc, types: (value as string).split(",").map(Number) };
        default:
          return acc;
      }
    }, {} as Partial<ISearchForm>);

    if (Object.keys(queryFilters).length > 0) {
      formContext.reset({
        ...formContext.getValues(),
        ...queryFilters,
      });
    }
  }, [router.isReady]);

  const onSubmit = useCallback(
    (fromStart = true) => {
      formContext.handleSubmit((data) => {
        if (fromStart) {
          sendAnalytics(AnalyticsEventsEnum.CustomClick, {
            title: "search places filters submit",
          });
        }
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
          search: data.search,
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
    if (!router.isReady) return;
    if (
      isDataFetched &&
      isFirstFetchRef.current &&
      Object.keys(router.query).length === 0
    )
      return;
    isFirstFetchRef.current = false;
    onSubmit();
  }, [i18n.language, router.isReady]);

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
