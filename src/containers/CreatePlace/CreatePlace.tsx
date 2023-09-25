import { Fragment, useState } from "react";
import {
  FormContainer,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form-mui";
import { IPlaceFormContext } from "@/containers/CreatePlace/Form/interfaces";
import PlaceForm from "@/containers/CreatePlace/Form/PlaceForm";
import { ICreatePlace } from "@/services/places-service/create-place.interface";
import placesService from "@/services/places-service/places.service";
import { useTranslation } from "next-i18next";
import { useAppDispatch } from "@/store/hooks";
import { hideAlert, showAlert } from "@/store/alerts-slice/alerts.slice";
import { useRouter } from "next/router";
import { routerLinks } from "@/staticData/routerLinks";

const CreatePlace = () => {
  const router = useRouter();
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const form = useForm<IPlaceFormContext>({
    defaultValues: {
      images: [],
      title: "",
      description: "",
      categoriesIds: [],
    },
    mode: "onChange",
    shouldFocusError: true,
    shouldUseNativeValidation: false,
  });

  const handleShowError = () => {
    dispatch(
      showAlert({
        alertProps: {
          title: "Ошибка!",
          description:
            "Ошибка при создании места. Проверьте введенные данные и сетевое подключение или обратитесь в нашу службу поддержки...",
          variant: "standard",
          severity: "error",
        },
        snackbarProps: {},
      })
    );
  };

  const handleShowSuccess = () => {
    dispatch(
      showAlert({
        alertProps: {
          title: "Успех!",
          description:
            "Место было создано и отправлено на модерацию. Вы сможете просмотреть его статус в личном кабинете",
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
      slug: data.slug,
      placeTypeId: data.placeTypeId,
      categoriesIds: data.categoriesIds,
      coordinates: `${data.lat};${data.lng}`,
      imagesIds: data.images.map((image) => image.id),
    };

    placesService
      .createPlace(createPlaceDto, i18n.language)
      .then((res) => {
        setLoading(false);
        form.reset();
        handleShowSuccess();
        router.push(routerLinks.createReview);
      })
      .catch((reason) => {
        setLoading(false);
        handleShowError();
      });
  };

  return (
    <Fragment>
      <FormProvider {...form}>
        <FormContainer formContext={form} onSuccess={onSubmit}>
          <PlaceForm loading={loading} />
        </FormContainer>
      </FormProvider>
    </Fragment>
  );
};

export default CreatePlace;
