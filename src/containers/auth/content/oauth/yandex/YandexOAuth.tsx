import { IconButton } from "@mui/material";
import useYandexOAuth from "@/containers/auth/content/oauth/yandex/logic/useYandexOAuth";
import icon from "/public/images/icons/yandex.png";
import Image from "next/image";

const YandexOAuth = () => {
  const handleYandexLogin = useYandexOAuth();

  return (
    <IconButton onClick={handleYandexLogin} sx={{ p: 0 }}>
      <Image
        src={icon}
        alt={"Google"}
        width={54}
        height={54}
        priority
        style={{ objectFit: "contain" }}
      />
    </IconButton>
  );
};

export default YandexOAuth;
