import { useForm } from "react-hook-form-mui";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import useScrollPagination from "@/hooks/useScrollPagination";
import { IPaginationRequest } from "@/services/interfaces";
import utils from "@/shared/utils";
import {
  IModerationExcursionsRequest,
  ModerationExcursionsOrderByEnum,
} from "@/services/excursions-service/interfaces/interfaces";
import excursionsService from "@/services/excursions-service/excursions.service";
import { IModerationExcursionsFormContext } from "@/containers/moderation/excursions/excursions-list/logic/interfaces";
import { IExcursionModerationItem } from "@/services/excursions-service/interfaces/excursion-moderation-item.interface";

const useModerationExcursions = () => {
  const { i18n } = useTranslation();

  const formContext = useForm<IModerationExcursionsFormContext>({
    defaultValues: {
      search: "",
      dateTo: null,
      dateFrom: null,
    },
  });

  const apiCall = useCallback(
    (pagination: IPaginationRequest<ModerationExcursionsOrderByEnum>) => {
      const data = formContext.getValues();
      const payload: IModerationExcursionsRequest = {
        search: data.search,
        dateFrom: data.dateFrom
          ? utils.parseFilterDate(data.dateFrom, true)
          : null,
        dateTo: data.dateTo ? utils.parseFilterDate(data.dateTo, false) : null,
        ...pagination,
      };
      return excursionsService.getModerationExcursions(payload, i18n.language);
    },
    [i18n.language]
  );

  const paginator = useScrollPagination<
    IExcursionModerationItem,
    ModerationExcursionsOrderByEnum
  >({
    defaultOrderBy: ModerationExcursionsOrderByEnum.UPDATED_AT,
    pageSize: excursionsService.MODERATION_EXCURSIONS_ITEMS_PER_PAGE,
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

export default useModerationExcursions;
