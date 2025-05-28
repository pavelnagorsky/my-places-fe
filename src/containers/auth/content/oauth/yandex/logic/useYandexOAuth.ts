import { Environment } from "@/shared/Environment";
import initiateOAuthLogin from "@/containers/auth/content/oauth/logic/utils";
import authService from "@/services/auth-service/auth.service";

const useYandexOAuth = () => {
  const state = encodeURIComponent(new Date().toISOString());
  const params = new URLSearchParams({
    response_type: "token",
    client_id: Environment.yandexAppId,
    redirect_uri: window.location.origin + "/auth/oauth/callback",
    scope: "login:email login:info",
    state,
  });
  const url = `https://oauth.yandex.ru/authorize?${params.toString()}`;

  const handleYandexLogin = () => {
    initiateOAuthLogin(url)
      .then((queryPrams) => {
        console.log("success", queryPrams);
        authService
          .yandexOAuth({
            authCode: queryPrams.access_token,
          })
          .then(({ data }) => {
            // TODO: get user data
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return handleYandexLogin;
};

export default useYandexOAuth;
