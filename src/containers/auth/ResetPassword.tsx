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
  const { t } = useTranslation("common");
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
              title: t("feedback.success"),
              description: t("auth.resetPassword.feedback.success"),
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
              title: t("feedback.error"),
              description: t("auth.resetPassword.feedback.error"),
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
            {t("auth.resetPassword.title")}
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
              {t("auth.login.password")}
              <Tooltip
                arrow
                enterTouchDelay={0}
                leaveTouchDelay={6000}
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
              validation={{
                required: t("errors.required"),
                pattern: {
                  value: regExp.password,
                  message: t("errors.invalid"),
                },
              }}
            />
          </Box>
          <Box width={"100%"}>
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
              t("auth.resetPassword.submit")
            )}
          </Button>
        </Stack>
      </FormContainer>
    </Dialog>
  );
};

export default ResetPassword;
