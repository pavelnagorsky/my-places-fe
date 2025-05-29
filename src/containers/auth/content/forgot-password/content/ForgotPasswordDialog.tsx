import {
  FormContainer,
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
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { useAppDispatch } from "@/store/hooks";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions/transition";
import { useTranslation } from "next-i18next";

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

const ForgotPasswordDialog = ({ open, onClose }: IForgotPasswordProps) => {
  const { t } = useTranslation("common");
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
          showAlertThunk({
            alertProps: {
              title: t("feedback.success"),
              description: `${t(
                "auth.forgotPassword.feedback.success"
              )} ${email}`,
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
          showAlertThunk({
            alertProps: {
              title: t("feedback.error"),
              description: `${t("auth.forgotPassword.feedback.error")} ${t(
                "errors.description"
              )}`,
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
              {t("auth.forgotPassword.title")}
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Typography variant={"body2"}>
            {t("auth.forgotPassword.description")}
          </Typography>
          <Box width={"100%"}>
            <FormLabel htmlFor={"reset-pw-email"}>
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
              id={"reset-pw-email"}
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
              t("buttons.confirm")
            )}
          </Button>
        </Stack>
      </FormContainer>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
