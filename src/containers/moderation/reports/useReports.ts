import { useEffect, useState } from "react";
import { CrmStatusesEnum, OrderDirectionsEnum } from "@/shared/interfaces";
import { useForm } from "react-hook-form-mui";
import { IReport } from "@/services/reports-service/interfaces/report.interface";
import {
  IGetReportsRequest,
  ReportsOrderByEnum,
} from "@/services/reports-service/interfaces/interfaces";
import { IReportsFormContext } from "@/containers/moderation/reports/interfaces";
import reportsService from "@/services/reports-service/reports.service";

const useReports = () => {
  const [reports, setReports] = useState<IReport[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [noReports, setNoReports] = useState(false);
  const [orderBy, setOrderBy] = useState<ReportsOrderByEnum>(
    ReportsOrderByEnum.CREATED_AT
  );
  const [orderDirection, setOrderDirection] = useState<OrderDirectionsEnum>(
    OrderDirectionsEnum.DESC
  );
  const formContext = useForm<IReportsFormContext>({
    defaultValues: {
      search: "",
      statuses: [],
      dateTo: null,
      dateFrom: null,
    },
  });

  const toggleOrderDirection = () => {
    if (orderDirection === OrderDirectionsEnum.DESC) {
      setOrderDirection(OrderDirectionsEnum.ASC);
    } else {
      setOrderDirection(OrderDirectionsEnum.DESC);
    }
  };

  useEffect(() => {
    onSubmit();
  }, [orderBy, orderDirection]);

  const onSubmit = (fromStart = true) => {
    formContext.handleSubmit((data) => {
      setNoReports(false);
      setHasMore(true);
      if (fromStart) {
        setReports([]);
      }
      const payload: IGetReportsRequest = {
        search: data.search,
        statuses: data.statuses.map((s) => +s),
        dateFrom: data.dateFrom ? new Date(data.dateFrom).toISOString() : null,
        dateTo: data.dateTo ? new Date(data.dateTo).toISOString() : null,
        itemsPerPage: reportsService.REPORTS_ITEMS_PER_PAGE,
        lastIndex: fromStart ? 0 : reports.length,
        orderBy: orderBy,
        orderAsc: orderDirection === OrderDirectionsEnum.ASC,
      };
      reportsService
        .getReports(payload)
        .then((res) => {
          const totalReports = fromStart
            ? res.data.data
            : reports.concat(res.data.data);
          setNoReports(totalReports.length === 0);
          setHasMore(res.data.hasMore);
          setReports(totalReports);
        })
        .catch((reason) => {
          setNoReports(reports.length === 0);
          setHasMore(false);
        });
    })();
  };

  return {
    formContext,
    onSubmit,
    reports,
    hasMore,
    orderBy,
    setOrderBy,
    orderDirection,
    toggleOrderDirection,
    noReports,
  };
};

export default useReports;
