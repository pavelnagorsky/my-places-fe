import { useRouter } from "next/router";
import { useEffect } from "react";
import authService from "@/services/auth-service/auth.service";

const useYandexOAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const code = router.query.code as string;
    if (!code) {
      router.push("/");
      return;
    }
    authService
      .vkOAuth({
        authCode: code,
        deviceId: router.query.device_id as string,
        state: router.query.state as string,
      })
      .then(({ data }) => {
        // TODO: get user data
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        router.push("/");
      });
  }, [router.query]);
};

export default useYandexOAuth;
