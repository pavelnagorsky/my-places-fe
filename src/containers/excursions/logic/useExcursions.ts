import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form-mui";
import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectCurrentItemsLength,
  selectIsDataFetched,
  selectSearchFilters,
  selectSearchFiltersLoading,
} from "@/store/excursions-slice/excursions.selectors";
import utils from "@/shared/utils";
import { IExcursionsFilters } from "@/containers/excursions/logic/interfaces";
import excursionsService from "@/services/excursions-service/excursions.service";
import { ISearchExcursionsRequest } from "@/services/excursions-service/interfaces/interfaces";
import { setFilters } from "@/store/excursions-slice/excursions.slice";
import { getSearchResultsThunk } from "@/store/excursions-slice/excursions.thunks";
import { SearchExcursionsOrderByEnum } from "@/services/excursions-service/enums/enums";

const useExcursions = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const initialFilters = useAppSelector(selectSearchFilters);
  const isDataFetched = useAppSelector(selectIsDataFetched);
  const isFirstFetchRef = useRef(true);
  const currentItemsLength = useAppSelector(selectCurrentItemsLength);
  const loading = useAppSelector(selectSearchFiltersLoading);

  const form = useForm<IExcursionsFilters>({
    mode: "onChange",
    defaultValues: initialFilters,
  });

  const onSubmit = useCallback(
    (fromStart = true) => {
      form.handleSubmit((data) => {
        if (loading) return;
        // calculate page for pagination
        const requestedPage = fromStart
          ? 0
          : utils.calculateCurrentScrollPage(
              currentItemsLength,
              excursionsService.SEARCH_EXCURSIONS_PER_PAGE
            );
        const payload: ISearchExcursionsRequest = {
          search: data.search,
          types: data.types,
          travelModes: data.travelModes,
          orderBy: +data.orderBy,
          pageSize: excursionsService.SEARCH_EXCURSIONS_PER_PAGE,
          page: requestedPage,
          orderAsc: +data.orderBy === SearchExcursionsOrderByEnum.TITLE,
        };
        if (fromStart) {
          dispatch(setFilters(data));
        }
        dispatch(
          getSearchResultsThunk({ data: payload, language: i18n.language })
        );
      })();
    },
    [i18n.language, dispatch, currentItemsLength, loading]
  );

  useEffect(() => {
    if (isDataFetched && isFirstFetchRef.current) return;
    isFirstFetchRef.current = false;
    onSubmit();
  }, [i18n.language, isDataFetched]);

  return {
    form,
    onSubmit,
  };
};

export default useExcursions;
