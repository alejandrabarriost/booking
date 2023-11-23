import type { AppProps } from "next/app";
import { Inter as FontSans } from "next/font/google";
import { Provider } from "jotai";

import { Separator } from "@booking/@components/ui/separator";
import { Toaster } from "@booking/@components/ui/toaster";
import Loader from "@booking/components/Loader";
import { Menu } from "@booking/components/Menu";
import { Session } from "@booking/config/session";
import { sessionAtom, store } from "@booking/config/store";

import "@booking/styles/globals.css";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function App({
  Component,
  pageProps,
}: AppProps<{ session: Session }>) {
  if (pageProps.session.user) {
    store.set(sessionAtom, pageProps.session);
  } else {
    store.set(sessionAtom, null);
  }

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${fontSans.style.fontFamily};
        }
      `}</style>
      <main className="min-h-screen bg-background font-sans antialiased container mt-4">
        <Provider store={store}>
          <header className="mb-4 sticky">
            <Menu />
            <Separator />
          </header>
          <Loader>
            <Component {...pageProps} />
          </Loader>
          <Toaster />
        </Provider>
      </main>
    </>
  );
}
