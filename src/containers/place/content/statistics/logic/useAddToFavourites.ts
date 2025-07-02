import placesService from "@/services/places-service/places.service";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { StatisticEntitiesEnum } from "@/services/reports-service/enums";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectIsAuth } from "@/store/user-slice/user.slice";
import { useState } from "react";
import { useTranslation } from "next-i18next";

const useAddToFavourites = ({
  entityType,
  entityId,
}: {
  entityId: number;
  entityType: StatisticEntitiesEnum;
}) => {
  const isAuth = useAppSelector(selectIsAuth);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["place", "common"]);

  // TODO: service factory
  const handleAddToFavorites = () => {
    if (!isAuth || loading) return;

    setLoading(true);
    placesService
      .addPlaceToFavourites(entityId)
      .then(() => {
        dispatch(
          showAlertThunk({
            alertProps: {
              title: t("feedback.success", { ns: "common" }),
              description: t("favourites.feedback.success"),
              variant: "standard",
              severity: "success",
            },
            snackbarProps: {},
          })
        );
      })
      .catch(() => {
        dispatch(
          showAlertThunk({
            alertProps: {
              title: t("feedback.error", { ns: "common" }),
              description: t("favourites.feedback.error"),
              variant: "standard",
              severity: "error",
            },
            snackbarProps: {},
          })
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { handleAddToFavorites, addToFavouritesLoading: loading };
};

export default useAddToFavourites;
