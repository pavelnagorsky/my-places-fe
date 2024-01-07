import {
  CheckboxElement,
  FormContainer,
  PasswordElement,
  PasswordRepeatElement,
  SubmitHandler,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import {
  ISignupRequest,
  LoginErrorEnum,
} from "@/services/auth-service/interfaces";
import {
  Box,
  CircularProgress,
  FormLabel,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import regExp from "@/shared/regExp";
import { Button } from "@/components/UI/button/Button";
import NextMuiLink from "@/components/next-mui-link/NextMuiLink";
import { Fragment, useEffect } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectAuthError,
  selectAuthLoading,
} from "@/store/user-slice/user.slice";
import { signupThunk } from "@/store/user-slice/thunks";
import { showAlert } from "@/store/alerts-slice/alerts.slice";

const Signup = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const form = useForm<ISignupRequest>({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    shouldUseNativeValidation: false,
    mode: "onSubmit",
  });

  const afterSignup = (email: string) => {
    dispatch(
      showAlert({
        alertProps: {
          title: "Успех!",
          description: `Вы успешно прошли регистрацию, на ваш адрес электронной почты ${email} было выслано письмо для активации аккаунта`,
          variant: "standard",
          severity: "success",
        },
        snackbarProps: {},
      })
    );
  };

  const onSubmit: SubmitHandler<ISignupRequest> = (data) => {
    if (loading) return;
    dispatch(
      signupThunk({ ...data, onSuccess: () => afterSignup(data.email) })
    );
  };

  useEffect(() => {
    if (!error) return;
    form.setError(
      "email",
      {
        message: "Данный адрес электронной почты уже занят",
      },
      { shouldFocus: true }
    );
  }, [error]);

  return (
    <Box
      sx={{
        "& .MuiFormLabel-root": {
          fontWeight: 600,
          fontSize: "16px",
          textTransform: "uppercase",
          ml: "0.7em",
          display: "block",
          mb: "0.5em",
        },
      }}
    >
      <FormContainer formContext={form} onSuccess={onSubmit}>
        <Box width={"100%"} mb={"1.2em"}>
          <FormLabel htmlFor={"signup-email"}>Почта</FormLabel>
          <TextFieldElement
            sx={{
              "& .MuiInputBase-root": {
                background: "rgba(255, 255, 255, 0.47)",
              },
            }}
            fullWidth
            name={"email"}
            type={"email"}
            id={"signup-email"}
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
        <Box width={"100%"} mb={"1.2em"}>
          <FormLabel htmlFor={"signup-firstname"}>Имя</FormLabel>
          <TextFieldElement
            sx={{
              "& .MuiInputBase-root": {
                background: "rgba(255, 255, 255, 0.47)",
              },
            }}
            fullWidth
            name={"firstName"}
            id={"signup-firstname"}
            placeholder={"Ваше имя..."}
            parseError={(error) => {
              return error.type === "maxLength"
                ? "Превышена максимальная длина строки"
                : "Это поле обязательно к заполнению";
            }}
            validation={{
              pattern: regExp.noWhiteSpaces,
              required: true,
              maxLength: 30,
            }}
          />
        </Box>
        <Box width={"100%"} mb={"0.8em"}>
          <FormLabel htmlFor={"signup-lastname"}>Фамилия</FormLabel>
          <TextFieldElement
            sx={{
              "& .MuiInputBase-root": {
                background: "rgba(255, 255, 255, 0.47)",
              },
            }}
            fullWidth
            name={"lastName"}
            id={"signup-lastname"}
            placeholder={"Ваша фамилия..."}
            parseError={(error) => {
              return error.type === "maxLength"
                ? "Превышена максимальная длина строки"
                : "Это поле обязательно к заполнению";
            }}
            validation={{
              pattern: regExp.noWhiteSpaces,
              required: true,
              maxLength: 30,
            }}
          />
        </Box>
        <Box width={"100%"} mb={"1.2em"}>
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
                  Пароль должен содержать символы латинского алфавита, минимум 1
                  цифру и 1 заглавную букву. Минимальная длина пароля - 8
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
        <Box width={"100%"} mb={"1.2em"}>
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
        <Box
          ml={"0.5em"}
          sx={{
            //color: "#565656",
            position: "relative",
            "& .MuiFormControlLabel-label": {
              fontSize: "14px",
              fontWeight: 500,
            },
          }}
        >
          <CheckboxElement
            color={"secondary"}
            name={"privacyPolicy"}
            required
            validation={{
              required: "Для регистрации необходимо согласие",
            }}
            label={
              <Fragment>
                Регистрируясь на сайте, вы соглашаетесь с нашей
                <NextMuiLink
                  target={"_blank"}
                  href={"/privacy-policy"}
                  sx={{
                    ml: "5px",
                    color: "unset",
                    textDecoration: "underline",
                  }}
                >
                  Политикой конфиденциальности
                </NextMuiLink>
                {" и "}
                <NextMuiLink
                  target={"_blank"}
                  href={"/terms-of-use"}
                  sx={{
                    ml: "5px",
                    color: "unset",
                    textDecoration: "underline",
                  }}
                >
                  Условиями пользования
                </NextMuiLink>
              </Fragment>
            }
          />
        </Box>
        <Button
          type={"submit"}
          fullWidth
          sx={{
            fontWeight: 700,
            mt: { xs: "1.5em", sm: "1.3em" },
            py: "0.8em",
            mb: { xs: "2em", sm: "1.3em" },
          }}
          variant={"contained"}
        >
          {loading ? (
            <CircularProgress color={"inherit"} size={23} />
          ) : (
            "Зарегистрироваться"
          )}
        </Button>
      </FormContainer>
    </Box>
  );
};

export default Signup;
