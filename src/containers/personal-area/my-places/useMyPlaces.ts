import { useForm } from "react-hook-form-mui";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { IMyPlace } from "@/services/places-service/interfaces/my-place.interface";
import { IMyPlacesFormContext } from "@/containers/personal-area/my-places/interfaces";
import {
  IMyPlacesRequest,
  MyPlacesOrderByEnum,
} from "@/services/places-service/interfaces/interfaces";
import placesService from "@/services/places-service/places.service";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { useAppDispatch } from "@/store/hooks";
import useScrollPagination from "@/hooks/useScrollPagination";
import { IPaginationRequest } from "@/services/interfaces";
import utils from "@/shared/utils";

const useMyPlaces = () => {
  const { t, i18n } = useTranslation(["personal-area", "common"]);
  const dispatch = useAppDispatch();

  const formContext = useForm<IMyPlacesFormContext>({
    defaultValues: {
      search: "",
      statuses: [],
      dateTo: null,
      dateFrom: null,
    },
  });

  const apiCall = useCallback(
    (pagination: IPaginationRequest<MyPlacesOrderByEnum>) => {
      const data = formContext.getValues();
      const payload: IMyPlacesRequest = {
        search: data.search,
        statuses: (data.statuses || []).map((sId) => +sId),
        dateFrom: data.dateFrom
          ? utils.parseFilterDate(data.dateFrom, true)
          : null,
        dateTo: data.dateTo ? utils.parseFilterDate(data.dateTo, false) : null,
        ...pagination,
      };
      return placesService.getMyPlaces(i18n.language, payload);
    },
    [i18n.language]
  );

  const paginator = useScrollPagination<IMyPlace, MyPlacesOrderByEnum>({
    defaultOrderBy: MyPlacesOrderByEnum.CREATED_AT,
    pageSize: placesService.MY_PLACES_ITEMS_PER_PAGE,
    apiCall: apiCall,
  });

  const onSubmit = (fromStart = true) => {
    formContext.handleSubmit((data) => {
      paginator.fetch(fromStart);
    })();
  };

  useEffect(() => {
    onSubmit();
  }, [i18n.language, paginator.orderBy, paginator.orderDirection]);

  const handleDelete = (placeId: number) => {
    placesService
      .deletePlace(placeId)
      .then(() => {
        dispatch(
          showAlertThunk({
            alertProps: {
              title: t("feedback.success", { ns: "common" }),
              description: t("places.feedback.delete.success"),
              variant: "standard",
              severity: "success",
            },
            snackbarProps: {},
          })
        );
        const filteredPlaces = paginator.items.filter((p) => p.id !== placeId);
        paginator.setItems(filteredPlaces);
      })
      .catch(() => {
        dispatch(
          showAlertThunk({
            alertProps: {
              title: t("feedback.error", { ns: "common" }),
              description: `${t("places.feedback.delete.error")} ${t(
                "errors.description",
                {
                  ns: "common",
                }
              )}`,
              variant: "standard",
              severity: "error",
            },
            snackbarProps: {},
          })
        );
      });
  };

  return {
    formContext,
    onSubmit,
    handleDelete,
    items: paginator.items,
    hasMore: paginator.hasMore,
    orderBy: paginator.orderBy,
    changeOrderBy: paginator.changeOrderBy,
    orderDirection: paginator.orderDirection,
    toggleOrderDirection: paginator.toggleOrderDirection,
    noItems: paginator.noItems,
  };
};

export default useMyPlaces;
