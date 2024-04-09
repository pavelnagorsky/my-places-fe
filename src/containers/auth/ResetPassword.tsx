import {
  Box,
  CircularProgress,
  Dialog,
  FormLabel,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  FormContainer,
  PasswordElement,
  PasswordRepeatElement,
  SubmitHandler,
  useForm,
} from "react-hook-form-mui";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/router";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import regExp from "@/shared/regExp";
import { Button } from "@/components/UI/button/Button";
import authService from "@/services/auth-service/auth.service";
import { openAuth } from "@/store/user-slice/user.slice";
import { showAlert } from "@/store/alerts-slice/alerts.slice";

const ResetPassword = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const query = router.query as { token: string };
  const [loading, setLoading] = useState(false);
  const form = useForm<{ password: string }>({
    mode: "onChange",
    defaultValues: {
      password: "",
    },
  });

  const onSubmit: SubmitHandler<{ password: string }> = (data) => {
    if (loading) return;
    setLoading(true);
    authService
      .resetPassword(data.password, query.token)
      .then(() => {
        setLoading(false);
        dispatch(
          showAlert({
            alertProps: {
              title: "Успех!",
              description: "Пароль успешно обновлен",
              variant: "standard",
              severity: "success",
            },
            snackbarProps: {},
          })
        );
        router.replace("/").then(() => {
          dispatch(openAuth({}));
        });
      })
      .catch(() => {
        setLoading(false);
        dispatch(
          showAlert({
            alertProps: {
              title: "Ошибка!",
              description:
                "Ошибка при обновлении пароля. Попробуйте отправить запрос на сброс пароля еще раз или обратитесь в нашу службу поддержки...",
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
      open
      PaperProps={{
        sx: {
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
          <Typography fontSize={{ xs: "22px", md: "25px" }} fontWeight={600}>
            Сброс пароля
          </Typography>
          <Box width={"100%"}>
            <FormLabel
              sx={{
                display: "flex !important",
                mb: "0 !important",
                alignItems: "center",
              }}
              htmlFor={"signup-password"}
            >
              Пароль
              <Tooltip
                arrow
                enterTouchDelay={0}
                leaveTouchDelay={6000}
                sx={{ fontSize: "14px", alignSelf: "start" }}
                title={
                  <Typography p={"0.5em"}>
                    Пароль должен содержать символы латинского алфавита, минимум
                    1 цифру и 1 заглавную букву. Минимальная длина пароля - 8
                    символов.
                  </Typography>
                }
              >
                <IconButton>
                  <InfoOutlinedIcon fontSize={"medium"} />
                </IconButton>
              </Tooltip>
            </FormLabel>
            <PasswordElement
              sx={{
                "& .MuiInputBase-root": {
                  background: "rgba(255, 255, 255, 0.47)",
                },
              }}
              fullWidth
              name={"password"}
              type={"password"}
              id={"signup-password"}
              placeholder={"Введите пароль..."}
              validation={{
                required: "Это поле обязательно к заполнению",
                pattern: {
                  value: regExp.password,
                  message: "Введено некорректное значение",
                },
              }}
            />
          </Box>
          <Box width={"100%"}>
            <FormLabel htmlFor={"signup-password-confirm"}>
              Подтверждение пароля
            </FormLabel>
            <PasswordRepeatElement
              sx={{
                "& .MuiInputBase-root": {
                  background: "rgba(255, 255, 255, 0.47)",
                },
              }}
              fullWidth
              passwordFieldName={"password"}
              name={"passwordConfirm"}
              type={"password"}
              id={"signup-password-confirm"}
              placeholder={"Подтвердите пароль..."}
              parseError={(error) => {
                if (error.type === "validate") {
                  return "Пароли должны совпадать";
                } else {
                  return "Это поле обязательно к заполнению";
                }
              }}
              validation={{
                required: true,
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
              "Обновить пароль"
            )}
          </Button>
        </Stack>
      </FormContainer>
    </Dialog>
  );
};

export default ResetPassword;
