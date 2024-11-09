import {
  CheckboxElement,
  FormContainer,
  PasswordElement,
  PasswordRepeatElement,
  SubmitHandler,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import { ISignupRequest } from "@/services/auth-service/interfaces";
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
import { useTranslation } from "next-i18next";

const Signup = () => {
  const { t } = useTranslation("common");
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
          title: t("feedback.success"),
          description: t("auth.signup.feedback.success", { email: email }),
          variant: "standard",
          severity: "success",
        },
        snackbarProps: {},
      })
    );
  };

  const onSubmit: SubmitHandler<ISignupRequest> = (data) => {
    if (loading) return;
    data.email = data.email.trim();
    dispatch(
      signupThunk({ ...data, onSuccess: () => afterSignup(data.email) })
    );
  };

  useEffect(() => {
    if (!error) return;
    form.setError(
      "email",
      {
        message: t("auth.signup.emailAlreadyInUse"),
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
          <FormLabel htmlFor={"signup-email"}>
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
            id={"signup-email"}
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
        <Box width={"100%"} mb={"1.2em"}>
          <FormLabel htmlFor={"signup-firstname"}>
            {t("auth.signup.firstName")}
          </FormLabel>
          <TextFieldElement
            sx={{
              "& .MuiInputBase-root": {
                background: "rgba(255, 255, 255, 0.47)",
              },
            }}
            fullWidth
            name={"firstName"}
            id={"signup-firstname"}
            placeholder={t("auth.signup.firstNamePlaceholder")}
            parseError={(error) => {
              return error.type === "maxLength"
                ? t("errors.maxLengthString")
                : t("errors.required");
            }}
            rules={{
              pattern: regExp.noWhiteSpaces,
              required: true,
              maxLength: 30,
            }}
          />
        </Box>
        <Box width={"100%"} mb={"0.8em"}>
          <FormLabel htmlFor={"signup-lastname"}>
            {t("auth.signup.lastName")}
          </FormLabel>
          <TextFieldElement
            sx={{
              "& .MuiInputBase-root": {
                background: "rgba(255, 255, 255, 0.47)",
              },
            }}
            fullWidth
            name={"lastName"}
            id={"signup-lastname"}
            placeholder={t("auth.signup.lastNamePlaceholder")}
            parseError={(error) => {
              return error.type === "maxLength"
                ? t("errors.maxLengthString")
                : t("errors.required");
            }}
            rules={{
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
            {t("auth.login.password")}
            <Tooltip
              arrow
              enterTouchDelay={0}
              leaveTouchDelay={2000}
              sx={{ fontSize: "14px", alignSelf: "start" }}
              title={
                <Typography p={"0.5em"}>
                  {t("auth.signup.passwordHelper")}
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
            placeholder={t("auth.login.passwordPlaceholder")}
            rules={{
              required: t("errors.required"),
              pattern: {
                value: regExp.password,
                message: t("errors.invalid"),
              },
            }}
          />
        </Box>
        <Box width={"100%"} mb={"1.2em"}>
          <FormLabel htmlFor={"signup-password-confirm"}>
            {t("auth.signup.confirmPassword")}
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
            placeholder={t("auth.signup.confirmPasswordPlaceholder")}
            parseError={(error) => {
              if (error.type === "validate") {
                return t("auth.signup.confirmPasswordError");
              } else {
                return t("errors.required");
              }
            }}
            rules={{
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
            rules={{
              required: t("auth.signup.policyConfirmError"),
            }}
            label={
              <Fragment>
                {t("auth.signup.policyConfirm1")}
                <NextMuiLink
                  target={"_blank"}
                  href={"/privacy-policy"}
                  sx={{
                    ml: "5px",
                    color: "unset",
                    textDecoration: "underline",
                  }}
                >
                  {t("auth.signup.policyConfirm2")}
                </NextMuiLink>
                {` ${t("auth.signup.policyConfirm3")} `}
                <NextMuiLink
                  target={"_blank"}
                  href={"/terms-of-use"}
                  sx={{
                    ml: "5px",
                    color: "unset",
                    textDecoration: "underline",
                  }}
                >
                  {t("auth.signup.policyConfirm4")}
                </NextMuiLink>
              </Fragment>
            }
          />
        </Box>
        <Button
          type={"submit"}
          fullWidth
          sx={{
            fontWeight: 600,
            mt: { xs: "1.5em", sm: "1.3em" },
            py: "0.8em",
            mb: { xs: "2em", sm: "1.3em" },
          }}
          variant={"contained"}
          startIcon={
            loading ? <CircularProgress color={"inherit"} size={23} /> : null
          }
        >
          {t("auth.signup.submit")}
        </Button>
      </FormContainer>
    </Box>
  );
};

export default Signup;
