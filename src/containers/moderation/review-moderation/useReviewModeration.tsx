import { useTranslation } from "next-i18next";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form-mui";
import { routerLinks } from "@/routing/routerLinks";
import { showAlert } from "@/store/alerts-slice/alerts.slice";
import reviewsService from "@/services/reviews-service/reviews.service";
import { IEditReviewFormContext } from "@/containers/personal-area/edit-my-review/interfaces";

const useReviewModeration = () => {
  const { t, i18n } = useTranslation(["review-management", "common"]);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const reviewId = router.query["id"] as string | undefined;
  const [loading, setLoading] = useState(true);

  const form = useForm<IEditReviewFormContext>({
    defaultValues: {
      images: [],
      title: "",
      description: "",
      updateTranslations: false,
      place: null,
    },
    shouldFocusError: true,
    shouldUseNativeValidation: false,
  });

  const onGoBack = () => router.replace(routerLinks.moderationReviews);

  const handleShowNotFoundError = () => {
    dispatch(
      showAlert({
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
          _textEditorContentLength: data.description.length - 1,
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        return handleShowNotFoundError();
      });
  }, [i18n.language, reviewId]);

  return {
    form,
    loading,
    onGoBack,
    reviewId: reviewId ? +reviewId : null,
  };
};

export default useReviewModeration;
