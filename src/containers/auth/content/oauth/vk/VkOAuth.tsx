import { IconButton } from "@mui/material";
import useVkOAuth from "@/containers/auth/content/oauth/vk/logic/useVkOAuth";
import icon from "/public/images/icons/vk.png";
import Image from "next/image";

const VkOAuth = () => {
  const handleVkLogin = useVkOAuth();

  return (
    <IconButton onClick={handleVkLogin} sx={{ p: 0 }}>
      <Image
        src={icon}
        alt={"VK"}
        width={54}
        height={54}
        priority
        style={{ objectFit: "contain" }}
      />
    </IconButton>
  );
};

export default VkOAuth;
