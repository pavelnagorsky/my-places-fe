import {
  CheckboxElement,
  FormContainer,
  PasswordElement,
  SubmitHandler,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import {
  ILoginRequest,
  LoginErrorEnum,
} from "@/services/auth-service/interfaces";
import {
  Box,
  CircularProgress,
  Divider,
  FormLabel,
  Stack,
} from "@mui/material";
import regExp from "@/shared/regExp";
import { Button } from "@/components/UI/Button/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginThunk } from "@/store/user-slice/thunks";
import {
  selectAuthError,
  selectAuthLoading,
} from "@/store/user-slice/user.slice";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const router = useRouter();

  const loginRedirect = (path: string) => {
    router.push(path);
  };

  const form = useForm<ILoginRequest>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
    shouldUseNativeValidation: false,
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<ILoginRequest> = (data) => {
    if (loading) return;
    dispatch(loginThunk({ ...data, onRedirect: loginRedirect }));
  };

  useEffect(() => {
    if (!error) return;
    if (error === LoginErrorEnum.EMAIL_NOT_CONFIRMED) {
      form.setError(
        "email",
        {
          message: "Электронная почта не подтверждена",
        },
        { shouldFocus: true }
      );
    } else {
      form.setError(
        "email",
        {
          message: "Введены неверная почта или пароль",
        },
        { shouldFocus: true }
      );
    }
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
        <Box width={"100%"} mb={"1.7em"}>
          <FormLabel htmlFor={"login-email"}>Почта</FormLabel>
          <TextFieldElement
            sx={{
              "& .MuiInputBase-root": {
                background: "rgba(255, 255, 255, 0.47)",
              },
            }}
            fullWidth
            name={"email"}
            type={"email"}
            id={"login-email"}
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
        <Box width={"100%"} mb={"1em"}>
          <FormLabel htmlFor={"login-password"}>Пароль</FormLabel>
          <PasswordElement
            sx={{
              "& .MuiInputBase-root": {
                background: "rgba(255, 255, 255, 0.47)",
              },
            }}
            fullWidth
            name={"password"}
            type={"password"}
            id={"login-password"}
            placeholder={"Введите пароль..."}
            validation={{
              required: "Это поле обязательно к заполнению",
            }}
          />
        </Box>
        <Box ml={"0.5em"} sx={{ color: "#565656", position: "relative" }}>
          <CheckboxElement
            color={"secondary"}
            name={"rememberMe"}
            label={"Запомнить меня"}
          />
        </Box>
        <Button
          type={"submit"}
          fullWidth
          sx={{ fontWeight: 700, my: "1.3em", py: "0.8em" }}
          variant={"contained"}
        >
          {loading ? <CircularProgress color={"inherit"} size={23} /> : "Войти"}
        </Button>
      </FormContainer>
      <Divider sx={{ borderColor: "#D5D3D0", my: "1em" }} />
      <Stack justifyContent={"center"} mt="1.2em">
        <Button
          variant={"text"}
          color={"secondary"}
          sx={{
            textTransform: "none",
            color: "#DFDDDB",
            cursor: "pointer",
          }}
        >
          Забыли пароль?
        </Button>
      </Stack>
    </Box>
  );
};

export default Login;
