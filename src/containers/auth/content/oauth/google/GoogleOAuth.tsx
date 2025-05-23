import { Box, IconButton, Stack } from "@mui/material";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import googleIcon from "/public/images/icons/google.png";

const GoogleOAuth = () => {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
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
