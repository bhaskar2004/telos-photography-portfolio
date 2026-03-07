"use client"

import Navbar from "@/components/navbar"
import { Gallery } from "@/components/gallery"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect, useCallback } from "react"
import { Menu, X, ArrowRight, Instagram, ChevronDown, Mail, ExternalLink } from "lucide-react"
import Reveal from "@/components/reveal"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const titleWords = ["F", "r", "e", "s", "n", "e", "l"]

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <main className="min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:rounded"
      >
        Skip to main content
      </a>

      <Navbar />

      {/* Enhanced Viewfinder Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden px-6 bg-background"
        aria-labelledby="hero-title"
      >
        {/* Flash Effect Overlay */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0 bg-foreground z-[60] pointer-events-none"
        />

        {/* Viewfinder Framing Elements */}
        <div className="absolute inset-4 sm:inset-8 md:inset-12 lg:inset-20 border-[0.5px] border-foreground/5 pointer-events-none z-20">
          <div className="absolute top-0 left-0 w-4 h-4 sm:w-8 sm:h-8 border-t border-l border-foreground/30" />
          <div className="absolute top-0 right-0 w-4 h-4 sm:w-8 sm:h-8 border-t border-r border-foreground/30" />
          <div className="absolute bottom-0 left-0 w-4 h-4 sm:w-8 sm:h-8 border-b border-l border-foreground/30" />
          <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-8 sm:h-8 border-b border-r border-foreground/30" />

          {/* Centering Crosshair */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-[0.5px] bg-foreground/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[0.5px] h-4 bg-foreground/20" />
        </div>

        {/* Archival Metadata Overlays */}
        <div className="absolute inset-x-6 inset-y-20 md:inset-20 lg:inset-32 flex flex-col justify-between pointer-events-none z-30 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
          <div className="flex justify-between items-start">
            <div className="space-y-1 sm:block hidden">
              <p className="text-foreground/40">ARCHIVAL SERIES</p>
              <p className="text-foreground font-bold italic tracking-[0.1em]">VOL. 01 / BLR</p>
            </div>
            <div className="flex items-center gap-3 ml-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_oklch(var(--primary))]" />
              <p className="text-foreground/60">STATUS: ACTIVE</p>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div className="space-y-1 hidden sm:block">
              <p className="text-foreground/40">COORD / 12.9716° N</p>
              <p className="text-foreground/40">COORD / 77.5946° E</p>
            </div>
            <div className="text-right space-y-1 ml-auto">
              <p className="text-foreground font-bold tracking-[0.2em]">ISO 100</p>
              <p className="text-foreground/40 font-mono">f/2.8 | 1/250s</p>
            </div>
          </div>
        </div>

        {/* Main Hero Content */}
        <motion.div
          style={{ opacity, scale, y }}
          className="relative z-10 w-full max-w-7xl pt-24"
        >
          <div className="relative">
            <h1
              id="hero-title"
              className="font-serif text-[clamp(2.5rem,12vw,16rem)] md:text-[clamp(5rem,18vw,22rem)] uppercase leading-none tracking-tight text-center text-foreground flex justify-center overflow-hidden"
              aria-label="Fresnel Photography"
            >
              {["F", "R", "E", "S", "N", "E", "L"].map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
                  animate={{ clipPath: "inset(0 0 0 0)", opacity: 1 }}
                  transition={{
                    duration: 1.5,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.2 + i * 0.1
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-16 md:mt-24 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-32"
          >
            <div className="flex flex-col items-center md:items-start space-y-4">
              <p className="text-[10px] tracking-[0.5em] uppercase text-muted-foreground">
                Archival Capture
              </p>
              <div className="w-16 h-px bg-foreground/20" />
            </div>

            <p className="text-base md:text-xl font-serif italic max-w-sm leading-relaxed text-center text-foreground/80">
              Documenting the quiet intentionality of existence through an archival lens.
            </p>

            <div className="flex flex-col items-center md:items-end space-y-4">
              <button
                onClick={() => scrollToSection('#work')}
                className="group flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase font-bold text-foreground border-b border-foreground/20 pb-2 hover:border-foreground transition-all"
              >
                Entrance
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </motion.div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          onClick={() => scrollToSection('#work')}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4 group focus:outline-none"
          aria-label="Scroll to work"
        >
          <span className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground group-hover:text-foreground transition-colors">Observe</span>
          <div className="relative w-px h-12 bg-foreground/10 overflow-hidden">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-foreground"
            />
          </div>
        </motion.button>
      </section>

      {/* Gallery Section */}
      <Gallery detailed limit={6} />

      {/* Professional Editorial About Section */}
      <section
        id="about"
        className="px-6 py-24 md:py-32 lg:py-48 md:px-12 bg-background border-t border-border/50 relative overflow-hidden"
        aria-labelledby="about-heading"
      >
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/10 -skew-x-12 translate-x-1/4 pointer-events-none" aria-hidden="true" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

            {/* Left Column: Brand Pillar */}
            <div className="lg:col-span-5 space-y-8 md:space-y-12">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-[10px] tracking-[0.5em] uppercase text-muted-foreground block"
              >
                The Philosophy
              </motion.span>

              <Reveal direction="right" duration={1.2}>
                <h2
                  id="about-heading"
                  className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.85] tracking-tighter text-foreground"
                >
                  The Art <br />
                  of Intentional <br />
                  <span className="italic text-primary/80">Stillness.</span>
                </h2>
              </Reveal>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="hidden lg:block w-px h-32 bg-gradient-to-b from-primary/50 to-transparent ml-1"
              />
            </div>

            {/* Right Column: Narrative & Experience Grid */}
            <div className="lg:col-span-7 space-y-16 md:space-y-24">

              {/* Main Narrative */}
              <div className="space-y-8 text-lg md:text-xl font-light leading-relaxed text-foreground/90 max-w-2xl">
                <p className="font-serif italic text-2xl text-foreground">
                  "Photography is not about seeing what is there, but acknowledging the soul of the ordinary."
                </p>
                <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    {Array.from("Based in Bengaluru, India, Fresnel specializes in capturing the quiet details that define our existence. My work focuses on the intersection of minimalist aesthetics and intentional storytelling across still and motion media.").map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.1, delay: i * 0.005 }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </p>
                  <p>
                    {Array.from("Whether it's editorial portraiture or contemporary landscapes, I seek to preserve authenticity. My portfolio is a collection of curated stories—each frame serving as a reminder to pause and truly observe the world.").map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.1, delay: 0.5 + i * 0.005 }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </p>
                </div>
              </div>

              {/* Brand Pillars / Experience Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 border-t border-border/50 pt-12 md:pt-16">
                {[
                  { title: "Minimalism", desc: "Strip away the noise to reveal the essence of the subject." },
                  { title: "Archival", desc: "Creating timeless imagery that captures a permanent sense of place." },
                  { title: "Organic", desc: "Embracing natural light and authentic textures in every frame." },
                  { title: "Intentional", desc: "Every shutter click is a conscious choice in narrative depth." }
                ].map((pillar, idx) => (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + 0.5, duration: 0.6 }}
                    className="space-y-3"
                  >
                    <h3 className="text-[11px] tracking-[0.3em] uppercase font-bold text-foreground flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
                className="pt-4"
              >
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase text-primary font-bold hover:gap-6 transition-all group focus:outline-none"
                >
                  Explore the archives
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </motion.div>
            </div>

          </div>
        </div>
      </section >

      {/* Enhanced Footer/Contact */}
      <footer
        id="contact"
        className="px-6 py-24 md:py-32 lg:py-48 md:px-12 bg-foreground text-background"
        aria-labelledby="contact-heading"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-6 md:space-y-8"
          >
            <span
              id="contact-heading"
              className="text-[11px] tracking-[0.4em] uppercase text-background/60"
            >
              Get in Touch
            </span>
            <div className="space-y-6">
              <a
                href="mailto:photography.fresnel@gmail.com"
                className="group block font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-tighter hover:italic transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-4 focus-visible:ring-offset-foreground rounded"
              >
                <span className="bg-gradient-to-r from-background to-background/50 bg-clip-text text-transparent brightness-[1.5]">
                  photography.fresnel
                </span>
                <br />
                <span className="bg-gradient-to-r from-background to-background/50 bg-clip-text text-transparent brightness-[1.5]">
                  @gmail.com
                </span>
              </a>

              <div className="flex gap-4 md:gap-6 pt-6" role="list" aria-label="Social media links">
                <a
                  href="https://www.instagram.com/fresnelphotography/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-background/60 hover:text-background transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-background rounded px-1"
                  aria-label="Follow on Instagram"
                >
                  <Instagram className="w-4 h-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Instagram</span>
                </a>
                <a
                  href="https://bhaskar.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-background/60 hover:text-background transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-background rounded px-1"
                  aria-label="Visit portfolio website"
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Portfolio</span>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-between h-full md:text-right"
          >
            <div className="space-y-4 md:space-y-6">
              <span className="text-[11px] tracking-[0.4em] uppercase text-background/60">Studio</span>
              <p className="text-sm tracking-wide leading-relaxed text-background/60 max-w-md md:ml-auto">
                When I'm not behind the camera, you'll find me wandering the streets of Bengaluru, chasing golden hour, or sitting quietly with a cup of coffee, planning my next adventure.
                <br /><br />
                Based in Bengaluru, India.
              </p>
            </div>

            <div className="mt-16 md:mt-0 pt-12 border-t border-background/20 flex flex-col md:items-end gap-3">
              <span className="font-serif text-2xl tracking-tighter">Fresnel</span>
              <span className="text-[9px] tracking-[0.2em] uppercase text-background/60">
                © {new Date().getFullYear()} All Rights Reserved
              </span>
            </div>
          </motion.div>
        </div>
      </footer>
    </main>
  )
}