"use client"

import { Gallery } from "@/components/gallery"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Home() {
  const titleWords = ["T", "e", "l", "o", "s"]

  return (
    <main className="min-h-screen grain">
      <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-10 md:px-12">
        <div className="flex flex-col">
          <span className="font-serif text-2xl tracking-tighter leading-none">Telos</span>
          <span className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground mt-1">Archival Portfolio</span>
        </div>

        <div className="hidden md:flex items-center gap-12 text-[10px] tracking-[0.3em] uppercase font-medium">
          <Link href="/gallery" className="hover:text-primary transition-colors">
            Gallery
          </Link>
          <a href="#about" className="hover:text-primary transition-colors">
            About
          </a>
          <a href="#contact" className="hover:text-primary transition-colors">
            Contact
          </a>
        </div>

        <button className="md:hidden flex flex-col gap-1.5">
          <div className="w-8 h-[1px] bg-foreground"></div>
          <div className="w-8 h-[1px] bg-foreground"></div>
        </button>
      </nav>

      <section className="relative h-screen flex items-center justify-center overflow-hidden px-6">
        <div className="relative z-10 text-center max-w-7xl w-full">
          <h1 className="font-serif text-[clamp(4rem,18vw,24rem)] uppercase leading-[0.8] tracking-[-0.04em] flex justify-center overflow-hidden">
            {titleWords.map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.5,
                  ease: [0.2, 0.8, 0.2, 1],
                  delay: 0.1 * i,
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </h1>

          <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-24 reveal [animation-delay:400ms]">
            <p className="text-[11px] tracking-[0.6em] uppercase text-muted-foreground order-2 md:order-1">
              Photography with purpose
            </p>
            <div className="w-px h-12 bg-border hidden md:block order-2"></div>
            <p className="text-sm md:text-base font-serif italic max-w-[280px] leading-relaxed text-balance order-1 md:order-3">
              Capturing the intentionality of existence through a minimal lens.
            </p>
          </div>
        </div>

        {/* Floating background text like image 3 */}
        <div className="absolute -bottom-10 -right-20 opacity-[0.03] select-none pointer-events-none">
          <span className="font-serif text-[30vw] leading-none uppercase">Archive</span>
        </div>
      </section>

      <Gallery />

      <section id="about" className="px-6 py-32 md:px-12 md:py-64 bg-background border-t border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-12">
            <span className="text-[11px] tracking-[0.4em] uppercase text-muted-foreground">About</span>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter text-pretty">
              I capture moments because I love to.
            </h2>
          </div>
          <div className="max-w-md space-y-8 text-lg md:text-xl font-light leading-relaxed text-muted-foreground">
            <p>
              Every frame has a purpose.
            </p>
          </div>
        </div>
      </section>

      <footer id="contact" className="px-6 py-32 md:px-12 md:py-48 bg-background border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
          <div className="space-y-8">
            <span className="text-[11px] tracking-[0.4em] uppercase text-muted-foreground">Contact</span>
            <div className="space-y-4">
              <a
                href="mailto:telos.photogarphy@gmail.com"
                className="block font-serif text-4xl md:text-5xl lg:text-6xl tracking-tighter hover:italic transition-all"
              >
                telos.photogarphy@gmail.com
              </a>
              <div className="flex gap-8 pt-4">
                <a
                  href="#"
                  className="text-[10px] tracking-[0.3em] uppercase hover:text-muted-foreground transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="text-[10px] tracking-[0.3em] uppercase hover:text-muted-foreground transition-colors"
                >
                  Behance
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between h-full md:text-right">
            <div className="space-y-4">
              <span className="text-[11px] tracking-[0.4em] uppercase text-muted-foreground">Studio</span>
              <p className="text-sm tracking-wide leading-relaxed text-muted-foreground">
                I take photos for myself.
                It’s something that keeps me calm.

                <br />
                Based in Bengaluru, India.
              </p>
            </div>
            <div className="mt-24 md:mt-0 pt-12 border-t border-border flex flex-col md:items-end gap-2">
              <span className="font-serif text-xl tracking-tighter">Telos</span>
              <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground">
                © 2025 All Rights Reserved
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
