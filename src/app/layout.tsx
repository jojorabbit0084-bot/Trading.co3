import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trading Co. - Your Investment Platform",
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
        {/* Meta Pixel Placeholder */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Meta Pixel Code (Placeholder)
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              // fbq('init', 'YOUR_PIXEL_ID_HERE');
              // fbq('track', 'PageView');
            `,
          }}
        />
        {/* Google Analytics 4 Placeholder */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Google Analytics 4 (Placeholder)
              // window.dataLayer = window.dataLayer || [];
              // function gtag(){dataLayer.push(arguments);}
              // gtag('js', new Date());
              // gtag('config', 'YOUR_GA4_MEASUREMENT_ID_HERE');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
