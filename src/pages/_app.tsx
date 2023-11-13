import { Toaster } from "@booking/@components/ui/toaster";
import "@booking/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter as FontSans } from "next/font/google";
import { Provider } from "jotai";
import { sessionAtom, store } from "@booking/config/store";
import { Menu } from "@booking/components/Menu";
import { Separator } from "@booking/@components/ui/separator";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function App({ Component, pageProps }: AppProps) {
  if (pageProps.session) {
    store.set(sessionAtom, pageProps.session);
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
          <header className="mb-4">
            <Menu />
            <Separator />
          </header>
          <Component {...pageProps} />
          <Toaster />
        </Provider>
      </main>
    </>
  );
}
