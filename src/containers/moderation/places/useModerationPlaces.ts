import { useForm } from "react-hook-form-mui";
import { useCallback, useEffect } from "react";
import { useTranslation } from "next-i18next";
import {
  IModerationPlacesRequest,
  ModerationPlacesOrderByEnum,
} from "@/services/places-service/interfaces/interfaces";
import placesService from "@/services/places-service/places.service";
import { IModerationPlacesFormContext } from "@/containers/moderation/places/interfaces";
import { IModerationPlace } from "@/services/places-service/interfaces/moderation-place.interface";
import useScrollPagination from "@/hooks/useScrollPagination";
import { IPaginationRequest } from "@/services/interfaces";
import utils from "@/shared/utils";

const useModerationPlaces = () => {
  const { i18n } = useTranslation();

  const formContext = useForm<IModerationPlacesFormContext>({
    defaultValues: {
      search: "",
      authorEmail: "",
      dateTo: null,
      dateFrom: null,
    },
  });

  const apiCall = useCallback(
    (pagination: IPaginationRequest<ModerationPlacesOrderByEnum>) => {
      const data = formContext.getValues();
      const payload: IModerationPlacesRequest = {
        search: data.search,
        authorEmail: data.authorEmail,
        dateFrom: data.dateFrom
          ? utils.parseFilterDate(data.dateFrom, true)
          : null,
        dateTo: data.dateTo ? utils.parseFilterDate(data.dateTo, false) : null,
        ...pagination,
      };
      return placesService.getModerationPlaces(i18n.language, payload);
    },
    [i18n.language]
  );

  const paginator = useScrollPagination<
    IModerationPlace,
    ModerationPlacesOrderByEnum
  >({
    defaultOrderBy: ModerationPlacesOrderByEnum.UPDATED_AT,
    pageSize: placesService.MODERATION_PLACES_ITEMS_PER_PAGE,
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

export default useModerationPlaces;
