import "@/app/globals.css";

import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

import { siteConfig } from "../config/site";

export const metadata: Metadata = {
  title: {
    default: "artexoApp | Akıllı randevu ve işletme yönetimi platformu",
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    "Artexo",
    "artexoApp",
    "online randevu sistemi",
    "kuaför randevu sistemi",
    "güzellik merkezi randevu",
    "klinik randevu programı",
    "psikolog randevu sistemi",
    "diyetisyen randevu",
    "personel mesai yönetimi",
  ],
  authors: [
    {
      name: "artexoApp",
      url: siteConfig.url,
    },
  ],
  creator: "artexoApp",
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteConfig.url,
    title: "artexoApp | Akıllı randevu ve işletme yönetimi platformu",
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1536,
        height: 1024,
        alt: "artexoApp online randevu ve işletme yönetimi platformu logosu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "artexoApp | Akıllı randevu ve işletme yönetimi platformu",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: "/artexo-icon.png",
    apple: "/artexo-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className="dark"
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <body className="bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
