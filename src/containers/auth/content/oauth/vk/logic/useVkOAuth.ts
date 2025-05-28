import authService from "@/services/auth-service/auth.service";
import { Environment } from "@/shared/Environment";
import initiateOAuthLogin from "@/containers/auth/content/oauth/logic/utils";

const useVkOAuth = () => {
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

  const handleVkLogin = () => {
    initiateOAuthLogin(url)
      .then((queryPrams) => {
        console.log("success", queryPrams);
        authService
          .vkOAuth({
            authCode: queryPrams.code,
            deviceId: queryPrams.device_id,
            state: queryPrams.state,
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

  return handleVkLogin;
};

export default useVkOAuth;
