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

const CreatePlace = () => {
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
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

  const onSubmit: SubmitHandler<IPlaceFormContext> = (data) => {
    if (loading) return;
    setLoading(true);
    setError(false);

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
      })
      .catch((reason) => {
        setLoading(false);
        setError(true);
        setErrorMessage(
          "Ошибка при создании места! Проверьте введенные данные и сетевое подключение или обратитесь в нашу службу поддержки..."
        );
      });
  };

  return (
    <Fragment>
      <FormProvider {...form}>
        <FormContainer formContext={form} onSuccess={onSubmit}>
          <PlaceForm
            loading={loading}
            error={error}
            errorMessage={errorMessage}
          />
        </FormContainer>
      </FormProvider>
    </Fragment>
  );
};

export default CreatePlace;
