import { Stack } from "@mui/material";
import GoogleOAuth from "@/containers/auth/content/oauth/google/GoogleOAuth";
import VkOAuth from "@/containers/auth/content/oauth/vk/VkOAuth";
import YandexOAuth from "@/containers/auth/content/oauth/yandex/YandexOAuth";

const OAuthSection = () => {
  return (
    <Stack direction={"row"} gap={2}>
      <GoogleOAuth />
      <VkOAuth />
      <YandexOAuth />
    </Stack>
  );
};

export default OAuthSection;
