import { useGoogleOneTapLogin } from "@react-oauth/google";
import authService from "@/services/auth-service/auth.service";
import { GoogleOauthTypesEnum } from "@/services/auth-service/enums/google-oauth-type.enum";

const GoogleOAuthOneTapContent = () => {
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      console.log("one-tap", credentialResponse);
      authService
        .googleOAuth({
          type: GoogleOauthTypesEnum.ONE_TAP,
          oneTapCode: credentialResponse.credential,
        })
        .then(() => {})
        .catch(() => {});
    },
    onError: () => {
      console.log("Login Failed");
    },
    auto_select: true,
  });

  return null;
};

export default GoogleOAuthOneTapContent;
