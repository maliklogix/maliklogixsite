import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Lora, Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import RouteTransition from "@/components/shared/RouteTransition";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-bricolage",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains-mono",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: { template: "%s | MalikLogix", default: "MalikLogix — AI Digital Marketing" },
  description:
    "MalikLogix uses cutting-edge AI to grow your business 10x. AI Marketing, SEO, Automation, Content, Paid Ads & Shopify. hello@maliklogix.com",
  metadataBase: new URL("https://maliklogix.com"),
  icons: {
    icon: "/favicon.png",
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
      className={`${bricolage.variable} ${plusJakarta.variable} ${dmSans.variable} ${jetBrainsMono.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-body)] text-[var(--color-text)]" suppressHydrationWarning>
        <RouteTransition>{children}</RouteTransition>
        <Toaster richColors />
      </body>
    </html>
  );
}
