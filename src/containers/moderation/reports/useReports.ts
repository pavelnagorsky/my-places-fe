import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form-mui";
import { IReport } from "@/services/reports-service/interfaces/report.interface";
import {
  IGetReportsRequest,
  ReportsOrderByEnum,
} from "@/services/reports-service/interfaces/interfaces";
import { IReportsFormContext } from "@/containers/moderation/reports/interfaces";
import useScrollPagination from "@/hooks/useScrollPagination";
import reportsService from "@/services/reports-service/reports.service";
import { IPaginationRequest } from "@/services/interfaces";

const useReports = () => {
  const formContext = useForm<IReportsFormContext>({
    defaultValues: {
      search: "",
      statuses: [],
      dateTo: null,
      dateFrom: null,
    },
  });

  const apiCall = useCallback(
    (pagination: IPaginationRequest<ReportsOrderByEnum>) => {
      const data = formContext.getValues();
      const payload: IGetReportsRequest = {
        search: data.search,
        statuses: data.statuses.map((s) => +s),
        dateFrom: data.dateFrom ? new Date(data.dateFrom).toISOString() : null,
        dateTo: data.dateTo ? new Date(data.dateTo).toISOString() : null,
        ...pagination,
      };
      return reportsService.getReports(payload);
    },
    []
  );

  const paginator = useScrollPagination<IReport, ReportsOrderByEnum>({
    defaultOrderBy: ReportsOrderByEnum.CREATED_AT,
    pageSize: reportsService.REPORTS_ITEMS_PER_PAGE,
    apiCall: apiCall,
  });

  const onSubmit = (fromStart = true) => {
    formContext.handleSubmit((data) => {
      paginator.fetch(fromStart);
    })();
  };

  useEffect(() => {
    onSubmit();
  }, [paginator.orderBy, paginator.orderDirection]);

  return {
    formContext,
    onSubmit,
    items: paginator.items,
    hasMore: paginator.hasMore,
    orderBy: paginator.orderBy,
    changeOrderBy: paginator.changeOrderBy,
    orderDirection: paginator.orderDirection,
    toggleOrderDirection: paginator.toggleOrderDirection,
    noItems: paginator.noItems,
  };
};

export default useReports;
