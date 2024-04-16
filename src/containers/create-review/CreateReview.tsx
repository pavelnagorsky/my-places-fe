import ReviewForm from "@/containers/create-review/form/ReviewForm";
import { Fragment, useState } from "react";
import {
  FormContainer,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form-mui";
import { IReviewFormContext } from "@/containers/create-review/form/interfaces";
import { hideAlert, showAlert } from "@/store/alerts-slice/alerts.slice";
import { useAppDispatch } from "@/store/hooks";
import { useTranslation } from "next-i18next";
import { ICreateReview } from "@/services/reviews-service/interfaces/create-review.interface";
import reviewsService from "@/services/reviews-service/reviews.service";
import ProtectedAuth from "@/hoc/ProtectedAuth";

const CreateReview = () => {
  const { t, i18n } = useTranslation(["review-management", "common"]);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const form = useForm<IReviewFormContext>({
    defaultValues: {
      images: [],
      title: "",
      description: "",
      place: null,
    },
    mode: "onChange",
    shouldFocusError: true,
    shouldUseNativeValidation: false,
  });

  const handleShowError = () => {
    dispatch(
      showAlert({
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
      showAlert({
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

  const onSubmit: SubmitHandler<IReviewFormContext> = (data) => {
    if (loading) return;
    setLoading(true);
    dispatch(hideAlert());

    const createReviewDto: ICreateReview = {
      title: data.title,
      description: data.description,
      placeId: data.place?.id as number,
      imagesIds: data.images.map((image) => image.id),
    };

    reviewsService
      .creteReview(createReviewDto, i18n.language)
      .then((res) => {
        setLoading(false);
        form.reset();
        handleShowSuccess();
        //router.push(routerLinks.home);
      })
      .catch((reason) => {
        setLoading(false);
        handleShowError();
      });
  };

  return (
    <ProtectedAuth mode={"redirectAfter"}>
      <FormProvider {...form}>
        <FormContainer formContext={form} onSuccess={onSubmit}>
          <ReviewForm loading={loading} />
        </FormContainer>
      </FormProvider>
    </ProtectedAuth>
  );
};

export default CreateReview;
