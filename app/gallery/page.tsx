import type { Metadata } from "next"
import GalleryPageClient from "./gallery-client"

export const metadata: Metadata = {
  title: "Collection",
  description: "Explore the complete Fresnel photography archive. A collection of archival moments and cinematic stories.",
}

export default function GalleryPage() {
  return <GalleryPageClient />
}
