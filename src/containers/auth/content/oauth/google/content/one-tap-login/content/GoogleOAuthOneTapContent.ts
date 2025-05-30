import { useGoogleOneTapLogin } from "@react-oauth/google";
import authService from "@/services/auth-service/auth.service";
import { GoogleOauthTypesEnum } from "@/services/auth-service/enums/google-oauth-type.enum";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { oauthLoginThunk } from "@/store/user-slice/thunks";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { AnalyticsEventsEnum } from "@/hooks/analytics/analytics.enum";
import useAnalytics from "@/hooks/analytics/useAnalytics";

const GoogleOAuthOneTapContent = () => {
  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const sendAnalytics = useAnalytics();

  const loginRedirect = async (path: string) => {
    await router
      .push(path)
      .then(() => {})
      .catch(() => {});
  };

  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      sendAnalytics(AnalyticsEventsEnum.CustomClick, {
        title: "google one-tap oauth success",
      });
      dispatch(
        oauthLoginThunk({
          apiCall: () =>
            authService.googleOAuth({
              type: GoogleOauthTypesEnum.ONE_TAP,
              oneTapCode: credentialResponse.credential,
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
    },
    onError: () => {},
    auto_select: true,
  });

  return null;
};

export default GoogleOAuthOneTapContent;
