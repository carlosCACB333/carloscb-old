import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import type { AppProps } from "next/app";
import { AuthorProvider, LayoutProvider, ThemeProvider } from "../context";
import "../styles/globals.scss";
import "../styles/code.css";
import "aos/dist/aos.css";
import { ApolloProvider } from "@apollo/client";
import { CssBaseline } from "@mui/material";
import { appWithTranslation } from "next-i18next";
import Script from "next/script";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "../app";
import { client } from "../utils/apolloClient";
import Head from "next/head";
import { AppLayout } from "../components/layouts";
import { useEffect } from "react";
import aos from "aos";

const NextApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    aos.init({
      duration: 1000,
    });
  }, []);

  return (
    <>
      <Script
        async
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-YK8283Z1P5"
      ></Script>
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
      <Provider store={store}>
        <LayoutProvider>
          <ThemeProvider>
            <AppLayout>
              <ApolloProvider client={client}>
                <AuthorProvider>
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
                </AuthorProvider>
              </ApolloProvider>
            </AppLayout>
          </ThemeProvider>
        </LayoutProvider>
      </Provider>
    </>
  );
};

export default appWithTranslation(NextApp);
