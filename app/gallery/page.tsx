"use client"

import { Gallery } from "@/components/gallery"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Menu, X, Instagram, Linkedin, Mail } from "lucide-react"

export default function GalleryPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/#contact", label: "Contact" },
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
              className="fixed top-0 right-0 z-50 w-[90%] max-w-md h-screen bg-white md:hidden shadow-2xl flex flex-col"
            >
              {/* Header with close button */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div className="flex flex-col">
                  <span className="font-serif text-xl tracking-tighter">Telos</span>
                  <span className="text-[9px] tracking-[0.3em] uppercase text-gray-400 mt-0.5">Menu</span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2.5 hover:bg-gray-100 active:bg-gray-200 rounded-full transition-all duration-300"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-1 px-4 py-8 flex-1">
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
                      className="group block px-5 py-5 text-3xl font-serif tracking-tight hover:bg-gray-50 active:bg-gray-100 rounded-xl transition-all duration-300 relative overflow-hidden"
                    >
                      <span className="relative z-10">{link.label}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Social Links Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="mt-auto border-t border-gray-100"
              >
                <div className="p-6">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-4">Connect</p>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://www.instagram.com/telos_photography/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 p-3.5 hover:bg-black hover:text-white bg-gray-50 rounded-xl transition-all duration-300 group"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-4 h-4" />
                      <span className="text-xs font-medium hidden sm:inline">Instagram</span>
                    </a>
                    <a
                      href="#"
                      className="flex-1 flex items-center justify-center gap-2 p-3.5 hover:bg-black hover:text-white bg-gray-50 rounded-xl transition-all duration-300 group"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span className="text-xs font-medium hidden sm:inline">LinkedIn</span>
                    </a>
                    <a
                      href="mailto:telos.photography@gmail.com"
                      className="flex-1 flex items-center justify-center gap-2 p-3.5 hover:bg-black hover:text-white bg-gray-50 rounded-xl transition-all duration-300 group"
                      aria-label="Email"
                    >
                      <Mail className="w-4 h-4" />
                      <span className="text-xs font-medium hidden sm:inline">Email</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="pt-48 px-6 md:px-12">
        <div className="max-w-4xl space-y-6">
          <h1 className="font-serif text-6xl md:text-8xl tracking-tighter">Collection</h1>
          <p className="text-[11px] tracking-[0.5em] uppercase text-gray-500">Detailed Archives</p>
        </div>
      </div>

      <Gallery detailed />

      <footer className="px-6 py-24 md:px-12 border-t border-gray-200 flex justify-between items-end">
        <span className="font-serif text-xl tracking-tighter">Telos</span>
        <span className="text-[9px] tracking-[0.2em] uppercase text-gray-500">© {new Date().getFullYear()}</span>
      </footer>
    </main>
  )
}
