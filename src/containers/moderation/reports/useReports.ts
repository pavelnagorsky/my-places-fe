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
import utils from "@/shared/utils";

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
        dateFrom: data.dateFrom
          ? utils.parseFilterDate(data.dateFrom, true)
          : null,
        dateTo: data.dateTo ? utils.parseFilterDate(data.dateTo, false) : null,
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
