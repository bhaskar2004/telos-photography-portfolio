"use client"

import { Gallery } from "@/components/gallery"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect, useCallback } from "react"
import { Menu, X, ArrowRight, Instagram, ExternalLink, Mail, ChevronDown } from "lucide-react"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMenuOpen])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const titleWords = ["T", "e", "l", "o", "s"]

  const navLinks = [
    { href: "/gallery", label: "Gallery" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ]

  const socialLinks = [
    { href: "https://www.instagram.com/telos_photography/", icon: Instagram, label: "Instagram" },
    { href: "https://bhaskar.xyz", icon: ExternalLink, label: "Portfolio" },
    { href: "mailto:telos.photography@gmail.com", icon: Mail, label: "Email" },
  ]

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded"
      >
        Skip to main content
      </a>

      {/* Enhanced Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className={`fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-4 md:py-6 md:px-12 transition-all duration-500 ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
          }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex flex-col group focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded-sm"
          aria-label="Telos - Homepage"
        >
          <span className="font-serif text-2xl md:text-3xl tracking-tighter leading-none group-hover:italic transition-all">
            Telos
          </span>
          <span className="text-[9px] tracking-[0.4em] uppercase text-gray-500 mt-1">
            Archival Portfolio
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12 text-[10px] tracking-[0.3em] uppercase font-medium">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <Link
                href={link.href}
                className="hover:text-gray-900 text-gray-600 transition-colors relative group focus:outline-none focus-visible:text-black"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full group-focus-visible:w-full" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-all duration-300 border border-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? (
            <X className="w-5 h-5" aria-hidden="true" />
          ) : (
            <Menu className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              id="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
              className="fixed top-0 right-0 z-50 w-[90%] max-w-md h-screen bg-white md:hidden shadow-2xl flex flex-col overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div className="flex flex-col">
                  <span className="font-serif text-xl tracking-tighter">Telos</span>
                  <span className="text-[9px] tracking-[0.3em] uppercase text-gray-400 mt-0.5">Menu</span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2.5 hover:bg-gray-100 active:bg-gray-200 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              <nav className="flex flex-col gap-1 px-4 py-8 flex-1" aria-label="Mobile navigation links">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="group block px-5 py-5 text-3xl font-serif tracking-tight hover:bg-gray-50 active:bg-gray-100 rounded-xl transition-all duration-300 relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black"
                    >
                      <span className="relative z-10">{link.label}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="mt-auto border-t border-gray-100"
              >
                <div className="p-6">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-4">Connect</p>
                  <div className="flex items-center gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target={social.href.startsWith('http') ? "_blank" : undefined}
                        rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                        className="flex-1 flex items-center justify-center gap-2 p-3.5 hover:bg-black hover:text-white bg-gray-50 rounded-xl transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                        aria-label={social.label}
                      >
                        <social.icon className="w-4 h-4" aria-hidden="true" />
                        <span className="text-xs font-medium hidden sm:inline">{social.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Enhanced Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden px-6"
        aria-labelledby="hero-title"
      >
        <motion.div
          style={{ opacity, scale, y }}
          className="relative z-10 text-center max-w-7xl w-full"
        >
          <h1
            id="hero-title"
            className="font-serif text-[clamp(3rem,15vw,20rem)] md:text-[clamp(4rem,18vw,24rem)] uppercase leading-[0.8] tracking-[-0.04em] flex justify-center overflow-hidden"
          >
            {titleWords.map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1.5,
                  ease: [0.2, 0.8, 0.2, 1],
                  delay: 0.1 * i,
                }}
                className="inline-block hover:text-gray-600 transition-colors"
                aria-hidden={i > 0}
              >
                {char}
              </motion.span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 md:mt-12 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 lg:gap-24"
          >
            <p className="text-[10px] md:text-[11px] tracking-[0.5em] md:tracking-[0.6em] uppercase text-gray-500 order-2 md:order-1">
              Photography with purpose
            </p>
            <div className="w-px h-8 md:h-12 bg-gray-300 hidden md:block order-2" aria-hidden="true"></div>
            <p className="text-sm md:text-base font-serif italic max-w-[280px] md:max-w-[340px] leading-relaxed text-balance order-1 md:order-3 text-gray-700">
              Capturing the intentionality of existence through a minimal lens.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-12 md:mt-16"
          >
            <button
              onClick={() => scrollToSection('#work')}
              className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-black text-white text-xs tracking-widest uppercase hover:bg-gray-900 transition-all hover:gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
            >
              Explore Gallery
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </button>
          </motion.div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          onClick={() => scrollToSection('#work')}
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded"
          aria-label="Scroll to gallery"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <span className="text-[10px] tracking-widest uppercase">Scroll</span>
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
          </motion.div>
        </motion.button>
      </section>

      {/* Gallery Section */}
      <div id="work">
        <Gallery detailed />
      </div>

      {/* Enhanced About Section */}
      <section
        id="about"
        className="px-6 py-24 md:py-32 lg:py-64 md:px-12 bg-gradient-to-b from-white to-gray-50 border-t border-gray-200"
        aria-labelledby="about-heading"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-start max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-8 md:space-y-12"
          >
            <span className="text-[11px] tracking-[0.4em] uppercase text-gray-500" aria-label="Section: About">About</span>
            <h2
              id="about-heading"
              className="font-serif text-3xl md:text-4xl lg:text-6xl xl:text-7xl leading-[0.9] tracking-tighter text-pretty"
            >
              I capture moments that matter to me.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 md:space-y-8 text-sm md:text-base lg:text-lg font-light leading-relaxed text-gray-600"
          >
            <p>
              Through my lens, I seek to capture more than just images—I look for the feeling, the intention, the quiet details that often go unnoticed.
            </p>
            <p>
              Photography is my way of slowing down. It helps me stay present and appreciate the beauty in everyday moments. Each frame is a reminder to pause and truly see what's in front of me.
            </p>
            <p>
              My work focuses on minimalism and authenticity. I believe the most powerful images are often the simplest ones—those that let the subject speak for itself.
            </p>
            <div className="pt-6 md:pt-8">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-sm tracking-wider uppercase border-b border-black pb-1 hover:gap-3 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                View Full Gallery
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer/Contact */}
      <footer
        id="contact"
        className="px-6 py-24 md:py-32 lg:py-48 md:px-12 bg-black text-white"
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
              className="text-[11px] tracking-[0.4em] uppercase text-gray-400"
            >
              Get in Touch
            </span>
            <div className="space-y-6">
              <a
                href="mailto:telos.photography@gmail.com"
                className="group block font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-tighter hover:italic transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black rounded"
              >
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  telos.photography
                </span>
                <br />
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  @gmail.com
                </span>
              </a>

              <div className="flex gap-4 md:gap-6 pt-6" role="list" aria-label="Social media links">
                <a
                  href="https://www.instagram.com/telos_photography/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-gray-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded px-1"
                  aria-label="Follow on Instagram"
                >
                  <Instagram className="w-4 h-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Instagram</span>
                </a>
                <a
                  href="https://bhaskar.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-gray-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded px-1"
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
              <span className="text-[11px] tracking-[0.4em] uppercase text-gray-400">Studio</span>
              <p className="text-sm tracking-wide leading-relaxed text-gray-400 max-w-md md:ml-auto">
                When I'm not behind the camera, you'll find me wandering the streets of Bengaluru, chasing golden hour, or sitting quietly with a cup of coffee, planning my next adventure.
                <br /><br />
                Based in Bengaluru, India.
              </p>
            </div>

            <div className="mt-16 md:mt-0 pt-12 border-t border-gray-800 flex flex-col md:items-end gap-3">
              <span className="font-serif text-2xl tracking-tighter">Telos</span>
              <span className="text-[9px] tracking-[0.2em] uppercase text-gray-500">
                © {new Date().getFullYear()} All Rights Reserved
              </span>
            </div>
          </motion.div>
        </div>
      </footer>
    </main>
  )
}