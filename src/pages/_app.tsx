import Layout from "@/layouts/toasts";
import { Providers } from "@/services/wagmi/providers";
import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";

export const theme = extendTheme({
  components: {
    Tabs: {
      baseStyle: {
        tab: {
          _disabled: {
            background: "#676D9A1A",
            opacity: "100%",
            cursor: "pointer",
          },
          "> *:first-of-type": {
            background: "#676D9A1A",
            opacity: "100%",
          },
        },
      },
    },
    Checkbox: {
      baseStyle: {
        icon: {
          bg: "#4D59E8",
          color: "white",
          borderWidth: "0px",
          _disabled: {
            borderWidth: "0px",
            padding: "0px",
            color: "#4D59E8",
            bg: "#4D59E8",
            colorScheme: "#4D59E8",
          },
        },
        control: {
          borderRadius: "base",
          _disabled: {
            borderWidth: "2px",
            borderColor: "#2B2F35",
            padding: "0px",
            color: "black",
            bg: "transparent",
          },
        },
      },
    },
  },

  colors: {
    customBlue: {
      500: "#0969DA",
    },
    customPurple: {
      500: "#4D59E8",
    },
  },
  fonts: {
    body: "Inter, sans-serif",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
          <Head>
        <meta httpEquiv="Cache-Control" content="no-cache, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <title>Chiji | Governance Solution</title>
        {/* <meta
          name="description"
          content=""
        /> */}
        <link rel="shortcut icon" href="/chiji_logo.png" />
      </Head>
      <ChakraProvider theme={theme}>
        <Layout>
          <Providers initialState={pageProps.initialState}>
            <Component {...pageProps} />
          </Providers>
        </Layout>
      </ChakraProvider>
    </>
  );
}
