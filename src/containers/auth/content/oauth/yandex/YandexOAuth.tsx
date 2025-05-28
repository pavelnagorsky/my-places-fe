import { IconButton } from "@mui/material";
import useYandexOAuth from "@/containers/auth/content/oauth/yandex/logic/useYandexOAuth";

const YandexOAuth = () => {
  const handleYandexLogin = useYandexOAuth();

  return <IconButton onClick={handleYandexLogin}>Y</IconButton>;
};

export default YandexOAuth;
