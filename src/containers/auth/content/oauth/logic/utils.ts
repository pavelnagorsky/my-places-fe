const initiateOAuthLogin = (url: string): Promise<Record<string, string>> => {
  return new Promise((resolve, reject) => {
    const isMobile = window.innerWidth <= 768; // Common mobile breakpoint
    const width = isMobile ? Math.min(window.screen.width * 0.9, 500) : 600;
    const height = isMobile ? Math.min(window.screen.height * 0.7, 600) : 600;
    // Center the popup on the screen
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      url,
      "oauth",
      `width=${width},height=${height},left=${left},top=${top}`
    );

    // Check for popup blocker
    if (!popup) {
      reject(new Error("Popup blocked. Please allow popups for this site."));
      return;
    }

    // Message handler for popup communication
    const messageHandler = (event: MessageEvent) => {
      // Verify the message is from our domain
      if (event.origin !== window.location.origin) return;
      if (event.data.type === "oauth-callback") {
        window.removeEventListener("message", messageHandler);
        if (popupCheckInterval) clearInterval(popupCheckInterval);

        // Simplified message handling - just look for code
        const code =
          event.data.payload?.code ?? event.data.payload?.access_token;

        if (code) {
          popup.close();
          resolve(event.data.payload); // Resolve with object of url query params
        } else {
          popup.close();
          reject(new Error(event.data.payload?.error || "No code received"));
        }
      }
    };

    window.addEventListener("message", messageHandler);

    // Fallback: if popup is closed without sending a message
    const popupCheckInterval = setInterval(() => {
      if (popup.closed) {
        clearInterval(popupCheckInterval);
        window.removeEventListener("message", messageHandler);
        reject(new Error("Authentication window was closed"));
      }
    }, 1000);

    // Cleanup on promise resolution/rejection
    const cleanup = () => {
      clearInterval(popupCheckInterval);
      window.removeEventListener("message", messageHandler);
    };

    // Ensure cleanup happens in any case
    Promise.race([
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Authentication timeout")), 300000)
      ), // 5 min timeout
      new Promise((resolve) => resolve),
    ])
      .then(cleanup)
      .catch(cleanup);
  });
};

export default initiateOAuthLogin;
