import { useGoogleOneTapLogin } from "@react-oauth/google";

const GoogleOAuthOneTapContent = () => {
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      console.log("one-tap", credentialResponse);
    },
    onError: () => {
      console.log("Login Failed");
    },
    auto_select: true,
  });

  return null;
};

export default GoogleOAuthOneTapContent;
