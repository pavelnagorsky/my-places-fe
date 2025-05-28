import { IconButton } from "@mui/material";
import useVkOAuth from "@/containers/auth/content/oauth/vk/logic/useVkOAuth";

const VkOAuth = () => {
  const handleVkLogin = useVkOAuth();

  return <IconButton onClick={handleVkLogin}>VK</IconButton>;
};

export default VkOAuth;
