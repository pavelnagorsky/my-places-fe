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
import { Button } from "@/components/UI/button/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginThunk } from "@/store/user-slice/thunks";
import {
  selectAuthError,
  selectAuthLoading,
} from "@/store/user-slice/user.slice";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { format } from "date-fns";
import useDialog from "@/hooks/useDialog";
import ForgotPassword from "@/containers/auth/tabs/ForgotPassword";

const Login = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const router = useRouter();
  const { t } = useTranslation("common");
  const forgotPasswordDialog = useDialog();

  const loginRedirect = async (path: string) => {
    await router
      .push(path)
      .then(() => {})
      .catch(() => {});
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
    dispatch(
      loginThunk({
        ...data,
        onRedirect: loginRedirect,
      })
    );
  };

  useEffect(() => {
    if (!error) return;
    if (error?.loginError === LoginErrorEnum.EMAIL_NOT_CONFIRMED) {
      form.setError(
        "email",
        {
          message: t("auth.login.emailNotConfirmed"),
        },
        { shouldFocus: true }
      );
      return;
    }
    if (error?.loginError === LoginErrorEnum.USER_BLOCKED) {
      form.setError(
        "email",
        {
          message: `${t("auth.login.userBlockedUntil")} ${
            error?.blockedUntil
              ? format(new Date(error.blockedUntil), "dd/MM/yyyy")
              : "∞"
          }`,
        },
        { shouldFocus: true }
      );
      return;
    }
    form.setError(
      "email",
      {
        message: t("auth.login.invalidCredentials"),
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
        <Box width={"100%"} mb={"1.7em"}>
          <FormLabel htmlFor={"login-email"}>
            {t("auth.login.emailLabel")}
          </FormLabel>
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
            placeholder={t("auth.login.emailPlaceholder")}
            rules={{
              required: t("errors.required"),
              pattern: {
                value: regExp.email,
                message: t("errors.email"),
              },
            }}
          />
        </Box>
        <Box width={"100%"} mb={"1em"}>
          <FormLabel htmlFor={"login-password"}>
            {t("auth.login.password")}
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
            id={"login-password"}
            placeholder={t("auth.login.passwordPlaceholder")}
            rules={{
              required: t("errors.required"),
            }}
          />
        </Box>
        <Box ml={"0.5em"} sx={{ color: "#565656", position: "relative" }}>
          <CheckboxElement
            color={"secondary"}
            name={"rememberMe"}
            label={t("auth.login.rememberMe")}
          />
        </Box>
        <Button
          type={"submit"}
          fullWidth
          sx={{ fontWeight: 600, my: "1.3em", py: "0.8em" }}
          variant={"contained"}
          startIcon={
            loading ? <CircularProgress color={"inherit"} size={23} /> : null
          }
        >
          {t("auth.login.submit")}
        </Button>
      </FormContainer>
      <Divider sx={{ borderColor: "#D5D3D0", my: "1em" }} />
      <Stack justifyContent={"center"} mt="1.2em">
        <Button
          onClick={forgotPasswordDialog.handleOpen}
          variant={"text"}
          color={"secondary"}
          sx={{
            textTransform: "none",
            color: "#DFDDDB",
            cursor: "pointer",
          }}
        >
          {t("auth.forgotPassword.title")}
        </Button>
        <ForgotPassword
          open={forgotPasswordDialog.open}
          onClose={forgotPasswordDialog.handleClose}
        />
      </Stack>
    </Box>
  );
};

export default Login;
