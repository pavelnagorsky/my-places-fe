import {
  FormContainer,
  PasswordElement,
  PasswordRepeatElement,
  SubmitHandler,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import {
  Box,
  CircularProgress,
  Dialog,
  FormLabel,
  Grow,
  IconButton,
  Slide,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import regExp from "@/shared/regExp";
import { Button } from "@/components/UI/button/Button";
import { forwardRef, ReactElement, Ref, useState } from "react";
import authService from "@/services/auth-service/auth.service";
import { showAlert } from "@/store/alerts-slice/alerts.slice";
import { useAppDispatch } from "@/store/hooks";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions/transition";

interface IForgotPasswordProps {
  open: boolean;
  onClose: () => void;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ForgotPassword = ({ open, onClose }: IForgotPasswordProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const form = useForm<{ email: string }>({
    defaultValues: {
      email: "",
    },
  });

  const handleClose = () => {
    onClose();
    form.reset();
  };

  const onSubmit: SubmitHandler<{ email: string }> = (data) => {
    if (loading) return;
    setLoading(true);
    const email = data.email.trim();
    authService
      .resetPasswordRequest(email)
      .then(() => {
        setLoading(false);
        handleClose();
        dispatch(
          showAlert({
            alertProps: {
              title: "Успех!",
              description: `Вам отправлено письмо с ссылкой для смены пароля на почту ${email}`,
              variant: "standard",
              severity: "success",
            },
            snackbarProps: {},
          })
        );
      })
      .catch(() => {
        setLoading(false);
        dispatch(
          showAlert({
            alertProps: {
              title: "Ошибка!",
              description:
                "Ошибка при обработке запроса на сброс пароля. Попробуйте отправить запрос еще раз или обратитесь в нашу службу поддержки...",
              variant: "standard",
              severity: "error",
            },
            snackbarProps: {},
          })
        );
      });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={"xs"}
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          opacity: 1,
          px: { xs: "1em", sm: "2em" },
          py: "2em",
          borderRadius: "15px",
          backdropFilter: "blur(15px)",
          boxShadow:
            "5px 5px 4px 0px rgba(255, 255, 255, 0.10) inset, -5px -5px 4px 0px rgba(255, 255, 255, 0.10) inset, 20px 30px 100px 0px rgba(0, 0, 0, 0.05)",
          background:
            "linear-gradient(135deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%, rgba(255, 255, 255, 0.20) 100%)",
          "& .MuiFormLabel-root": {
            fontWeight: 600,
            fontSize: "16px",
            textTransform: "uppercase",
            ml: "0.7em",
            display: "block",
            mb: "0.5em",
          },
        },
      }}
    >
      <FormContainer formContext={form} onSuccess={onSubmit}>
        <Stack gap={"1em"}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography fontSize={{ xs: "22px", md: "25px" }} fontWeight={600}>
              Забыли пароль?
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Typography variant={"body2"}>
            Пожалуйста, укажите свой адрес электронной почты, и мы вышлем вам
            ссылку для сброса пароля.
          </Typography>
          <Box width={"100%"}>
            <FormLabel htmlFor={"reset-pw-email"}>Почта</FormLabel>
            <TextFieldElement
              sx={{
                "& .MuiInputBase-root": {
                  background: "rgba(255, 255, 255, 0.47)",
                },
              }}
              fullWidth
              name={"email"}
              type={"email"}
              id={"reset-pw-email"}
              placeholder={"Введите адрес электронной почты..."}
              validation={{
                required: "Это поле обязательно к заполнению",
                pattern: {
                  value: regExp.email,
                  message: "Введен некорректный адрес электронной почты",
                },
              }}
            />
          </Box>
          <Button
            type={"submit"}
            fullWidth
            sx={{
              fontWeight: 600,
              py: "0.8em",
              my: "0.5em",
            }}
            variant={"contained"}
          >
            {loading ? (
              <CircularProgress color={"inherit"} size={23} />
            ) : (
              "Подтвердить"
            )}
          </Button>
        </Stack>
      </FormContainer>
    </Dialog>
  );
};

export default ForgotPassword;
