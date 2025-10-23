import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form-mui";
import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectCurrentItemsLength,
  selectIsDataFetched,
  selectSearchFilters,
} from "@/store/excursions-slice/excursions.selectors";
import utils from "@/shared/utils";
import { IExcursionsFilters } from "@/containers/excursions/excursions-catalog/logic/interfaces";
import excursionsService from "@/services/excursions-service/excursions.service";
import { ISearchExcursionsRequest } from "@/services/excursions-service/interfaces/interfaces";
import { setFilters } from "@/store/excursions-slice/excursions.slice";
import { getSearchResultsThunk } from "@/store/excursions-slice/excursions.thunks";
import { SearchExcursionsOrderByEnum } from "@/services/excursions-service/enums/enums";
import { useRouter } from "next/router";

const useExcursions = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const initialFilters = useAppSelector(selectSearchFilters);
  const isDataFetched = useAppSelector(selectIsDataFetched);
  const isFirstFetchRef = useRef(true);
  const currentItemsLength = useAppSelector(selectCurrentItemsLength);
  const router = useRouter();

  const form = useForm<IExcursionsFilters>({
    mode: "onChange",
    defaultValues: initialFilters,
  });

  useEffect(() => {
    if (!router.isReady) return;

    // Create a clean filters object that automatically excludes undefined values
    const queryFilters: Partial<IExcursionsFilters> = Object.entries(
      router.query
    ).reduce((acc, [key, value]) => {
      if (value === undefined || value === "") return acc;

      switch (key) {
        case "orderBy":
          return { ...acc, orderBy: value as any };
        case "types":
          return { ...acc, types: (value as string).split(",").map(Number) };
        case "placeTypeIds":
          return {
            ...acc,
            placeTypeIds: (value as string).split(",").map(Number),
          };
        case "travelModes":
          return { ...acc, travelModes: (value as string).split(",") as any };
        default:
          return acc;
      }
    }, {} as Partial<IExcursionsFilters>);

    if (Object.keys(queryFilters).length > 0) {
      form.reset({
        ...form.getValues(),
        ...queryFilters,
      });
    }
  }, [router.isReady]);

  const onSubmit = useCallback(
    (fromStart = true) => {
      form.handleSubmit((data) => {
        // calculate page for pagination
        const requestedPage = fromStart
          ? 0
          : utils.calculateCurrentScrollPage(
              currentItemsLength,
              excursionsService.SEARCH_EXCURSIONS_PER_PAGE
            );
        const getSortOrderASC = () => {
          if (
            +data.orderBy === SearchExcursionsOrderByEnum.TITLE ||
            data.isPrimary
          )
            return true;
          return false;
        };
        const payload: ISearchExcursionsRequest = {
          search: data.search,
          types: data.types,
          travelModes: data.travelModes,
          regionIds: data.regions.map((r) => r.id),
          cityIds: data.cities.map((c) => c.id),
          placeTypeIds: data.placeTypeIds,
          isPrimary: data.isPrimary,
          orderBy: +data.orderBy,
          pageSize: excursionsService.SEARCH_EXCURSIONS_PER_PAGE,
          page: requestedPage,
          orderAsc: getSortOrderASC(),
        };
        if (fromStart) {
          dispatch(setFilters(data));
        }
        dispatch(
          getSearchResultsThunk({ data: payload, language: i18n.language })
        );
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

  return {
    form,
    onSubmit,
  };
};

export default useExcursions;
