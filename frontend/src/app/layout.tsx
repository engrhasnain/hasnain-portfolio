import type { Metadata, Viewport } from "next";
import { Caveat, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Interactions } from "@/components/interactions";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { MotionProvider } from "@/components/motion";
import { publicFileExists } from "@/lib/public-file";
import { site } from "@/lib/site";
import "./globals.css";

// One family for everything: Plus Jakarta Sans, heavy and tight for headings, calm for body text.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

// A handwriting face for margin notes and labels: the "engineer's notebook" touch.
const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caveat",
  weight: ["500", "700"],
});

const verificationOther: Record<string, string> = {};
if (process.env.BING_SITE_VERIFICATION) verificationOther["msvalidate.01"] = process.env.BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.jobTitle}`,
    template: `%s · ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: site.keywords,
  alternates: { canonical: "/", types: { "application/rss+xml": [{ url: "/feed.xml", title: `${site.name} · Blog` }] } },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: "/",
    title: `${site.name} · ${site.jobTitle}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: verificationOther,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1020",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${caveat.variable}`}>
      <body className="min-h-dvh bg-night font-sans text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-panel focus:px-4 focus:py-2 focus:text-teal"
        >
          Skip to content
        </a>
        <Header photo={publicFileExists(site.photo) ? site.photo : undefined} />
        <MotionProvider>
          <main id="main">{children}</main>
        </MotionProvider>
        <Footer />
        <Interactions />
        <WhatsAppFloat />
        {/* The analytics script only exists on Vercel deployments. */}
        {process.env.VERCEL ? <Analytics /> : null}
        {/* Free click tracking (Umami Cloud). Only loads once you add your website ID. */}
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ? (
          <Script
            src="https://cloud.umami.is/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
