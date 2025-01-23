import { useTranslation } from "next-i18next";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form-mui";
import { IEditPlaceContext } from "@/containers/personal-area/my-places/edit-my-place/interfaces";
import { routerLinks } from "@/routing/routerLinks";
import { hideAlert, showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import placesService from "@/services/places-service/places.service";
import { IUpdatePlace } from "@/services/places-service/interfaces/update-place.interface";

const useEditPlace = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const placeId = router.query["id"] as string | undefined;
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const form = useForm<IEditPlaceContext>({
    defaultValues: {
      images: [],
      title: "",
      description: "",
      categoriesIds: [],
      isCommercial: false,
      updateTranslations: false,
    },
    mode: "onChange",
    shouldFocusError: true,
    shouldUseNativeValidation: false,
  });

  const onGoBack = () => router.back();

  const handleShowNotFoundError = () => {
    dispatch(
      showAlertThunk({
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
      .getPlaceForEdit(+placeId, i18n.language)
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
  }, [i18n.language, placeId]);

  const handleShowError = () => {
    dispatch(
      showAlertThunk({
        alertProps: {
          title: "Ошибка!",
          description:
            "Ошибка при обновлении места. Проверьте введенные данные и сетевое подключение или обратитесь в нашу службу поддержки...",
          variant: "standard",
          severity: "error",
        },
        snackbarProps: {},
      })
    );
  };

  const handleShowSuccess = () => {
    dispatch(
      showAlertThunk({
        alertProps: {
          title: "Успех!",
          description: "Место было успешно обновлено",
          variant: "standard",
          severity: "success",
        },
        snackbarProps: {},
      })
    );
  };

  const onSubmit: SubmitHandler<IEditPlaceContext> = (data) => {
    if (submitLoading || !placeId) return;
    setSubmitLoading(true);
    dispatch(hideAlert());

    const updatePlaceDto: IUpdatePlace = {
      title: data.title,
      description: data.description,
      address: data.address,
      website: data.website,
      placeTypeId: data.placeTypeId,
      categoriesIds: data.categoriesIds,
      coordinates: `${data.lat};${data.lng}`,
      imagesIds: data.images.map((image) => image.id),
      isCommercial: data.isCommercial,
      shouldTranslate: data.updateTranslations,
    };

    placesService
      .updatePlaceByAdmin(+placeId, updatePlaceDto, i18n.language)
      .then((res) => {
        setSubmitLoading(false);
        handleShowSuccess();
        router.push(routerLinks.administrationPlace(+placeId));
      })
      .catch((reason) => {
        setSubmitLoading(false);
        handleShowError();
      });
  };

  return {
    form,
    onSubmit,
    loading,
    submitLoading,
    onGoBack,
  };
};

export default useEditPlace;
