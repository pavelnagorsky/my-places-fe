import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form-mui";
import { IEmail } from "@/services/user-service/interfaces/email.interface";
import userService from "@/services/user-service/user.service";
import { useAppDispatch } from "@/store/hooks";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { IFeedback } from "@/services/contact-service/interfaces/feedback.interface";
import { Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import MailingForm from "@/components/mailing-form/MailingForm";
import { StyledButton } from "@/components/UI/button/StyledButton";

const EmailSection = ({ feedback }: { feedback: IFeedback }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const form = useForm<IEmail>({
    mode: "onChange",
    defaultValues: {
      to: feedback.email || "",
      subject: "Обратная связь",
      text: `<p>Уважаемый ${feedback.fullName},<p/>`,
    },
  });

  const onReset = () => form.reset();

  const onSubmit = () => {
    form.handleSubmit((data) => {
      if (loading) return;
      setLoading(true);
      userService
        .sendEmail(data)
        .then(() => {
          setLoading(false);
          dispatch(
            showAlertThunk({
              alertProps: {
                title: "Успех!",
                description: `Письмо было успешно отправлено ${data.to}.`,
                variant: "standard",
                severity: "success",
              },
              snackbarProps: {},
            })
          );
        })
        .catch(() => {
          setLoading(false);
        });
    })();
  };

  return (
    <Paper
      sx={{
        p: "1em",
        borderRadius: "10px",
      }}
    >
      <Typography
        fontWeight={600}
        fontSize={{ xs: "22px", md: "25px" }}
        gutterBottom
      >
        Отправить сообщение
      </Typography>
      <FormProvider {...form}>
        <Stack mt={"1em"} gap={"1em"}>
          <MailingForm />
          <Stack
            direction={"row"}
            mt={"0.5em"}
            justifyContent={"space-between"}
            gap={"1em"}
          >
            <StyledButton size={"large"} onClick={onReset}>
              Очистить
            </StyledButton>
            <StyledButton
              size={"large"}
              variant={"contained"}
              onClick={onSubmit}
              startIcon={
                loading ? (
                  <CircularProgress color={"inherit"} size={22} />
                ) : null
              }
            >
              Отправить
            </StyledButton>
          </Stack>
        </Stack>
      </FormProvider>
    </Paper>
  );
};

export default EmailSection;
