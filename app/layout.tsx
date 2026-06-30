import type { Metadata, Viewport } from "next";
import { jost } from "./fonts";
import { SITE } from "@/lib/site";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { MobileCta } from "@/components/MobileCta";
import { JsonLd } from "@/components/JsonLd";
import { dentistSchema, websiteSchema } from "@/lib/schema";
import "./globals.css";

const DEFAULT_TITLE = `${SITE.name} | Dentist in ${SITE.city}, ${SITE.province}`;
const DEFAULT_DESCRIPTION = `${SITE.name} is a family & emergency dental clinic at ${SITE.address.street} in ${SITE.city}, ${SITE.provinceCode}. Accepting new patients, CDCP & direct billing. Call ${SITE.phone}.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE.shortName}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE.url,
    locale: "en_CA",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/assets/apple-touch-icon.png",
  },
  // Google Search Console verification. Set NEXT_PUBLIC_GSC_VERIFICATION in
  // Vercel to the token from the "HTML tag" verification method.
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
};

export const viewport: Viewport = {
  themeColor: SITE.brand.accent,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={jost.variable}>
      <body className="flex min-h-screen flex-col bg-white text-brand-ink antialiased">
        {/* Global site-wide structured data (mirrors NAP/branding shown in UI). */}
        <JsonLd data={[dentistSchema(), websiteSchema()]} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand-ink focus:px-4 focus:py-2 focus:text-brand-inverse"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileCta />
      </body>
    </html>
  );
}
