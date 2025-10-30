import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import "@/components/ui/8bit/styles/retro.css";

import { Analytics } from "@vercel/analytics/next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OrcDev Project Review",
  description:
    "Submit your project for live code reviews by OrcDev. Get actionable feedback on code quality, architecture, and UX.",
  authors: [{ name: "OrcDev" }],
  openGraph: {
    title: "OrcDev Project Review",
    description:
      "Submit your project for live code reviews by OrcDev. Get actionable feedback on code quality, architecture, and UX.",
    siteName: "OrcDev",
    images: [
      {
        url: "/orcdev.png",
        width: 512,
        height: 512,
        alt: "OrcDev",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OrcDev Project Review",
    description:
      "Submit your project for live code reviews by OrcDev. Get actionable feedback on code quality, architecture, and UX.",
    images: ["/orcdev.png"],
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <Header />
          <div className="mx-auto w-full max-w-[1400px] flex-1 border-r border-l border-dashed">
            <div className="p-4 px-6">{children}</div>
            <Toaster />
          </div>
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
