import ReviewForm from "@/containers/CreateReview/Form/ReviewForm";
import { Fragment } from "react";
import { FormProvider, useForm } from "react-hook-form-mui";
import { IReviewFormContext } from "@/containers/CreateReview/Form/interfaces";

const CreateReview = () => {
  const form = useForm<IReviewFormContext>({});

  return (
    <Fragment>
      <FormProvider {...form}>
        <ReviewForm />
      </FormProvider>
    </Fragment>
  );
};

export default CreateReview;
