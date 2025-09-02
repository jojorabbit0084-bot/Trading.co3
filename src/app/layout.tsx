import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/utils/UserContext";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import OneTapComponent from '@/components/GoogleOneTap'; // Import the OneTapComponent

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TradingSim - Your Investment Platform",
  description: "Professional trading platform with portfolio management, real-time analytics, and secure transactions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://accounts.google.com/gsi/client" async></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen`}
      >
        <UserProvider>
          {children}
        </UserProvider>
        <OneTapComponent /> {/* Render the OneTapComponent globally */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
