import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { SubmitHandler, useForm } from "react-hook-form-mui";
import { IEditPlaceContext } from "@/containers/personal-area/my-places/edit-my-place/interfaces";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { useAppDispatch } from "@/store/hooks";
import placesService from "@/services/places-service/places.service";
import { routerLinks } from "@/routing/routerLinks";
import { useRouter } from "next/router";

const usePlaceModeration = () => {
  const { t } = useTranslation(["place-management", "common"]);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const placeId = router.query["id"] as string | undefined;
  const [loading, setLoading] = useState(true);

  const form = useForm<IEditPlaceContext>({
    defaultValues: {
      images: [],
      title: "",
      description: "",
      categoriesIds: [],
      isCommercial: false,
      updateTranslations: false,
    },
    shouldFocusError: true,
    shouldUseNativeValidation: false,
  });

  const onGoBack = () => router.replace(routerLinks.moderationPlaces);

  const handleShowNotFoundError = () => {
    dispatch(
      showAlertThunk({
        alertProps: {
          title: t("feedback.error", { ns: "common" }),
          description: `${t("feedback.notFound")} ${t("errors.description", {
            ns: "common",
          })}`,
          variant: "standard",
          severity: "error",
        },
        snackbarProps: {},
      })
    );
    onGoBack();
  };

  useEffect(() => {
    // fetch place data for editing
    if (!placeId || Number.isNaN(+placeId)) {
      handleShowNotFoundError();
      return;
    }
    setLoading(true);
    placesService
      .getPlaceForModeration(+placeId)
      .then(({ data }) => {
        // reset form state
        form.reset({
          updateTranslations: false,
          title: data.title,
          description: data.description,
          address: data.address,
          lat: data.coordinates.lat,
          lng: data.coordinates.lng,
          isCommercial: data.advertisement,
          categoriesIds: data.categoriesIds,
          placeTypeId: data.typeId,
          images: data.images,
          attachments: data.files,
          website: data.website || undefined,
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        return handleShowNotFoundError();
      });
  }, [placeId]);

  return {
    form,
    loading,
    onGoBack,
    placeId: placeId ? +placeId : null,
  };
};

export default usePlaceModeration;
