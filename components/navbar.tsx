"use client" // v2.0.0

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useState, useEffect, useRef, useCallback } from "react"
import { Menu, X, Instagram, ExternalLink, Mail } from "lucide-react"
import type { ComponentType } from "react"

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavLink {
    href: string
    label: string
    /** id of the DOM section this link points to (for intersection detection) */
    sectionId?: string
}

interface SocialLink {
    href: string
    label: string
    icon: ComponentType<{ className?: string }>
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/#about", label: "About", sectionId: "about" },
]

const socialLinks: SocialLink[] = [
    { href: "https://www.instagram.com/fresnelphotography/", icon: Instagram, label: "Instagram" },
    { href: "https://bhaskar.xyz", icon: ExternalLink, label: "Portfolio" },
    { href: "mailto:photography.fresnel@gmail.com", icon: Mail, label: "Email" },
]

const EASE = [0.16, 1, 0.3, 1] as const

// ─── Hooks ────────────────────────────────────────────────────────────────────

/** Returns a live HH:MM string, updated every minute. */
function useClock(): string {
    const [time, setTime] = useState(() =>
        new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false })
    )
    useEffect(() => {
        const tick = () =>
            setTime(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false }))
        const id = setInterval(tick, 60_000)
        return () => clearInterval(id)
    }, [])
    return time
}

