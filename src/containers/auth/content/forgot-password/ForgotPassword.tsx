import { Button } from "@/components/UI/button/Button";
import ForgotPasswordDialog from "@/containers/auth/content/forgot-password/content/ForgotPasswordDialog";
import { Stack } from "@mui/material";
import { useTranslation } from "next-i18next";
import useDialog from "@/hooks/useDialog";
import useAnalytics from "@/hooks/analytics/useAnalytics";
import { AnalyticsEventsEnum } from "@/hooks/analytics/analytic-events.enum";

const ForgotPassword = () => {
  const { t } = useTranslation("common");
  const forgotPasswordDialog = useDialog();
  const sendAnalytics = useAnalytics();

  const onForgotPasswordClick = () => {
    forgotPasswordDialog.handleOpen();
    sendAnalytics(AnalyticsEventsEnum.CustomClick, {
      title: "forgot password click",
    });
  };

  return (
    <Stack justifyContent={"center"}>
      <Button
        onClick={onForgotPasswordClick}
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
      <ForgotPasswordDialog
        open={forgotPasswordDialog.open}
        onClose={forgotPasswordDialog.handleClose}
      />
    </Stack>
  );
};

export default ForgotPassword;
