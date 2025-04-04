import { useForm } from "react-hook-form-mui";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { useAppDispatch } from "@/store/hooks";
import useScrollPagination from "@/hooks/useScrollPagination";
import { IPaginationRequest } from "@/services/interfaces";
import utils from "@/shared/utils";
import { IMyRoutesFormContext } from "@/containers/personal-area/my-routes/interfaces";
import {
  IMyRoutesRequest,
  MyRoutesOrderByEnum,
} from "@/services/routes-service/interfaces/interfaces";
import routesService from "@/services/routes-service/routes.service";
import { IRoute } from "@/services/routes-service/interfaces/route.interface";

const useMyRoutes = () => {
  const { t, i18n } = useTranslation(["personal-area", "common"]);
  const dispatch = useAppDispatch();

  const formContext = useForm<IMyRoutesFormContext>({
    defaultValues: {
      search: "",
      dateTo: null,
      dateFrom: null,
    },
  });

  const apiCall = useCallback(
    (pagination: IPaginationRequest<MyRoutesOrderByEnum>) => {
      const data = formContext.getValues();
      const payload: IMyRoutesRequest = {
        search: data.search,
        dateFrom: data.dateFrom
          ? utils.parseFilterDate(data.dateFrom, true)
          : null,
        dateTo: data.dateTo ? utils.parseFilterDate(data.dateTo, false) : null,
        ...pagination,
      };
      return routesService.getMyRoutes(payload, i18n.language);
    },
    [i18n.language]
  );

  const paginator = useScrollPagination<IRoute, MyRoutesOrderByEnum>({
    defaultOrderBy: MyRoutesOrderByEnum.CREATED_AT,
    pageSize: routesService.MY_ROUTES_ITEMS_PER_PAGE,
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

  const handleDelete = (routeId: number) => {
    routesService
      .delete(routeId)
      .then(() => {
        dispatch(
          showAlertThunk({
            alertProps: {
              title: t("feedback.success", { ns: "common" }),
              description: t("routes.feedback.delete.success"),
              variant: "standard",
              severity: "success",
            },
            snackbarProps: {},
          })
        );
        const filteredPlaces = paginator.items.filter((r) => r.id !== routeId);
        paginator.setItems(filteredPlaces);
      })
      .catch(() => {
        dispatch(
          showAlertThunk({
            alertProps: {
              title: t("feedback.error", { ns: "common" }),
              description: `${t("routes.feedback.delete.error")} ${t(
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

export default useMyRoutes;
