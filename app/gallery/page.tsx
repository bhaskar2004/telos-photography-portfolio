import Navbar from "@/components/navbar"
import { Gallery } from "@/components/gallery"
import { GalleryHeader } from "@/components/gallery-header"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Collection",
  description: "Explore the complete Fresnel photography archive. A collection of archival moments and cinematic stories.",
}

export default function GalleryPage() {
  return (
    <main className="min-h-svh">
      <Navbar />

      <GalleryHeader />

      <Gallery detailed />

      <footer className="px-6 py-24 md:px-12 border-t border-border flex justify-between items-end bg-background">
        <span className="font-serif text-xl tracking-tighter text-foreground">Fresnel</span>
        <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground">© {new Date().getFullYear()}</span>
      </footer>
    </main>
  )
}
