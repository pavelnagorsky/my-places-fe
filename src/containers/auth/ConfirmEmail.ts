import { useRouter } from "next/router";
import { useEffect } from "react";
import authService from "@/services/auth-service/auth.service";
import { useAppDispatch } from "@/store/hooks";
import { showAlert } from "@/store/alerts-slice/alerts.slice";
import { useTranslation } from "next-i18next";

const ConfirmEmail = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const query = router.query as { token: string };

  useEffect(() => {
    router.replace("/");
    authService
      .confirmEmail(query.token)
      .then(() => {
        dispatch(
          showAlert({
            alertProps: {
              title: "Успех!",
              description: "Электронная почта была успешно подтверждена",
              variant: "standard",
              severity: "success",
            },
            snackbarProps: {},
          })
        );
      })
      .catch(() => {
        dispatch(
          showAlert({
            alertProps: {
              title: "Ошибка!",
              description:
                "Ошибка при подтверждении электронной почты. Обратитесь в нашу службу поддержки...",
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
