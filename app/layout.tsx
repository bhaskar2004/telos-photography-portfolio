import type React from "react"
import type { Metadata, Viewport } from "next"
import { Syne, Epilogue } from "next/font/google"
import SmoothScroll from "@/components/smooth-scroll"
import Particles from "@/components/particles"
import BackToTop from "@/components/back-to-top"
import "./globals.css"

// ─── Constants ────────────────────────────────────────────────────────────────

const SITE_URL = "https://fresnel.bhaskar.xyz"
const SITE_NAME = "Fresnel Photography"
const SITE_TITLE = "Fresnel Photography — Archival Storytelling & Cinematic Visuals"
const SITE_DESCRIPTION =
  "Fresnel is a premier photography studio by Bhaskar, specializing in archival storytelling, editorial commissions, and cinematic landscapes. Discover intentional photography in Bengaluru, India."
const OG_IMAGE = "/og-image.png"

// ─── Fonts ────────────────────────────────────────────────────────────────────

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  preload: true,
})

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  preload: true,
})

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Fresnel",
    "Fresnel Photography",
    "Bhaskar Fresnel",
    "Cinematic Storytelling",
    "Archival Photography",
    "Minimalist Photographer Bengaluru",
    "Editorial Photography Portfolio",
    "Fine Art Photography India",
    "Bespoke Portraiture",
    "Contemporary Art Photography",
    "Visual Storyteller India",
    "Professional Photographer Bengaluru",
    "Photography Archives",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "photography",
  icons: {
    icon: "/favicon.png",
    apple: [{ url: "/favicon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description:
      "Explore the archival photography of Fresnel. A collection of intentional moments, cinematic landscapes, and minimalist storytelling.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Portfolio`,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@fresnelphotography",
    creator: "@fresnelphotography",
    title: SITE_TITLE,
    description: "Archival photography portfolio focused on intentional storytelling and cinematic visuals.",
    images: [
      {
        url: OG_IMAGE,
        alt: `${SITE_NAME} — Portfolio`,
      },
    ],
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
}

// ─── Viewport ─────────────────────────────────────────────────────────────────

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    // Use the actual background colour per scheme — not black for both.
    // Light: linen-white (#f5f6f4 ≈ oklch 0.96 0.01 70)
    // Dark:  midnight-deep (#23252a ≈ oklch 0.14 0.02 260)
    { media: "(prefers-color-scheme: light)", color: "#f5f6f4" },
    { media: "(prefers-color-scheme: dark)", color: "#23252a" },
  ],
}

// ─── Structured Data ──────────────────────────────────────────────────────────

/**
 * Escape `<` to prevent a crafted string (e.g. a description containing
 * `</script><script>alert(1)`) from breaking out of the surrounding script tag.
 * Apply to every JSON-LD block.
 */
function sanitizeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c")
}

/**
 * A single @graph block is preferred over two <script> tags:
 *  - crawlers (Google, Bing) can resolve cross-entity relationships within it
 *  - one fewer inline script for the browser to parse
 *  - no duplicate @context declarations
 */
const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Gallery",
          item: `${SITE_URL}/gallery`,
        },
      ],
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Bhaskar",
      alternateName: "Fresnel",
      url: SITE_URL,
      sameAs: [
        "https://www.instagram.com/fresnelphotography/",
        "https://bhaskar.xyz",
      ],
      jobTitle: "Photographer",
      worksFor: {
        "@id": `${SITE_URL}/#business`
      },
      description: SITE_DESCRIPTION,
    },
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": `${SITE_URL}/#business`,
      name: SITE_NAME,
      alternateName: "Fresnel",
      image: [`${SITE_URL}${OG_IMAGE}`],
      url: SITE_URL,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Bengaluru",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560001",
        addressCountry: "IN",
      },
      priceRange: "$$",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
      founder: { "@id": `${SITE_URL}/#person` },
      knowsAbout: ["Photography", "Archival Storytelling", "Cinematic Visuals", "Editorial Photography"],
    },
  ],
}

const safeJsonLd = sanitizeJsonLd(jsonLdGraph)

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${syne.variable} ${epilogue.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: safeJsonLd }}
        />
      </head>
      <body
        // `antialiased` is already declared on html in globals.css and inherits —
        // no need to repeat it here.
        // `min-h-svh` avoids the iOS "100vh includes browser chrome" height jump.
        className="min-h-svh font-sans bg-background text-foreground"
      >
        {/* Skip-to-content for keyboard / screen-reader users */}
        <a
          href="#main-content"
          // z-[200] ensures it renders above the grain overlay (z-100)
          // and the vignette (z-99) when focused
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:outline focus:outline-2 focus:outline-ring"
        >
          Skip to content
        </a>

        <SmoothScroll>
          <Particles />
          <BackToTop />
          <div className="relative flex min-h-svh flex-col">
            <main id="main-content" className="flex-1">
              {children}
            </main>
          </div>
        </SmoothScroll>
      </body>
    </html>
  )
}