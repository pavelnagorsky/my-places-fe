import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form-mui";
import { IPaginationRequest } from "@/services/interfaces";
import utils from "@/shared/utils";
import usePagination from "@/hooks/usePagination";
import placesService from "@/services/places-service/places.service";
import { useTranslation } from "next-i18next";
import { IAdminExcursionsFormContext } from "@/containers/admin/excursions/excursions-list/logic/interfaces";
import {
  IAdminExcursionsRequest,
  MyExcursionsOrderByEnum,
} from "@/services/excursions-service/interfaces/interfaces";
import excursionsService from "@/services/excursions-service/excursions.service";
import { IExcursionListItem } from "@/services/excursions-service/interfaces/excursion-list-item.interface";

const useExcursions = () => {
  const { i18n } = useTranslation();
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const onChangePageSize = (size: number) => {
    setRowsPerPage(size);
  };

  const formContext = useForm<IAdminExcursionsFormContext>({
    defaultValues: {
      search: "",
      statuses: [],
      dateTo: null,
      dateFrom: null,
      users: [],
    },
  });

  const apiCall = useCallback(
    (pagination: IPaginationRequest<MyExcursionsOrderByEnum>) => {
      const data = formContext.getValues();
      const payload: IAdminExcursionsRequest = {
        search: data.search,
        statuses: (data.statuses || []).map((sId) => +sId),
        dateFrom: data.dateFrom
          ? utils.parseFilterDate(data.dateFrom, true)
          : null,
        dateTo: data.dateTo ? utils.parseFilterDate(data.dateTo, false) : null,
        userIds: data.users.map((u) => u.id),
        ...pagination,
      };
      return excursionsService.getAdminExcursions(payload, i18n.language);
    },
    [i18n.language]
  );

  const paginator = usePagination<IExcursionListItem, MyExcursionsOrderByEnum>({
    defaultOrderBy: MyExcursionsOrderByEnum.CREATED_AT,
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

export default useExcursions;
