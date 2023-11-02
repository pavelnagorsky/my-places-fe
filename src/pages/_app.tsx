import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import lightTheme from "@/styles/theme/lightTheme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "@/utility/createEmotionCache";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";
import * as React from "react";
import Layout from "@/hoc/Layout";
import { EmotionCache } from "@emotion/cache";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { motion } from "framer-motion";

const clientSideEmotionCache = createEmotionCache();

function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
  router,
}: AppProps & { emotionCache: EmotionCache }) {
  return (
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
          </Head>
          <CssBaseline />
          <Layout>
            <motion.div
              key={router.route}
              initial="pageInitial"
              animate="pageAnimate"
              variants={{
                pageInitial: {
                  opacity: 0,
                },
                pageAnimate: {
                  opacity: 1,
                },
              }}
            >
              <Component {...pageProps} />
            </motion.div>
          </Layout>
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  );
}

export default appWithTranslation(App);
