import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "@/styles/utility/createEmotionCache";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";
import * as React from "react";
import Layout from "@/hoc/Layout";
import { EmotionCache } from "@emotion/cache";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import useDateFnsLocale from "@/hooks/useDateFnsLocale";
import { DefaultSeo } from "next-seo";
import { Environment } from "@/shared/Environment";
import I18nLanguages from "@/shared/I18nLanguages";
import createLightTheme from "@/styles/theme/lightTheme";
import { useRouter } from "next/router";
import { GoogleAnalytics } from "nextjs-google-analytics";

const clientSideEmotionCache = createEmotionCache();

function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: AppProps & { emotionCache: EmotionCache }) {
  const dateFnsLocale = useDateFnsLocale();
  const { locale } = useRouter();

  return (
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <ThemeProvider theme={createLightTheme(locale as any)}>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={dateFnsLocale}
          >
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
            </Head>
            <DefaultSeo
              openGraph={{
                type: "website",
                locale: I18nLanguages.ru,
                url: `https://${Environment.domain}/`,
                siteName: "Знай свой край",
                title: "Знай свой край",
              }}
              titleTemplate={"%s | Знай свой край"}
            />
            <GoogleAnalytics
              trackPageViews={{ ignoreHashChange: true }}
              gaMeasurementId={Environment.GAMeasurementId}
            />
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </LocalizationProvider>
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  );
}

export default appWithTranslation(App);