/** Tracks which section IDs are currently intersecting the viewport. */
function useActiveSection(ids: string[]): string | null {
    const [active, setActive] = useState<string | null>(null)

    useEffect(() => {
        if (typeof IntersectionObserver === "undefined") return
        const observers: IntersectionObserver[] = []

        ids.forEach((id) => {
            const el = document.getElementById(id)
            if (!el) return
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActive(id) },
                { threshold: 0.35 }
            )
            obs.observe(el)
            observers.push(obs)
        })

        return () => observers.forEach((o) => o.disconnect())
    }, [ids])

    return active
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const pathname = usePathname()
    const clock = useClock()
    const sectionIds = navLinks.flatMap((l) => l.sectionId ?? [])
    const activeSection = useActiveSection(sectionIds)

    // Scroll progress for the thin top bar
    const { scrollYProgress } = useScroll()
    const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

    // Scroll detection
    useEffect(() => {
        const handle = () => setIsScrolled(window.scrollY > 50)
        window.addEventListener("scroll", handle, { passive: true })
        return () => window.removeEventListener("scroll", handle)
    }, [])

    // Escape key
    useEffect(() => {
        if (!isMenuOpen) return
        const handle = (e: KeyboardEvent) => { if (e.key === "Escape") setIsMenuOpen(false) }
        document.addEventListener("keydown", handle)
        return () => document.removeEventListener("keydown", handle)
    }, [isMenuOpen])

    // Body scroll lock
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [isMenuOpen])

    const closeMenu = useCallback(() => setIsMenuOpen(false), [])

    // Determine if a link is active
    const isLinkActive = (link: NavLink): boolean => {
        if (link.sectionId) return activeSection === link.sectionId
        if (link.href === "/") return pathname === "/"
        return pathname.startsWith(link.href)
    }

    return (
        <>
            {/* ── Scroll progress bar ─────────────────────────────────── */}
            <motion.div
                style={{ width: progressWidth }}
                className="fixed top-0 left-0 h-px bg-primary/60 z-[60] origin-left pointer-events-none"
                aria-hidden="true"
            />

            {/* ── Floating Navbar ─────────────────────────────────────── */}
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.1, ease: EASE }}
                className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-7xl pointer-events-none"
                role="navigation"
                aria-label="Main navigation"
            >
                <div
                    className={[
                        "flex items-center justify-between rounded-full transition-all duration-700 pointer-events-auto border",
                        isScrolled
                            ? [
                                "bg-background/75 backdrop-blur-2xl border-foreground/8",
                                "px-6 md:px-8 py-3.5 md:py-4",
                                /* warm brand shadow instead of generic black */
                                "shadow-[0_8px_40px_oklch(0.42_0.095_48_/_0.10)]",
                            ].join(" ")
                            : "bg-transparent border-transparent px-4 md:px-6 py-2.5 md:py-3",
                    ].join(" ")}
                >
                    {/* ── Logo ──────────────────────────────────────────── */}
                    <Link
                        href="/"
                        className="flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                        aria-label="Fresnel — Homepage"
                    >
                        <span className="font-serif font-bold text-xl md:text-2xl tracking-[-0.035em] leading-none text-foreground">
                            Fresnel
                        </span>

                        {/* Animated tagline — properly uses AnimatePresence */}
                        <div className="relative h-[10px] overflow-hidden mt-0.5" aria-hidden="true">
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={isScrolled ? "series" : "portfolio"}
                                    initial={{ y: "100%", opacity: 0 }}
                                    animate={{ y: "0%", opacity: 1 }}
                                    exit={{ y: "-100%", opacity: 0 }}
                                    transition={{ duration: 0.35, ease: EASE }}
                                    className="absolute inset-0 text-[7px] tracking-[0.4em] uppercase text-foreground/40 select-none whitespace-nowrap"
                                >
                                    {isScrolled ? "SERIES\u00a0//\u00a001" : "ARCHIVAL\u00a0PORTFOLIO"}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </Link>

                    {/* ── Desktop nav links ─────────────────────────────── */}
                    <div className="hidden md:flex items-center gap-10 lg:gap-14">
                        {navLinks.map((link, i) => {
                            const active = isLinkActive(link)
                            return (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + i * 0.07, duration: 0.6, ease: EASE }}
                                >
                                    <Link
                                        href={link.href}
                                        className={[
                                            "relative text-[10px] tracking-[0.4em] uppercase font-bold",
                                            "transition-colors duration-200 group",
                                            "focus-visible:outline-none",
                                            active
                                                ? "text-foreground"
                                                : "text-foreground/50 hover:text-foreground",
                                        ].join(" ")}
                                        aria-current={active ? "page" : undefined}
                                    >
                                        {link.label}

                                        {/* Underline — persistent when active, hover otherwise */}
                                        <span
                                            aria-hidden="true"
                                            className={[
                                                "absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-px bg-primary",
                                                "transition-all duration-400",
                                                active
                                                    ? "w-full opacity-100"
                                                    : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100",
                                            ].join(" ")}
                                        />
                                    </Link>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* ── Desktop right cluster ─────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="hidden md:flex items-center gap-4"
                    >
                        {/* Social icons */}
                        <div className="flex items-center gap-3 border-r border-foreground/10 pr-4 mr-1">
                            {socialLinks.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="text-foreground/35 hover:text-foreground transition-colors duration-200
                                               focus-visible:outline-none focus-visible:text-foreground"
                                >
                                    <s.icon className="w-3.5 h-3.5" />
                                </a>
                            ))}
                        </div>

                        {/* CTA pill */}
                        <Link
                            href="/#contact"
                            className="bg-foreground text-background text-[9px] tracking-[0.3em] uppercase font-bold
                                       px-5 py-2 rounded-full
                                       hover:scale-105 active:scale-95 transition-transform duration-200
                                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        >
                            Contact
                        </Link>
                    </motion.div>

                    {/* ── Mobile hamburger ──────────────────────────────── */}
                    <button
                        onClick={() => setIsMenuOpen((v) => !v)}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                        className="md:hidden flex items-center gap-2 p-1 group
                                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
                    >
                        <span className="text-[7px] tracking-[0.2em] uppercase text-foreground/45 group-hover:text-foreground transition-colors">
                            {isMenuOpen ? "Close" : "Menu"}
                        </span>
                        <div className="w-7 h-7 rounded-full border border-foreground/15 flex items-center justify-center
                                        group-hover:border-foreground/40 transition-colors duration-200">
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={isMenuOpen ? "x" : "menu"}
                                    initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                    exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                                    transition={{ duration: 0.22, ease: EASE }}
                                    className="flex items-center justify-center"
                                >
                                    {isMenuOpen
                                        ? <X className="w-3 h-3" />
                                        : <Menu className="w-3 h-3" />
                                    }
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </button>
                </div>
            </motion.nav>

            {/* ── Mobile Menu ─────────────────────────────────────────── */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35 }}
                            className="fixed inset-0 z-[60] bg-background/85 backdrop-blur-xl md:hidden"
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
                            initial={{ x: "100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "100%", opacity: 0 }}
                            transition={{ duration: 0.55, ease: EASE }}
                            className="fixed inset-y-0 right-0 z-[70] w-full max-w-sm bg-background
                                       border-l border-foreground/6 md:hidden
                                       shadow-[−20px_0_60px_oklch(0.42_0.095_48_/_0.08)]
                                       flex flex-col px-8 pt-8 pb-10"
                        >
                            {/* Drawer header */}
                            <div className="flex items-center justify-between mb-14">
                                <div>
                                    <span className="font-serif text-2xl tracking-tighter text-foreground">
                                        Navigation
                                    </span>
                                    {/* Live clock — replaces static year stamp */}
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="w-1 h-1 rounded-full bg-primary animate-pulse" aria-hidden="true" />
                                        <p className="font-mono text-[8px] tracking-[0.35em] uppercase text-foreground/35">
                                            BLR&nbsp;&middot;&nbsp;{clock}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={closeMenu}
                                    aria-label="Close menu"
                                    className="w-9 h-9 rounded-full border border-foreground/10 flex items-center justify-center
                                               hover:border-foreground/35 transition-colors duration-200
                                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Nav links */}
                            <nav className="flex flex-col gap-0.5" aria-label="Mobile navigation">
                                {navLinks.map((link, idx) => {
                                    const active = isLinkActive(link)
                                    return (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, x: 28 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.06 + idx * 0.07, ease: EASE, duration: 0.5 }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={closeMenu}
                                                aria-current={active ? "page" : undefined}
                                                className={[
                                                    "block font-serif text-5xl tracking-tighter py-2",
                                                    "hover:italic transition-all duration-200 hover:pl-2",
                                                    "focus-visible:outline-none",
                                                    active
                                                        ? "text-foreground"
                                                        : "text-foreground/60 hover:text-foreground",
                                                ].join(" ")}
                                            >
                                                {link.label}
                                                {active && (
                                                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mb-2 ml-2" aria-hidden="true" />
                                                )}
                                            </Link>
                                        </motion.div>
                                    )
                                })}

                                {/* Contact CTA */}
                                <motion.div
                                    initial={{ opacity: 0, x: 28 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.06 + navLinks.length * 0.07, ease: EASE, duration: 0.5 }}
                                    className="pt-5"
                                >
                                    <Link
                                        href="/#contact"
                                        onClick={closeMenu}
                                        className="inline-flex items-center gap-2 bg-foreground text-background
                                                   text-[9px] tracking-[0.3em] uppercase font-bold
                                                   px-6 py-3 rounded-full
                                                   hover:scale-[1.03] active:scale-95 transition-transform duration-200
                                                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                    >
                                        Get in Touch
                                    </Link>
                                </motion.div>
                            </nav>

                            {/* Footer — socials + HUD meta */}
                            <div className="mt-auto pt-8 border-t border-foreground/8">
                                <p className="font-mono text-[8px] tracking-[0.4em] uppercase text-foreground/30 mb-5">
                                    Connect
                                </p>
                                <div className="flex gap-4 mb-8">
                                    {socialLinks.map((s, i) => (
                                        <motion.a
                                            key={s.label}
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={s.label}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.35 + i * 0.06, ease: EASE, duration: 0.4 }}
                                            className="w-9 h-9 rounded-full border border-foreground/10 flex items-center justify-center
                                                       text-foreground/45 hover:text-foreground hover:border-foreground/30
                                                       transition-colors duration-200
                                                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                        >
                                            <s.icon className="w-4 h-4" />
                                        </motion.a>
                                    ))}
                                </div>

                                {/* HUD strip */}
                                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-foreground/6">
                                    {[
                                        { label: "Series", value: "Vol. 01" },
                                        { label: "Location", value: "BLR, IN" },
                                    ].map(({ label, value }) => (
                                        <div key={label} className="flex flex-col gap-0.5">
                                            <span className="font-mono text-[7px] tracking-[0.4em] uppercase text-foreground/22">
                                                {label}
                                            </span>
                                            <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-foreground/45">
                                                {value}
                                            </span>
                                        </div>
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