import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { SubmitHandler, useForm } from "react-hook-form-mui";
import { IEditPlaceContext } from "@/containers/personal-area/my-places/edit-my-place/interfaces";
import { hideAlert, showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { useAppDispatch } from "@/store/hooks";
import placesService from "@/services/places-service/places.service";
import { routerLinks } from "@/routing/routerLinks";
import { useRouter } from "next/router";
import { IUpdatePlace } from "@/services/places-service/interfaces/update-place.interface";

const useEditMyPlace = () => {
  const { i18n, t } = useTranslation(["place-management", "common"]);
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

  const onGoBack = () => router.replace(routerLinks.personalAreaPlaces);

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
          title: t("feedback.error", { ns: "common" }),
          description: `${t("feedback.update.error")} ${t(
            "errors.description",
            { ns: "common" }
          )}`,
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
          title: t("feedback.success", { ns: "common" }),
          description: t("feedback.update.success"),
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
      .updatePlace(+placeId, updatePlaceDto, i18n.language)
      .then((res) => {
        setSubmitLoading(false);
        handleShowSuccess();
        router.push(routerLinks.personalAreaPlaces);
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

export default useEditMyPlace;
