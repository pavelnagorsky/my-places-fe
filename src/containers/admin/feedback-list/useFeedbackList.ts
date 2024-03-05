import usePagination from "@/hooks/usePagination";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form-mui";
import { IPaginationRequest } from "@/services/interfaces";
import utils from "@/shared/utils";
import { IFeedbackListFiltersForm } from "@/containers/admin/feedback-list/interfaces";
import { IFeedbackListRequest } from "@/services/contact-service/interfaces/interfaces";
import contactService from "@/services/contact-service/contact.service";
import { IFeedback } from "@/services/contact-service/interfaces/feedback.interface";

const useFeedbackList = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const onChangePageSize = (size: number) => {
    setRowsPerPage(size);
  };

  const formContext = useForm<IFeedbackListFiltersForm>({
    defaultValues: {
      authorEmail: "",
      statuses: [],
      requestTypes: [],
      dateTo: null,
      dateFrom: null,
    },
  });

  const apiCall = useCallback((pagination: IPaginationRequest) => {
    const data = formContext.getValues();
    const payload: IFeedbackListRequest = {
      authorEmail: data.authorEmail,
      statuses: data.statuses,
      requestTypes: data.requestTypes,
      dateFrom: data.dateFrom
        ? utils.parseFilterDate(data.dateFrom, true)
        : null,
      dateTo: data.dateTo ? utils.parseFilterDate(data.dateTo, false) : null,
      ...pagination,
    };
    return contactService.getList(payload);
  }, []);

  const paginator = usePagination<IFeedback>({
    defaultOrderBy: 1,
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
  }, []);

  return {
    formContext,
    rowsPerPage,
    onSubmit,
    onChangePageSize,
    items: paginator.items,
    changeCurrentPage: paginator.changeCurrentPage,
    loading: paginator.loading,
    currentPage: paginator.currentPage,
    totalItems: paginator.totalItems,
    totalPages: paginator.totalPages,
  };
};

export default useFeedbackList;
