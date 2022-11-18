import '../styles/globals.scss';
import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import createEmotionCache from '../config/createCache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '../context';
import { MainLayout } from '../components/Layout';
import { ApolloProvider } from '@apollo/client';
import { client } from '../utils/apolloClient';
import { AuthorProvider } from '../context/AuthorContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { appWithTranslation } from 'next-i18next';
import Script from 'next/script';
import aos from 'aos';
import 'aos/dist/aos.css';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const NextApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  React.useEffect(() => {
    aos.init({
      duration: 1000,
    });
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Script async strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-YK8283Z1P5"></Script>
      <Script
        async
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YK8283Z1P5');
          `,
        }}
      />

      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider>
        <ApolloProvider client={client}>
          <AuthorProvider>
            <MainLayout>
              <CssBaseline />
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
              <Component {...pageProps} />
            </MainLayout>
          </AuthorProvider>
        </ApolloProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default appWithTranslation(NextApp);
