import authService from "@/services/auth-service/auth.service";
import { Environment } from "@/shared/Environment";
import initiateOAuthLogin from "@/containers/auth/content/oauth/logic/utils";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/router";
import { oauthLoginThunk } from "@/store/user-slice/thunks";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { useTranslation } from "next-i18next";
import { AnalyticsEventsEnum } from "@/hooks/analytics/analytic-events.enum";
import useAnalytics from "@/hooks/analytics/useAnalytics";

const useVkOAuth = () => {
  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();
  const state = encodeURIComponent(new Date().toISOString());
  const params = new URLSearchParams({
    response_type: "code",
    client_id: Environment.vkAppId,
    redirect_uri: window.location.origin + "/auth/oauth/callback",
    scope: "email",
    state,
    code_challenge: Environment.vkCodeChallenge,
    code_challenge_method: "S256",
  });
  const url = `https://id.vk.com/authorize?${params.toString()}`;
  const router = useRouter();
  const sendAnalytics = useAnalytics();

  const loginRedirect = async (path: string) => {
    await router
      .push(path)
      .then(() => {})
      .catch(() => {});
  };

  const handleVkLogin = () => {
    sendAnalytics(AnalyticsEventsEnum.CustomClick, {
      title: "vk oauth",
    });
    initiateOAuthLogin(url)
      .then((queryPrams) => {
        dispatch(
          oauthLoginThunk({
            apiCall: () =>
              authService.vkOAuth({
                authCode: queryPrams.code,
                deviceId: queryPrams.device_id,
                state: queryPrams.state,
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

  return handleVkLogin;
};

export default useVkOAuth;
