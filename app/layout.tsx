import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Bricolage_Grotesque } from "next/font/google";
import { Toaster } from "sonner";
import Script from "next/script";
import "./globals.css";
import RouteTransition from "@/components/shared/RouteTransition";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: { template: "%s | MalikLogix", default: "MalikLogix — AI Digital Marketing" },
  description:
    "MalikLogix uses cutting-edge AI to grow your business 10x. AI Marketing, SEO, Automation, Content, Paid Ads & Shopify. hello@maliklogix.com",
  metadataBase: new URL("https://maliklogix.com"),
  icons: {
    icon: "/logo.webp",
  },
  openGraph: {
    siteName: "MalikLogix",
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", creator: "@maliklogix" },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${dmSans.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-body)] text-[var(--color-text)]" suppressHydrationWarning>
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9083888001969660"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Google Analytics (ga4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GG65WXC85C"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-GG65WXC85C');
          `}
        </Script>

        <RouteTransition>{children}</RouteTransition>
        <Toaster richColors />
      </body>
    </html>
  );
}
