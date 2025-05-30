import { Button } from "@/components/UI/button/Button";
import ForgotPasswordDialog from "@/containers/auth/content/forgot-password/content/ForgotPasswordDialog";
import { Stack } from "@mui/material";
import { useTranslation } from "next-i18next";
import useDialog from "@/hooks/useDialog";

const ForgotPassword = () => {
  const { t } = useTranslation("common");
  const forgotPasswordDialog = useDialog();

  return (
    <Stack justifyContent={"center"}>
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
      <ForgotPasswordDialog
        open={forgotPasswordDialog.open}
        onClose={forgotPasswordDialog.handleClose}
      />
    </Stack>
  );
};

export default ForgotPassword;
