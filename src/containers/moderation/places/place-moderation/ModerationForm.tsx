import { FormProvider, TextFieldElement, useForm } from "react-hook-form-mui";
import {
  Box,
  Button,
  FormHelperText,
  FormLabel,
  Stack,
  Typography,
} from "@mui/material";
import { StyledButton } from "@/components/UI/button/StyledButton";
import { useState } from "react";
import placesService from "@/services/places-service/places.service";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/router";
import { routerLinks } from "@/routing/routerLinks";
import reviewsService from "@/services/reviews-service/reviews.service";
import { useTranslation } from "next-i18next";
import excursionsService from "@/services/excursions-service/excursions.service";

interface IModerationFormContext {
  feedback?: string;
}

const ModerationForm = ({
  id,
  mode,
}: {
  id: number;
  mode: "place" | "review" | "excursion";
}) => {
  const { t } = useTranslation(["moderation", "common"]);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState<false | "reject" | "accept">(false);
  const form = useForm<IModerationFormContext>({
    defaultValues: {
      feedback: "",
    },
  });

  const handleShowError = () => {
    dispatch(
      showAlertThunk({
        alertProps: {
          title: t("feedback.error", { ns: "common" }),
          description: `${t(`feedback.${mode}.error`)} ${t(
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

  const handleShowSuccess = (action: "accept" | "reject") => {
    dispatch(
      showAlertThunk({
        alertProps: {
          title: t("feedback.success", { ns: "common" }),
          description:
            action === "accept"
              ? `${t(`feedback.${mode}.accept`)}`
              : `${t(`feedback.${mode}.reject`)}`,
          variant: "standard",
          severity: "success",
        },
        snackbarProps: {},
      })
    );
  };

  const onSubmit = (action: "reject" | "accept") => {
    form.handleSubmit((data) => {
      if (action === "reject") {
        if (!data.feedback || data.feedback.trim().length < 1) {
          form.setError("feedback", {
            message: t("errors.required", { ns: "common" }),
          });
          return;
        }
      }
      if (loading) return;
      setLoading(action);
      const apiCall = {
        place: placesService.moderatePlace,
        review: reviewsService.moderateReview,
        excursion: excursionsService.moderateExcursion,
      }[mode];
      apiCall(id, {
        accept: action === "accept",
        feedback: data.feedback,
      })
        .then(() => {
          setLoading(false);
          // success
          handleShowSuccess(action);
          router.push(
            {
              place: routerLinks.moderationPlaces,
              review: routerLinks.moderationReviews,
              excursion: routerLinks.moderationExcursions,
            }[mode]
          );
        })
        .catch(() => {
          setLoading(false);
          // error
          handleShowError();
        });
    })();
  };

  return (
    <FormProvider {...form}>
      <Stack
        direction={{ sm: "row" }}
        gap={"2em"}
        alignItems={{ xs: "unset", sm: "center" }}
        mb={"2em"}
        maxWidth={"md"}
      >
        <Box flexGrow={1}>
          <Typography
            variant={"body1"}
            mb={"0.5em"}
            fontSize={{ xs: "14px", md: "20px" }}
          >
            {t("form.feedback")}
          </Typography>
          <TextFieldElement
            fullWidth
            name={"feedback"}
            id={"feedback"}
            placeholder={t("form.feedbackPlaceholder")}
            multiline
            minRows={1}
            parseError={() => t("errors.required", { ns: "common" })}
          />
          <FormHelperText>{t("form.feedbackHelper")}</FormHelperText>
        </Box>
        <Stack>
          <Stack gap={"1em"} direction={"row"}>
            <StyledButton
              onClick={() => onSubmit("reject")}
              variant={"contained"}
              color={"error"}
              sx={{ fontSize: "16px" }}
              size="large"
            >
              {t("buttons.reject", { ns: "common" })}
            </StyledButton>
            <StyledButton
              onClick={() => onSubmit("accept")}
              variant={"contained"}
              size="large"
              sx={{ fontSize: "16px" }}
              color={"success"}
            >
              {t("buttons.accept", { ns: "common" })}
            </StyledButton>
          </Stack>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default ModerationForm;
