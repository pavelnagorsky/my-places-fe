import ReviewForm from "@/containers/CreateReview/Form/ReviewForm";
import { Fragment } from "react";
import {
  FormContainer,
  FormProvider,
  FormSubmitHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form-mui";
import { IReviewFormContext } from "@/containers/CreateReview/Form/interfaces";

const CreateReview = () => {
  const form = useForm<IReviewFormContext>({
    defaultValues: {
      imagesIds: [],
      title: "",
      description: "",
      place: null,
    },
    mode: "onChange",
    shouldFocusError: true,
    shouldUseNativeValidation: false,
  });

  const onSubmit: SubmitHandler<IReviewFormContext> = (data) => {
    console.log(data);
  };

  return (
    <Fragment>
      <FormProvider {...form}>
        <FormContainer formContext={form} onSuccess={onSubmit}>
          <ReviewForm />
        </FormContainer>
      </FormProvider>
    </Fragment>
  );
};

export default CreateReview;
