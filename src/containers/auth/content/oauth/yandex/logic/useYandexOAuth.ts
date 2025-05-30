import { Environment } from "@/shared/Environment";
import initiateOAuthLogin from "@/containers/auth/content/oauth/logic/utils";
import authService from "@/services/auth-service/auth.service";
import { useAppDispatch } from "@/store/hooks";
import { oauthLoginThunk } from "@/store/user-slice/thunks";
import { useRouter } from "next/router";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { useTranslation } from "next-i18next";

const useYandexOAuth = () => {
  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();
  const state = encodeURIComponent(new Date().toISOString());
  const params = new URLSearchParams({
    response_type: "code",
    client_id: Environment.yandexAppId,
    redirect_uri: window.location.origin + "/auth/oauth/callback",
    scope: "login:email login:info",
    state,
  });
  const url = `https://oauth.yandex.ru/authorize?${params.toString()}`;
  const router = useRouter();

  const loginRedirect = async (path: string) => {
    await router
      .push(path)
      .then(() => {})
      .catch(() => {});
  };

  const handleYandexLogin = () => {
    initiateOAuthLogin(url)
      .then((queryPrams) => {
        dispatch(
          oauthLoginThunk({
            apiCall: () =>
              authService.yandexOAuth({
                authCode: queryPrams.code,
              }),
            onRedirect: loginRedirect,
            onError: () =>
              dispatch(
                showAlertThunk({
                  alertProps: {
                    title: t("feedback.error"),
                    description: t("auth.oauth.feedback.error"),
                    variant: "standard",
                    severity: "error",
                  },
                  snackbarProps: {},
                })
              ),
          })
        );
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return handleYandexLogin;
};

export default useYandexOAuth;
