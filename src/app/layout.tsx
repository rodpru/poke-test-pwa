import { Navigation } from "@/components/layout/navigation";
import { OfflineIndicator } from "@/components/layout/offline-indicator";
import { ChromeExtensionCleanup } from "@/components/shared/chrome-extension-cleanup";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pokédex PWA",
  description: "Aplicação web progressiva para gestão de coleção de Pokémon",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Pokédex",
    startupImage: "/icons/icon-512.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#ef4444",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-pt" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
        suppressHydrationWarning
      >
        <ChromeExtensionCleanup />
        <Providers>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <OfflineIndicator />
        </Providers>
      </body>
    </html>
  );
}
