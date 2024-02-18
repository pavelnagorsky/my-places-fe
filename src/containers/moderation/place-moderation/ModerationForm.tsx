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
import { showAlert } from "@/store/alerts-slice/alerts.slice";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/router";
import { routerLinks } from "@/routing/routerLinks";
import reviewsService from "@/services/reviews-service/reviews.service";

interface IModerationFormContext {
  feedback?: string;
}

const ModerationForm = ({
  id,
  mode,
}: {
  id: number;
  mode: "place" | "review";
}) => {
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
      showAlert({
        alertProps: {
          title: "Ошибка!",
          description: `${
            mode === "place"
              ? "Ошибка при модерации места."
              : "Ошибка при модерации заметки."
          } Проверьте введенные данные и сетевое подключение или обратитесь в нашу службу поддержки...`,
          variant: "standard",
          severity: "error",
        },
        snackbarProps: {},
      })
    );
  };

  const handleShowSuccess = (action: "accept" | "reject") => {
    dispatch(
      showAlert({
        alertProps: {
          title: "Успех!",
          description:
            action === "accept"
              ? `${
                  mode === "place"
                    ? "Место было успешно одобрено модерацией"
                    : "Заметка была успешно одобрена модерацией"
                }`
              : `${
                  mode === "place"
                    ? "Место было успешно отклонено модерацией"
                    : "Заметка была успешно отклонена модерацией"
                }`,
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
            message: "Это поле обязательно к заполнению",
          });
          return;
        }
      }
      if (loading) return;
      setLoading(action);
      const apiCall =
        mode === "place"
          ? placesService.moderatePlace
          : reviewsService.moderateReview;
      apiCall(id, {
        accept: action === "accept",
        feedback: data.feedback,
      })
        .then(() => {
          setLoading(false);
          // success
          handleShowSuccess(action);
          router.push(
            mode === "place"
              ? routerLinks.moderationPlaces
              : routerLinks.moderationReviews
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
            Обратная связь
          </Typography>
          <TextFieldElement
            fullWidth
            name={"feedback"}
            id={"feedback"}
            placeholder={"Причина"}
            multiline
            minRows={1}
            parseError={() => "Это поле обязательно к заполнению"}
          />
          <FormHelperText>Обязательна при отклонении</FormHelperText>
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
              Отклонить
            </StyledButton>
            <StyledButton
              onClick={() => onSubmit("accept")}
              variant={"contained"}
              size="large"
              sx={{ fontSize: "16px" }}
              color={"success"}
            >
              Принять
            </StyledButton>
          </Stack>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default ModerationForm;
