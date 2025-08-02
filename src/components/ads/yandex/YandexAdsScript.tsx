import Script from "next/script";

const YandexAdsScript = () => {
  return (
    <>
      <Script
        id="yandex-rtb-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.yaContextCb=window.yaContextCb||[]`,
        }}
      />
      <Script
        id="yandex-rtb-loader"
        strategy="afterInteractive"
        src="https://yandex.ru/ads/system/context.js"
        async
      />
    </>
  );
};

export default YandexAdsScript;
