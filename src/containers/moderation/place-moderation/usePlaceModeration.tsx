import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { SubmitHandler, useForm } from "react-hook-form-mui";
import { IEditPlaceContext } from "@/containers/personal-area/edit-my-place/interfaces";
import { hideAlert, showAlert } from "@/store/alerts-slice/alerts.slice";
import { useAppDispatch } from "@/store/hooks";
import placesService from "@/services/places-service/places.service";
import { routerLinks } from "@/routing/routerLinks";
import { useRouter } from "next/router";

const useEditMyPlace = () => {
  const { i18n } = useTranslation();
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
      showAlert({
        alertProps: {
          title: "Ошибка!",
          description:
            "Место не найдено. Проверьте введенные данные и сетевое подключение или обратитесь в нашу службу поддержки...",
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

export default useEditMyPlace;
