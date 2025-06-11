import { useAppSelector } from "@/store/hooks";
import { selectCanSuggestOAuthAutoLogin } from "@/store/user-slice/user.slice";
import GoogleOAuthOneTapContent from "@/components/auth/content/oauth/google/content/one-tap-login/content/GoogleOAuthOneTapContent";

const GoogleOAuthOneTap = () => {
  const canSuggestOAuthAutoLogin = useAppSelector(
    selectCanSuggestOAuthAutoLogin
  );

  return canSuggestOAuthAutoLogin ? <GoogleOAuthOneTapContent /> : null;
};

export default GoogleOAuthOneTap;
