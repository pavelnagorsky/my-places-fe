import { useTranslation } from "next-i18next";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form-mui";
import { IEditReviewFormContext } from "@/containers/personal-area/my-reviews/edit-my-review/interfaces";
import { routerLinks } from "@/routing/routerLinks";
import { hideAlert, showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import reviewsService from "@/services/reviews-service/reviews.service";
import { IUpdateReview } from "@/services/reviews-service/interfaces/update-review.interface";

const useEditReview = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const reviewId = router.query["id"] as string | undefined;
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const form = useForm<IEditReviewFormContext>({
    defaultValues: {
      images: [],
      title: "",
      description: "",
      updateTranslations: false,
      place: null,
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
            "Заметка не найдена. Проверьте введенные данные и сетевое подключение или обратитесь в нашу службу поддержки...",
          variant: "standard",
          severity: "error",
        },
        snackbarProps: {},
      })
    );
    onGoBack();
  };

  useEffect(() => {
    // fetch review data for editing
    if (!reviewId || Number.isNaN(+reviewId)) {
      handleShowNotFoundError();
      return;
    }
    setLoading(true);
    reviewsService
      .getReviewForEdit(+reviewId, i18n.language)
      .then(({ data }) => {
        // reset form state
        form.reset({
          updateTranslations: false,
          title: data.title,
          description: data.description,
          images: data.images,
          place: { id: data.placeId, title: data.placeTitle },
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        return handleShowNotFoundError();
      });
  }, [i18n.language, reviewId]);

  const handleShowError = () => {
    dispatch(
      showAlertThunk({
        alertProps: {
          title: "Ошибка!",
          description:
            "Ошибка при обновлении заметки. Проверьте введенные данные и сетевое подключение или обратитесь в нашу службу поддержки...",
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
          description: "Заметка была успешно обновлена.",
          variant: "standard",
          severity: "success",
        },
        snackbarProps: {},
      })
    );
  };

  const onSubmit: SubmitHandler<IEditReviewFormContext> = (data) => {
    if (submitLoading || !reviewId) return;
    setSubmitLoading(true);
    dispatch(hideAlert());

    const updateReviewDto: IUpdateReview = {
      title: data.title,
      description: data.description,
      placeId: data.place?.id as number,
      imagesIds: data.images.map((image) => image.id),
      shouldTranslate: data.updateTranslations,
    };

    reviewsService
      .updateReviewByAdmin(+reviewId, updateReviewDto, i18n.language)
      .then((res) => {
        setSubmitLoading(false);
        handleShowSuccess();
        router.push(
          routerLinks.administrationPlace(updateReviewDto.placeId) + "?tab=1"
        );
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

export default useEditReview;
