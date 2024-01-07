import { useForm } from "react-hook-form-mui";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { IMyPlace } from "@/services/places-service/interfaces/my-place.interface";
import { IMyPlacesFormContext } from "@/containers/personal-area/my-places/interfaces";
import {
  IMyPlacesRequest,
  MyPlacesOrderByEnum,
} from "@/services/places-service/interfaces/interfaces";
import placesService from "@/services/places-service/places.service";
import { OrderDirectionsEnum } from "@/shared/interfaces";
import { showAlert } from "@/store/alerts-slice/alerts.slice";
import { useAppDispatch } from "@/store/hooks";

const useMyPlaces = () => {
  const [places, setPlaces] = useState<IMyPlace[]>([]);
  const dispatch = useAppDispatch();
  const [lastIndex, setLastIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [noPlaces, setNoPlaces] = useState(false);
  const [orderBy, setOrderBy] = useState<MyPlacesOrderByEnum>(
    MyPlacesOrderByEnum.CREATED_AT
  );
  const [orderDirection, setOrderDirection] = useState<OrderDirectionsEnum>(
    OrderDirectionsEnum.DESC
  );
  const { i18n } = useTranslation();
  const formContext = useForm<IMyPlacesFormContext>({
    defaultValues: {
      search: "",
      statuses: [],
      dateTo: null,
      dateFrom: null,
    },
  });

  const handleDelete = (placeId: number) => {
    placesService
      .deletePlace(placeId)
      .then(() => {
        dispatch(
          showAlert({
            alertProps: {
              title: "Успех!",
              description: "Место было успешно удалено.",
              variant: "standard",
              severity: "success",
            },
            snackbarProps: {},
          })
        );
        const filteredPlaces = places.filter((p) => p.id !== placeId);
        setPlaces(filteredPlaces);
        if (filteredPlaces.length === 0) {
          setNoPlaces(true);
        }
      })
      .catch(() => {
        dispatch(
          showAlert({
            alertProps: {
              title: "Ошибка!",
              description:
                "Не удалось удалить место. Проверьте введенные данные и сетевое подключение или обратитесь в нашу службу поддержки...",
              variant: "standard",
              severity: "error",
            },
            snackbarProps: {},
          })
        );
      });
  };

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
      const payload: IMyPlacesRequest = {
        search: data.search,
        statuses: (data.statuses || []).map((sId) => +sId),
        dateFrom: data.dateFrom ? new Date(data.dateFrom).toISOString() : null,
        dateTo: data.dateTo ? new Date(data.dateTo).toISOString() : null,
        itemsPerPage: placesService.MY_PLACES_ITEMS_PER_PAGE,
        lastIndex: fromStart ? 0 : lastIndex,
        orderBy: orderBy,
        orderAsc: orderDirection === OrderDirectionsEnum.ASC,
      };
      placesService
        .getMyPlaces(i18n.language, payload)
        .then((res) => {
          setNoPlaces(res.data.data.length === 0);
          setHasMore(res.data.hasMore);
          setLastIndex(fromStart ? res.data.data.length : res.data.lastIndex);
          setPlaces(fromStart ? res.data.data : places.concat(res.data.data));
        })
        .catch((reason) => {
          setNoPlaces(true);
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
    handleDelete,
  };
};

export default useMyPlaces;
