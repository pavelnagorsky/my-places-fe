import { Fragment } from "react";
import {
  FormContainer,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form-mui";
import { IPlaceFormContext } from "@/containers/CreatePlace/Form/interfaces";
import PlaceForm from "@/containers/CreatePlace/Form/PlaceForm";

const CreatePlace = () => {
  const form = useForm<IPlaceFormContext>({
    defaultValues: {
      imagesIds: [],
      title: "",
      description: "",
      categoriesIds: [],
    },
    mode: "onBlur",
    shouldFocusError: true,
    shouldUseNativeValidation: false,
  });

  const onSubmit: SubmitHandler<IPlaceFormContext> = (data) => {
    console.log(data);
  };

  return (
    <Fragment>
      <FormProvider {...form}>
        <FormContainer formContext={form} onSuccess={onSubmit}>
          <PlaceForm />
        </FormContainer>
      </FormProvider>
    </Fragment>
  );
};

export default CreatePlace;
