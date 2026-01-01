import { Gallery } from "@/components/gallery"
import Link from "next/link"

export default function GalleryPage() {
  return (
    <main className="min-h-screen grain">
      <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-10 md:px-12">
        <Link href="/" className="flex flex-col">
          <span className="font-serif text-2xl tracking-tighter leading-none">Telos</span>
          <span className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground mt-1">Archival Portfolio</span>
        </Link>

        <div className="hidden md:flex items-center gap-12 text-[10px] tracking-[0.3em] uppercase font-medium">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/#about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/#contact" className="hover:text-primary transition-colors">
            Contact
          </Link>
        </div>
      </nav>

      <div className="pt-48 px-6 md:px-12">
        <div className="max-w-4xl space-y-6">
          <h1 className="font-serif text-6xl md:text-8xl tracking-tighter">Collection</h1>
          <p className="text-[11px] tracking-[0.5em] uppercase text-muted-foreground">Detailed Archives</p>
        </div>
      </div>

      <Gallery detailed />

      <footer className="px-6 py-24 md:px-12 border-t border-border flex justify-between items-end">
        <span className="font-serif text-xl tracking-tighter">Telos</span>
        <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground">© 2025</span>
      </footer>
    </main>
  )
}
