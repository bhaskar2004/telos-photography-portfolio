import type React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  preload: true,
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: "Telos — Photography with Purpose",
    template: "%s | Telos Photography",
  },
  description: "Minimal photography portfolio focused on intentional storytelling.",
  keywords: ["photography", "portfolio", "storytelling", "minimal", "art"],
  authors: [{ name: "Telos Photography" }],
  creator: "Telos Photography",
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
    siteName: "Telos Photography",
    title: "Telos — Photography with Purpose",
    description: "Minimal photography portfolio focused on intentional storytelling.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Telos — Photography with Purpose",
    description: "Minimal photography portfolio focused on intentional storytelling.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head />
      <body
        className="min-h-screen font-sans antialiased bg-white text-black selection:bg-black selection:text-white"
      >
        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  )
}