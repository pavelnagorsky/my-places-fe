import { Box, IconButton } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import googleIcon from "/public/images/icons/google.png";
import authService from "@/services/auth-service/auth.service";
import { GoogleOauthTypesEnum } from "@/services/auth-service/enums/google-oauth-type.enum";

const GoogleOAuth = () => {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      authService
        .googleOAuth({
          type: GoogleOauthTypesEnum.OAUTH,
          authCode: codeResponse.code,
        })
        .then(() => {})
        .catch(() => {});
    },
    flow: "auth-code",
  });

  return (
    <Box>
      <IconButton onClick={login}>
        <Box
          component={"img"}
          src={googleIcon.src}
          height={"20px"}
          width={"20px"}
          alt={"Google OAuth"}
        />
      </IconButton>
    </Box>
  );
};

export default GoogleOAuth;
