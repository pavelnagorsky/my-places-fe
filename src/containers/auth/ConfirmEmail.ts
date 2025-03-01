import { useRouter } from "next/router";
import { useEffect } from "react";
import authService from "@/services/auth-service/auth.service";
import { useAppDispatch } from "@/store/hooks";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { useTranslation } from "next-i18next";
import { openAuth } from "@/store/user-slice/user.slice";

const ConfirmEmail = () => {
  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const query = router.query as { token: string };

  useEffect(() => {
    router.replace("/").then(() => {
      dispatch(openAuth({}));
    });
    authService
      .confirmEmail(query.token)
      .then(() => {
        dispatch(
          showAlertThunk({
            alertProps: {
              title: t("feedback.success"),
              description: t("auth.confirmEmail.success"),
              variant: "standard",
              severity: "success",
            },
            snackbarProps: {},
          })
        );
      })
      .catch(() => {
        dispatch(
          showAlertThunk({
            alertProps: {
              title: t("feedback.error"),
              description: t("auth.confirmEmail.error"),
              variant: "standard",
              severity: "error",
            },
            snackbarProps: {},
          })
        );
      });
  }, [query.token]);

  return null;
};

export default ConfirmEmail;
