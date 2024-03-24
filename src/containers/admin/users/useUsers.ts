import usePagination from "@/hooks/usePagination";
import { IUserShortInfo } from "@/services/user-service/interfaces/user-short-info.interface";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form-mui";
import { IUsersFiltersForm } from "@/containers/admin/users/interfaces";
import { IPaginationRequest } from "@/services/interfaces";
import { IUsersRequest } from "@/services/user-service/interfaces/interfaces";
import userService from "@/services/user-service/user.service";
import utils from "@/shared/utils";

const useUsers = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const onChangePageSize = (size: number) => {
    setRowsPerPage(size);
  };

  const formContext = useForm<IUsersFiltersForm>({
    defaultValues: {
      email: "",
      isBlocked: false,
      roles: [],
      dateTo: null,
      dateFrom: null,
    },
  });

  const apiCall = useCallback((pagination: IPaginationRequest) => {
    const data = formContext.getValues();
    const payload: IUsersRequest = {
      email: data.email,
      roles: data.roles,
      isBlocked: data.isBlocked ? true : undefined,
      dateFrom: data.dateFrom
        ? utils.parseFilterDate(data.dateFrom, true)
        : null,
      dateTo: data.dateTo ? utils.parseFilterDate(data.dateTo, false) : null,
      ...pagination,
    };
    return userService.getUsersList(payload);
  }, []);

  const paginator = usePagination<IUserShortInfo>({
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
  }, [rowsPerPage]);

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

export default useUsers;
