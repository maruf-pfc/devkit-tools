import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

// Fonts
// for general text
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
// for code blocks
const mono = Fira_Code({ subsets: ["latin"], variable: "--font-mono" });

// Metadata
export const metadata: Metadata = {
  title: "DevKit Tools - All-in-One Developer Utilities",
  description:
    "Essential developer tools including JSON formatter, UUID generator, regex tester, and more. Save time with our comprehensive toolkit.",
  keywords: [
    "developer tools",
    "JSON formatter",
    "UUID generator",
    "regex tester",
    "base64 encoder",
    "developer utilities",
  ],
  authors: [{ name: "Md. Maruf Sarker" }],
  creator: "Md. Maruf Sarker",
  publisher: "Md. Maruf Sarker",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://devkit-tools.vercel.app"),
  openGraph: {
    title: "DevKit Tools - All-in-One Developer Utilities",
    description:
      "Essential developer tools including JSON formatter, UUID generator, regex tester, and more.",
    url: "https://devkit-tools.vercel.app",
    siteName: "DevKit Tools",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevKit Tools - All-in-One Developer Utilities",
    description:
      "Essential developer tools including JSON formatter, UUID generator, regex tester, and more.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "DevKit Tools",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sans.className} ${mono.className}`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}