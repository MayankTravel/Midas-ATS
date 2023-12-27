import "../Components/assets/scss/themes.scss";
import React, { ReactElement, ReactNode } from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import SSRProvider from "react-bootstrap/SSRProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  AppContext,
  AppInitialProps,
  AppLayoutProps,
  AppProps,
} from "next/app";
import type { NextComponentType, NextPage } from "next";
import { store } from "Components/slices";

// Activating fake backend

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
  ...rest
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Midas Job Portal</title>
      </Head>
      <SSRProvider>
        <React.StrictMode>
          <Provider store={store}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {getLayout(<Component {...pageProps} />)}
            </LocalizationProvider>
          </Provider>
        </React.StrictMode>
      </SSRProvider>
    </>
  );
};

export default MyApp;
