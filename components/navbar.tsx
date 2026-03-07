"use client" // v1.1.0

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Menu, X, Instagram, ExternalLink, Mail } from "lucide-react"
import type { ComponentType } from "react"

// ─── Types ──────────────────────────────────────────────────────────────────

interface NavLink {
    href: string
    label: string
}

interface SocialLink {
    href: string
    label: string
    icon: ComponentType<{ className?: string }>
}

// ─── Data ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/#about", label: "About" },
]

const socialLinks: SocialLink[] = [
    { href: "https://www.instagram.com/fresnelphotography/", icon: Instagram, label: "Instagram" },
    { href: "https://bhaskar.xyz", icon: ExternalLink, label: "Portfolio" },
    { href: "mailto:photography.fresnel@gmail.com", icon: Mail, label: "Email" },
]

// ─── Component ───────────────────────────────────────────────────────────────

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50)
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Escape key to close mobile menu
    useEffect(() => {
        if (!isMenuOpen) return
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsMenuOpen(false)
        }
        document.addEventListener("keydown", handleEscape)
        return () => document.removeEventListener("keydown", handleEscape)
    }, [isMenuOpen])

    // Lock body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [isMenuOpen])

    const closeMenu = () => setIsMenuOpen(false)

    return (
        <>
            {/* ── Floating Navbar ── */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-7xl pointer-events-none"
                role="navigation"
                aria-label="Main navigation"
            >
                <div
                    className={[
                        "flex items-center justify-between rounded-full transition-all duration-700 pointer-events-auto border",
                        isScrolled
                            ? "bg-background/70 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border-foreground/10 px-6 md:px-8 py-3.5 md:py-4"
                            : "bg-transparent border-transparent px-4 md:px-6 py-2.5 md:py-3",
                    ].join(" ")}
                >
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                        aria-label="Fresnel — Homepage"
                    >
                        <span className="font-serif text-xl md:text-2xl tracking-tighter leading-none text-foreground">
                            Fresnel
                        </span>
                        <span className="text-[7px] tracking-[0.4em] uppercase text-foreground/40 mt-0.5 select-none">
                            {isScrolled ? "SERIES\u00a0//\u00a001" : "ARCHIVAL\u00a0PORTFOLIO"}
                        </span>
                    </Link>

                    {/* Desktop nav links */}
                    <div className="hidden md:flex items-center gap-10 lg:gap-14">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative text-[10px] tracking-[0.4em] uppercase font-bold text-foreground/60
                                           hover:text-foreground transition-colors duration-200 group
                                           focus-visible:outline-none focus-visible:text-foreground"
                            >
                                {link.label}
                                {/* Animated underline */}
                                <span
                                    aria-hidden="true"
                                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-[1.5px] bg-primary
                                               w-0 opacity-0 transition-all duration-400 group-hover:w-full group-hover:opacity-100"
                                />
                            </Link>
                        ))}
                    </div>

                    {/* Desktop right cluster: socials + CTA */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Social icon row */}
                        <div className="flex items-center gap-3 border-r border-foreground/10 pr-4 mr-1">
                            {socialLinks.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="text-foreground/40 hover:text-foreground transition-colors duration-200
                                               focus-visible:outline-none focus-visible:text-foreground"
                                >
                                    <s.icon className="w-3.5 h-3.5" />
                                </a>
                            ))}
                        </div>

                        {/* CTA */}
                        <Link
                            href="/#contact"
                            className="bg-foreground text-background text-[9px] tracking-[0.3em] uppercase font-bold
                                       px-5 py-2 rounded-full hover:scale-105 active:scale-95 transition-transform
                                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        >
                            Contact
                        </Link>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setIsMenuOpen((v) => !v)}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                        className="md:hidden flex items-center gap-2 p-1 group
                                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
                    >
                        <span className="text-[7px] tracking-[0.2em] uppercase text-foreground/50 group-hover:text-foreground transition-colors">
                            {isMenuOpen ? "Close" : "Menu"}
                        </span>
                        <div className="w-7 h-7 rounded-full border border-foreground/15 flex items-center justify-center
                                        group-hover:border-foreground/40 transition-colors">
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={isMenuOpen ? "x" : "menu"}
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {isMenuOpen ? <X className="w-3 h-3" /> : <Menu className="w-3 h-3" />}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </button>
                </div>
            </motion.nav>

            {/* ── Mobile Menu ── */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-xl md:hidden"
                            onClick={closeMenu}
                            aria-hidden="true"
                        />

                        {/* Drawer */}
                        <motion.div
                            key="drawer"
                            id="mobile-menu"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Navigation menu"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed inset-y-0 right-0 z-[70] w-full max-w-sm bg-background
                                       border-l border-foreground/5 md:hidden shadow-2xl
                                       flex flex-col px-8 pt-8 pb-10"
                        >
                            {/* Drawer header */}
                            <div className="flex items-center justify-between mb-16">
                                <div>
                                    <span className="font-serif text-2xl tracking-tighter">Navigation</span>
                                    <p className="text-[8px] tracking-[0.35em] uppercase text-foreground/35 mt-0.5">
                                        FRESNEL\u00a0//\u00a02026
                                    </p>
                                </div>
                                <button
                                    onClick={closeMenu}
                                    aria-label="Close menu"
                                    className="w-9 h-9 rounded-full border border-foreground/10 flex items-center justify-center
                                               hover:border-foreground/30 transition-colors focus-visible:outline-none
                                               focus-visible:ring-2 focus-visible:ring-primary"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Nav links */}
                            <nav className="flex flex-col gap-1">
                                {navLinks.map((link, idx) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: 24 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.05 + idx * 0.08, ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={closeMenu}
                                            className="block font-serif text-5xl tracking-tighter py-2
                                                       hover:italic transition-all duration-200
                                                       hover:pl-2 text-foreground/80 hover:text-foreground
                                                       focus-visible:outline-none focus-visible:text-foreground"
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}

                                {/* Contact CTA in mobile menu */}
                                <motion.div
                                    initial={{ opacity: 0, x: 24 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 + navLinks.length * 0.08, ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
                                    className="pt-4"
                                >
                                    <Link
                                        href="/#contact"
                                        onClick={closeMenu}
                                        className="inline-flex items-center gap-2 bg-foreground text-background
                                                   text-[9px] tracking-[0.3em] uppercase font-bold
                                                   px-6 py-3 rounded-full hover:scale-[1.03] active:scale-95 transition-transform"
                                    >
                                        Get in Touch
                                    </Link>
                                </motion.div>
                            </nav>

                            {/* Social links footer */}
                            <div className="mt-auto pt-8 border-t border-foreground/10">
                                <p className="text-[8px] tracking-[0.4em] uppercase text-foreground/35 mb-5">
                                    Connect
                                </p>
                                <div className="flex gap-5">
                                    {socialLinks.map((s) => (
                                        <a
                                            key={s.label}
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={s.label}
                                            className="w-9 h-9 rounded-full border border-foreground/10 flex items-center justify-center
                                                       text-foreground/50 hover:text-foreground hover:border-foreground/30
                                                       transition-colors duration-200 focus-visible:outline-none
                                                       focus-visible:ring-2 focus-visible:ring-primary"
                                        >
                                            <s.icon className="w-4 h-4" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}