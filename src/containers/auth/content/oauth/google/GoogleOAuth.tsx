import { Box, IconButton } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import authService from "@/services/auth-service/auth.service";
import { GoogleOauthTypesEnum } from "@/services/auth-service/enums/google-oauth-type.enum";
import { useAppDispatch } from "@/store/hooks";
import { oauthLoginThunk } from "@/store/user-slice/thunks";
import { useRouter } from "next/router";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import icon from "/public/images/icons/google.png";
import useAnalytics from "@/hooks/analytics/useAnalytics";
import { AnalyticsEventsEnum } from "@/hooks/analytics/analytics.enum";

const GoogleOAuth = () => {
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

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      dispatch(
        oauthLoginThunk({
          apiCall: () =>
            authService.googleOAuth({
              type: GoogleOauthTypesEnum.OAUTH,
              authCode: codeResponse.code,
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
    flow: "auth-code",
  });

  return (
    <Box>
      <IconButton
        onClick={() => {
          sendAnalytics(AnalyticsEventsEnum.CustomClick, {
            title: "google oauth",
          });
          login();
        }}
        sx={{ p: 0 }}
      >
        <Image
          src={icon}
          alt={"Google"}
          width={54}
          height={54}
          priority
          style={{ objectFit: "contain" }}
        />
      </IconButton>
    </Box>
  );
};

export default GoogleOAuth;
