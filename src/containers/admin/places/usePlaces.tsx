import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form-mui";
import { IPaginationRequest } from "@/services/interfaces";
import utils from "@/shared/utils";
import usePagination from "@/hooks/usePagination";
import { IMyPlace } from "@/services/places-service/interfaces/my-place.interface";
import {
  IMyPlacesRequest,
  MyPlacesOrderByEnum,
} from "@/services/places-service/interfaces/interfaces";
import { IMyPlacesFormContext } from "@/containers/personal-area/my-places/interfaces";
import placesService from "@/services/places-service/places.service";
import { useTranslation } from "next-i18next";

const usePlaces = () => {
  const { i18n } = useTranslation();
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const onChangePageSize = (size: number) => {
    setRowsPerPage(size);
  };

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
      return placesService.getAdminPlaces(i18n.language, payload);
    },
    [i18n.language]
  );

  const paginator = usePagination<IMyPlace, MyPlacesOrderByEnum>({
    defaultOrderBy: MyPlacesOrderByEnum.CREATED_AT,
    pageSize: rowsPerPage,
    apiCall,
    keepItems: true,
  });

  const onSubmit = () => {
    formContext.handleSubmit((data) => {
      paginator.fetch();
    })();
  };

  useEffect(() => {
    onSubmit();
  }, [i18n.language, paginator.orderBy, paginator.orderDirection, rowsPerPage]);

  return {
    formContext,
    rowsPerPage,
    onSubmit,
    onChangePageSize,
    items: paginator.items,
    orderBy: paginator.orderBy,
    orderDirection: paginator.orderDirection,
    changeOrderBy: paginator.changeOrderBy,
    toggleOrderDirection: paginator.toggleOrderDirection,
    changeCurrentPage: paginator.changeCurrentPage,
    loading: paginator.loading,
    currentPage: paginator.currentPage,
    totalItems: paginator.totalItems,
    totalPages: paginator.totalPages,
  };
};

export default usePlaces;
