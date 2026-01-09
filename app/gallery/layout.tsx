import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Gallery",
    description: "A curated collection of moments captured through the lens. Browse the complete Telos photography portfolio.",
    alternates: {
        canonical: '/gallery',
    },
    openGraph: {
        title: "Gallery | Telos Photography",
        description: "A curated collection of moments captured through the lens.",
        url: 'https://telos.bhaskar.xyz/gallery',
    },
}

export default function GalleryLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
