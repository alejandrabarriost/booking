import { Toaster } from "@booking/@components/ui/toaster";
import { cn } from "@booking/lib/util";
import "@booking/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter as FontSans } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${fontSans.style.fontFamily};
        }
      `}</style>
      <main className="min-h-screen bg-background font-sans antialiased container mt-4">
        <Component {...pageProps} />
        <Toaster />
      </main>
    </>
  );
}
