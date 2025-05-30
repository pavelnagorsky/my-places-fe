import { Divider, Stack } from "@mui/material";
import GoogleOAuth from "@/containers/auth/content/oauth/google/GoogleOAuth";
import VkOAuth from "@/containers/auth/content/oauth/vk/VkOAuth";
import YandexOAuth from "@/containers/auth/content/oauth/yandex/YandexOAuth";
import { useTranslation } from "next-i18next";

const OAuthSection = () => {
  const { t } = useTranslation("common");
  return (
    <Stack gap={3} mt={2}>
      <Divider
        sx={{
          color: "white",
          "&:before,:after": { borderTopColor: "#DFDDDB" },
        }}
      >
        {t("auth.oauth.loginWith")}
      </Divider>
      <Stack direction={"row"} gap={2} justifyContent={"center"}>
        <GoogleOAuth />
        <VkOAuth />
        <YandexOAuth />
      </Stack>
    </Stack>
  );
};

export default OAuthSection;
