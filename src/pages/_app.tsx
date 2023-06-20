import '@/styles/globals.scss'
import type { AppProps } from 'next/app';
import lightTheme from "@/styles/theme/lightTheme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {CacheProvider} from "@emotion/react";
import createEmotionCache from "@/utility/createEmotionCache";
import { appWithTranslation } from 'next-i18next'
import Head from "next/head";
import * as React from "react";
import Layout from "@/hoc/Layout";
import {EmotionCache} from "@emotion/cache";

const clientSideEmotionCache = createEmotionCache();

function App({ Component, emotionCache = clientSideEmotionCache, pageProps }: AppProps & {emotionCache: EmotionCache}) {
    return <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <CssBaseline />
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    </CacheProvider>
}

export default appWithTranslation(App);
