import "@/styles/globals.css"
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";

//Apollo Client
import { useApollo } from "@/Apollo/client";

//Fonts
import { inter } from "@/Fonts";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <main className={`${inter.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </ApolloProvider>
  )
}