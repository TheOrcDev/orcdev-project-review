import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import "./retro-globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import "@/components/ui/8bit/styles/retro.css";

import { Analytics } from "@vercel/analytics/next";
import { ActiveThemeProvider } from "@/components/active-theme";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  authors: [{ name: "OrcDev" }],
  description:
    "Submit your project for live code reviews by OrcDev. Get actionable feedback on code quality, architecture, and UX.",
  openGraph: {
    description:
      "Submit your project for live code reviews by OrcDev. Get actionable feedback on code quality, architecture, and UX.",
    images: [
      {
        alt: "OrcDev",
        height: 512,
        url: "/orcdev.png",
        width: 512,
      },
    ],
    siteName: "OrcDev",
    title: "OrcDev Project Review",
    type: "website",
  },
  title: "OrcDev Project Review",
  twitter: {
    card: "summary_large_image",
    description:
      "Submit your project for live code reviews by OrcDev. Get actionable feedback on code quality, architecture, and UX.",
    images: ["/orcdev.png"],
    title: "OrcDev Project Review",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <NuqsAdapter>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
            enableSystem
          >
            <ActiveThemeProvider>
              <Header />
              <div className="mx-auto w-full max-w-[1400px] flex-1 border-r border-l border-dashed">
                <div className="p-4 px-6">{children}</div>
                <Toaster />
              </div>
              <Footer />
              <Analytics />
            </ActiveThemeProvider>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
