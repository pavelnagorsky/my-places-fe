import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form-mui";
import { IMyFavouritesFormContext } from "@/containers/personal-area/my-favourites/interfaces";
import { IFavourite } from "@/services/places-service/interfaces/favourite.interface";
import placesService from "@/services/places-service/places.service";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { IMyFavouritesRequest } from "@/services/places-service/interfaces/interfaces";
import { addRouteItemsThunk } from "@/store/route-builder-slice/thunks";
import { useRouter } from "next/router";
import { routerLinks } from "@/routing/routerLinks";
import {
  resetState,
  selectActualPlaceIds,
  setActualPlaceIds,
} from "@/store/personal-area/favourites-slice/favourites.slice";

const useMyFavourites = () => {
  const { t, i18n } = useTranslation(["personal-area", "common"]);
  const [favourites, setFavourites] = useState<IFavourite[]>([]);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const actualIds = useAppSelector(selectActualPlaceIds);

  const formContext = useForm<IMyFavouritesFormContext>({
    defaultValues: {
      search: "",
      dateTo: null,
      dateFrom: null,
    },
  });

  const canCreateRouteFromFavourites = actualIds.length > 0;

  const onCreateRouteFromFavourites = () => {
    if (!canCreateRouteFromFavourites) return;
    dispatch(
      addRouteItemsThunk({
        ids: actualIds,
        language: i18n.language,
      })
    ).then(() => {
      router.push(routerLinks.createRoute);
    });
  };

  const handleDelete = (id: number) => {
    placesService
      .deleteFavourite(id)
      .then(() => {
        dispatch(
          showAlertThunk({
            alertProps: {
              title: t("feedback.success", { ns: "common" }),
              description: t("favourites.feedback.delete.success"),
              variant: "standard",
              severity: "success",
            },
            snackbarProps: {},
          })
        );
        const filteredFavourites = favourites.filter((f) => f.id !== id);
        setFavourites(filteredFavourites);
      })
      .catch(() => {
        dispatch(
          showAlertThunk({
            alertProps: {
              title: t("feedback.error", { ns: "common" }),
              description: `${t("favourites.feedback.delete.error")} ${t(
                "errors.description",
                {
                  ns: "common",
                }
              )}`,
              variant: "standard",
              severity: "error",
            },
            snackbarProps: {},
          })
        );
      });
  };

  useEffect(() => {
    onSubmit();
  }, [i18n.language]);

  const onSubmit = () => {
    formContext.handleSubmit((data) => {
      setLoading(true);
      const payload: IMyFavouritesRequest = {
        search: data.search,
        dateFrom: data.dateFrom ? new Date(data.dateFrom).toISOString() : null,
        dateTo: data.dateTo ? new Date(data.dateTo).toISOString() : null,
      };
      placesService
        .getMyFavourites(payload, i18n.language)
        .then((res) => {
          setFavourites(res.data);
          dispatch(
            setActualPlaceIds(
              res.data.filter((fav) => fav.actual).map((fav) => fav.placeId)
            )
          );
          setLoading(false);
        })
        .catch((reason) => {
          setFavourites([]);
          setLoading(false);
        });
    })();
  };

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, []);

  return {
    formContext,
    onSubmit,
    handleDelete,
    favourites,
    loading,
    onCreateRouteFromFavourites,
    canCreateRouteFromFavourites,
  };
};

export default useMyFavourites;
