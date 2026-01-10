import type React from "react"
import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Lato } from "next/font/google"
import SmoothScroll from "@/components/smooth-scroll"
import "./globals.css"

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  preload: true,
})

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "700"],
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://fresnel.bhaskar.xyz'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: "Fresnel — Photography with Purpose",
    template: "%s | Fresnel Photography",
  },
  description: "Minimal photography portfolio focused on intentional storytelling. Based in Bengaluru, India.",
  keywords: ["Fresnel", "Fresnel Photography", "Fresnel Portfolio", "Fresnel India", "photography", "portfolio", "storytelling", "minimal", "art", "Bengaluru", "India", "photographer"],
  authors: [{ name: "Fresnel Photography" }],
  creator: "Fresnel Photography",
  publisher: "Fresnel Photography",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "any" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: 'https://fresnel.bhaskar.xyz',
    siteName: "Fresnel Photography",
    title: "Fresnel — Photography with Purpose",
    description: "Minimal photography portfolio focused on intentional storytelling. Capturing the intentionality of existence through a minimal lens.",
    images: [
      {
        url: '/og-image.jpg', // Ensure this image exists in public folder or update path
        width: 1200,
        height: 630,
        alt: 'Fresnel Photography Portfolio',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fresnel — Photography with Purpose",
    description: "Minimal photography portfolio focused on intentional storytelling.",
    images: ['/og-image.jpg'], // Consistency with OG
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Fresnel Photography',
  url: 'https://fresnel.bhaskar.xyz',
  sameAs: [
    'https://www.instagram.com/fresnelphotography/',
    'https://bhaskar.xyz'
  ],
  jobTitle: 'Photographer',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    addressCountry: 'India'
  },
  description: 'Minimal photography portfolio focused on intentional storytelling.'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${lato.variable}`}
      suppressHydrationWarning
    >
      <head />
      <body
        className="min-h-screen font-sans antialiased bg-white text-black selection:bg-black selection:text-white"
      >
        <SmoothScroll>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
          </div>
        </SmoothScroll>
      </body>
    </html>
  )
}