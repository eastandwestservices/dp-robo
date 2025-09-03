// src/pages/_app.tsx
import type { AppProps } from "next/app";
import "../styles/globals.css"; // ✅ keep only one import
import Header from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
