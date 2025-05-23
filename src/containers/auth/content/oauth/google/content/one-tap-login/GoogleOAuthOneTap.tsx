import { useAppSelector } from "@/store/hooks";
import { selectCanSuggestOAuthAutoLogin } from "@/store/user-slice/user.slice";
import GoogleOAuthOneTapContent from "@/containers/auth/content/oauth/google/content/one-tap-login/content/GoogleOAuthOneTapContent";

const GoogleOAuthOneTap = () => {
  const canSuggestOAuthAutoLogin = useAppSelector(
    selectCanSuggestOAuthAutoLogin
  );
  console.log("canSuggestOAuthAutoLogin", canSuggestOAuthAutoLogin);

  return canSuggestOAuthAutoLogin ? <GoogleOAuthOneTapContent /> : null;
};

export default GoogleOAuthOneTap;
