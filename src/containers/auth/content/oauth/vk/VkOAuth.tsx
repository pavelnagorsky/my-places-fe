import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { Environment } from "@/shared/Environment";

const VkOAuth = () => {
  const router = useRouter();
  const redirectLink = `https://${Environment.domain}/auth/oauth/vk`;

  const getVkAuthUrl = () => {
    const redirectUri = encodeURIComponent(redirectLink);
    const state = encodeURIComponent(new Date().toISOString());
    return `https://id.vk.com/authorize?response_type=code&client_id=${Environment.vkAppId}&redirect_uri=${redirectUri}&scope=email&state=${state}&code_challenge=${Environment.vkCodeChallenge}&code_challenge_method=S256`;
  };

  const handleVkLogin = () => {
    router.push(getVkAuthUrl());
  };

  return <IconButton onClick={handleVkLogin}>VK</IconButton>;
};

export default VkOAuth;
