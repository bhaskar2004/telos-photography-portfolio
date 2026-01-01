"use client"

import { Gallery } from "@/components/gallery"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Menu, X, ArrowRight, Instagram, Linkedin, Mail } from "lucide-react"

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const titleWords = ["T", "e", "l", "o", "s"]

  const navLinks = [
    { href: "/gallery", label: "Gallery" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Enhanced Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className={`fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-6 md:px-12 transition-all duration-500 ${isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
          }`}
      >
        <Link href="/" className="flex flex-col group">
          <span className="font-serif text-2xl md:text-3xl tracking-tighter leading-none group-hover:italic transition-all">
            Telos
          </span>
          <span className="text-[9px] tracking-[0.4em] uppercase text-gray-500 mt-1">
            Archival Portfolio
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12 text-[10px] tracking-[0.3em] uppercase font-medium">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <Link
                href={link.href}
                className="hover:text-gray-900 text-gray-600 transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-3 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-all duration-300 border border-gray-200"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
              className="fixed top-0 right-0 z-50 w-[85%] max-w-sm h-screen bg-white md:hidden shadow-2xl"
            >
              {/* Close button inside panel */}
              <div className="flex justify-end p-6">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-3 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-all duration-300 border border-gray-200"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-2 px-6">
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
                      className="block px-4 py-4 text-2xl font-serif tracking-tight hover:bg-gray-50 active:bg-gray-100 rounded-lg transition-all duration-300 border-b border-gray-100 last:border-0"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="absolute bottom-8 left-6 right-6"
              >
                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <a
                    href="#"
                    className="p-3 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-all duration-300 border border-gray-200"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="p-3 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-all duration-300 border border-gray-200"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="mailto:telos.photography@gmail.com"
                    className="p-3 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-all duration-300 border border-gray-200"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
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
      >
        <motion.div
          style={{ opacity, scale, y }}
          className="relative z-10 text-center max-w-7xl w-full"
        >
          {/* Animated Title */}
          <h1 className="font-serif text-[clamp(4rem,18vw,24rem)] uppercase leading-[0.8] tracking-[-0.04em] flex justify-center overflow-hidden">
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
              >
                {char}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-24"
          >
            <p className="text-[11px] tracking-[0.6em] uppercase text-gray-500 order-2 md:order-1">
              Photography with purpose
            </p>
            <div className="w-px h-12 bg-gray-300 hidden md:block order-2"></div>
            <p className="text-sm md:text-base font-serif italic max-w-[320px] leading-relaxed text-balance order-1 md:order-3 text-gray-700">
              Capturing the intentionality of existence through a minimal lens.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-16"
          >
            <Link
              href="#work"
              className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white text-xs tracking-widest uppercase hover:bg-gray-900 transition-all hover:gap-4 group"
            >
              Explore Gallery
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>



        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-gray-400"
          >
            <span className="text-[10px] tracking-widest uppercase">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <Gallery detailed />

      {/* Enhanced About Section */}
      <section id="about" className="px-6 py-32 md:px-12 md:py-64 bg-gradient-to-b from-white to-gray-50 border-t border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <span className="text-[11px] tracking-[0.4em] uppercase text-gray-500">About</span>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter text-pretty">
              I capture moments because I love to.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 text-lg md:text-xl font-light leading-relaxed text-gray-600"
          >
            <p>
              Every frame has a purpose. Through my lens, I seek to capture not just what I see,
              but what I feel—the quiet moments, the intentional details, and the stories that
              unfold in between.
            </p>
            <p>
              Photography is my meditation, a way to slow down and appreciate the beauty
              in the ordinary. Each click is a reminder to stay present.
            </p>
            <div className="pt-8">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-sm tracking-wider uppercase border-b border-black pb-1 hover:gap-3 transition-all"
              >
                View Full Gallery
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer/Contact */}
      <footer id="contact" className="px-6 py-32 md:px-12 md:py-48 bg-black text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <span className="text-[11px] tracking-[0.4em] uppercase text-gray-400">Get in Touch</span>
            <div className="space-y-6">
              <a
                href="mailto:telos.photography@gmail.com"
                className="group block font-serif text-3xl md:text-4xl lg:text-5xl tracking-tighter hover:italic transition-all"
              >
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  telos.photography
                </span>
                <br />
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  @gmail.com
                </span>
              </a>

              <div className="flex gap-6 pt-6">
                <a
                  href="#"
                  className="group flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
                <a
                  href="#"
                  className="group flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  Behance
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-between h-full md:text-right"
          >
            <div className="space-y-6">
              <span className="text-[11px] tracking-[0.4em] uppercase text-gray-400">Studio</span>
              <p className="text-sm tracking-wide leading-relaxed text-gray-400 max-w-md md:ml-auto">
                I take photos for myself. It's something that keeps me calm and grounded
                in a fast-paced world.
                <br /><br />
                Based in Bengaluru, India.
              </p>
            </div>

            <div className="mt-24 md:mt-0 pt-12 border-t border-gray-800 flex flex-col md:items-end gap-3">
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