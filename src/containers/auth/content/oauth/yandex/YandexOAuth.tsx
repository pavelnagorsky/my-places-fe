import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { Environment } from "@/shared/Environment";

const initiateYandexLogin = (): Promise<{ code: string }> => {
  return new Promise((resolve, reject) => {
    const width = 600;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const state = encodeURIComponent(new Date().toISOString());

    const params = new URLSearchParams({
      response_type: "code",
      client_id: "b93b891f22d24f02a3c09c0292c91ad1",
      redirect_uri: window.location.origin + "/auth/oauth/yandex",
      scope: "login:email login:info",
      state,
    });

    const popup = window.open(
      `https://oauth.yandex.ru/authorize?${params.toString()}`,
      "yandexAuth",
      `width=${width},height=${height},left=${left},top=${top}`
    );

    // Check for popup blocker
    if (!popup) {
      reject(new Error("Popup blocked. Please allow popups for this site."));
      return;
    }

    // Poll the popup for completion
    const interval = setInterval(() => {
      try {
        // Check if popup was closed
        if (popup.closed) {
          clearInterval(interval);
          reject(new Error("Authentication window was closed"));
          return;
        }

        // Check if popup has been redirected to our callback URL
        if (
          popup.location.href.startsWith(
            window.location.origin + "/auth/oauth/yandex"
          )
        ) {
          const popupParams = new URLSearchParams(popup.location.search);
          const code = popupParams.get("code") as string;
          const state = popupParams.get("state");
          const error = popupParams.get("error");

          if (error) {
            clearInterval(interval);
            popup.close();
            reject(new Error(error));
            return;
          }

          clearInterval(interval);
          popup.close();
          resolve({ code });
        }
      } catch (e) {
        // Ignore cross-origin errors - popup hasn't redirected yet
      }
    }, 200);
  });
};

const YandexOAuth = () => {
  const router = useRouter();
  const redirectLink = `https://${Environment.domain}/auth/oauth/yandex`;

  const getYandexAuthUrl = () => {};

  const handleYandexLogin = () => {
    initiateYandexLogin()
      .then((res) => {
        console.log("success", res);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return <IconButton onClick={handleYandexLogin}>Y</IconButton>;
};

export default YandexOAuth;
