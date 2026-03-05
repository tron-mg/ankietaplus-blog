import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://blog.ankietaplus.pl'),
  title: "Blog AnkietaPlus — ankiety online, testy, quizy i formularze",
  description:
    "Artykuły i landingi SEO o ankietach internetowych, testach online i formularzach. Praktyczne przewodniki nastawione na wynik biznesowy.",
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://blog.ankietaplus.pl',
    siteName: 'AnkietaPlus Blog',
    title: 'Blog AnkietaPlus — ankiety online, testy, quizy i formularze',
    description:
      'Artykuły i landingi SEO o ankietach internetowych, testach online i formularzach. Praktyczne przewodniki nastawione na wynik biznesowy.',
    images: [{ url: '/images/default.svg', width: 1200, height: 675, alt: 'AnkietaPlus Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog AnkietaPlus — ankiety online, testy, quizy i formularze',
    description:
      'Artykuły i landingi SEO o ankietach internetowych, testach online i formularzach. Praktyczne przewodniki nastawione na wynik biznesowy.',
    images: ['/images/default.svg'],
  },
  verification: {
    google: "331t1dgJP6nk_amxKnCZC-0uZMvgTFRplt8LKlW80b8",
    other: {
      "msvalidate.01": ["97317DC5BA12E239A2AA3BE6CA2E66FA"],
      alexaVerifyID: ["ajbInVUpKzzLqyFMSHXFSoe0KEs"],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3DNVFEXE1P"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-3DNVFEXE1P');`}
        </Script>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
