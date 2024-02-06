import { useForm } from "react-hook-form-mui";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import {
  IModerationPlacesRequest,
  ModerationPlacesOrderByEnum,
} from "@/services/places-service/interfaces/interfaces";
import placesService from "@/services/places-service/places.service";
import { OrderDirectionsEnum } from "@/shared/interfaces";
import { IModerationPlacesFormContext } from "@/containers/moderation/places/interfaces";
import { IModerationPlace } from "@/services/places-service/interfaces/moderation-place.interface";

const useModerationPlaces = () => {
  const [places, setPlaces] = useState<IModerationPlace[]>([]);
  const [lastIndex, setLastIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [noPlaces, setNoPlaces] = useState(false);
  const [orderBy, setOrderBy] = useState<ModerationPlacesOrderByEnum>(
    ModerationPlacesOrderByEnum.UPDATED_AT
  );
  const [orderDirection, setOrderDirection] = useState<OrderDirectionsEnum>(
    OrderDirectionsEnum.DESC
  );
  const { i18n } = useTranslation();
  const formContext = useForm<IModerationPlacesFormContext>({
    defaultValues: {
      search: "",
      authorEmail: "",
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
  }, [i18n.language, orderBy, orderDirection]);

  const onSubmit = (fromStart = true) => {
    setNoPlaces(false);
    formContext.handleSubmit((data) => {
      if (fromStart) {
        setPlaces([]);
        setLastIndex(0);
      }
      const payload: IModerationPlacesRequest = {
        search: data.search,
        authorEmail: data.authorEmail,
        dateFrom: data.dateFrom ? new Date(data.dateFrom).toISOString() : null,
        dateTo: data.dateTo ? new Date(data.dateTo).toISOString() : null,
        itemsPerPage: placesService.MODERATION_PLACES_ITEMS_PER_PAGE,
        lastIndex: fromStart ? 0 : lastIndex,
        orderBy: orderBy,
        orderAsc: orderDirection === OrderDirectionsEnum.ASC,
      };
      placesService
        .getModerationPlaces(i18n.language, payload)
        .then((res) => {
          const totalPlaces = fromStart
            ? res.data.data
            : places.concat(res.data.data);
          setNoPlaces(totalPlaces.length === 0);
          setHasMore(res.data.hasMore);
          setLastIndex(totalPlaces.length);
          setPlaces(totalPlaces);
        })
        .catch((reason) => {
          setNoPlaces(places.length === 0);
          setHasMore(false);
        });
    })();
  };

  return {
    formContext,
    onSubmit,
    places,
    hasMore,
    lastIndex,
    orderBy,
    setOrderBy,
    orderDirection,
    toggleOrderDirection,
    noPlaces,
  };
};

export default useModerationPlaces;
