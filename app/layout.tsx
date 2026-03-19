import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import PersistProvider from "@/src/provider/PersistProvider";
import ConditionalLayout from "@/src/components/ui/ConditionalLayout";
import { Toaster } from 'sonner';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: "Travel buddy",
  description: "Travel Buddy & Meetup Platform for everyone",
  icons:{
    icon: '/siteicon.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${roboto.className} bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased`}
      >
        <PersistProvider>
          <Toaster position="top-center" richColors />
          <ConditionalLayout>{children}</ConditionalLayout>
        </PersistProvider>
      </body>
    </html>
  );
}
