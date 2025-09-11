import { Fragment, useState } from "react";
import {
  FormContainer,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form-mui";
import { IPlaceFormContext } from "@/containers/create-place/form/interfaces";
import PlaceForm from "@/containers/create-place/form/PlaceForm";
import { ICreatePlace } from "@/services/places-service/interfaces/create-place.interface";
import placesService from "@/services/places-service/places.service";
import { useTranslation } from "next-i18next";
import { useAppDispatch } from "@/store/hooks";
import { hideAlert, showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { useRouter } from "next/router";
import { routerLinks } from "@/routing/routerLinks";
import ProtectedAuth from "@/hoc/ProtectedAuth";
import usePlaceForm from "@/containers/create-place/logic/usePlaceForm";

const CreatePlace = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation(["place-management", "common"]);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const form = usePlaceForm();

  const handleShowError = () => {
    dispatch(
      showAlertThunk({
        alertProps: {
          title: t("feedback.error", {
            ns: "common",
          }),
          description: `${t("feedback.create.error")} ${t(
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
  };

  const handleShowSuccess = () => {
    dispatch(
      showAlertThunk({
        alertProps: {
          title: t("feedback.success", {
            ns: "common",
          }),
          description: t("feedback.create.success"),
          variant: "standard",
          severity: "success",
        },
        snackbarProps: {},
      })
    );
  };

  const onSubmit: SubmitHandler<IPlaceFormContext> = (data) => {
    if (loading) return;
    setLoading(true);
    dispatch(hideAlert());

    const createPlaceDto: ICreatePlace = {
      title: data.title,
      description: data.description,
      address: data.address,
      website: data.website,
      placeTypeId: data.placeTypeId,
      categoriesIds: data.categoriesIds,
      coordinates: `${data.lat};${data.lng}`,
      imagesIds: data.images.map((image) => image.id),
      isCommercial: data.isCommercial,
      fileIds: data.attachments.map((attachment) => attachment.id),
    };

    placesService
      .createPlace(createPlaceDto, i18n.language)
      .then((res) => {
        setLoading(false);
        form.reset();
        handleShowSuccess();
        router.push(routerLinks.createReview + `?placeId=${res.data.id}`);
      })
      .catch((reason) => {
        setLoading(false);
        handleShowError();
      });
  };

  return (
    <ProtectedAuth mode={"redirectAfter"}>
      <FormProvider {...form}>
        <FormContainer
          onError={(errors) => console.log(errors)}
          formContext={form}
          onSuccess={onSubmit}
        >
          <PlaceForm loading={loading} />
        </FormContainer>
      </FormProvider>
    </ProtectedAuth>
  );
};

export default CreatePlace;
