import type React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Outfit } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  preload: true,
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://telos.bhaskar.xyz'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: "Telos — Photography with Purpose",
    template: "%s | Telos Photography",
  },
  description: "Minimal photography portfolio focused on intentional storytelling. Based in Bengaluru, India.",
  keywords: ["photography", "portfolio", "storytelling", "minimal", "art", "Bengaluru", "India", "photographer"],
  authors: [{ name: "Telos Photography" }],
  creator: "Telos Photography",
  publisher: "Telos Photography",
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
    url: 'https://telos.bhaskar.xyz',
    siteName: "Telos Photography",
    title: "Telos — Photography with Purpose",
    description: "Minimal photography portfolio focused on intentional storytelling. Capturing the intentionality of existence through a minimal lens.",
    images: [
      {
        url: '/og-image.jpg', // Ensure this image exists in public folder or update path
        width: 1200,
        height: 630,
        alt: 'Telos Photography Portfolio',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Telos — Photography with Purpose",
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
  name: 'Telos Photography',
  url: 'https://telos.bhaskar.xyz',
  sameAs: [
    'https://www.instagram.com/telos_photography/',
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
      className={`${playfair.variable} ${outfit.variable}`}
      suppressHydrationWarning
    >
      <head />
      <body
        className="min-h-screen font-sans antialiased bg-white text-black selection:bg-black selection:text-white"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  )
}