import Script from "next/script";
import { Environment } from "@/shared/Environment";

const GlobalGoogleAds = () => {
  return (
    <Script
      id="adsbygoogle-init"
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${Environment.googleAdsKey}`}
      crossOrigin="anonymous"
    />
  );
};

export default GlobalGoogleAds;
