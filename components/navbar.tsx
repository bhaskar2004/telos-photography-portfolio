"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Menu, X, Instagram, ExternalLink, Mail } from "lucide-react"

interface NavLink {
    href: string
    label: string
}

interface SocialLink {
    href: string
    label: string
    icon: any
}

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

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

    const navLinks: NavLink[] = [
        { href: "/", label: "Home" },
        { href: "/gallery", label: "Gallery" },
        { href: "/#about", label: "About" },
        { href: "/#contact", label: "Contact" },
    ]

    const socialLinks: SocialLink[] = [
        { href: "https://www.instagram.com/fresnelphotography/", icon: Instagram, label: "Instagram" },
        { href: "https://bhaskar.xyz", icon: ExternalLink, label: "Portfolio" },
        { href: "mailto:photography.fresnel@gmail.com", icon: Mail, label: "Email" },
    ]

    const scrollToSection = (id: string) => {
        setIsMenuOpen(false)
        const element = document.querySelector(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-7xl pointer-events-none"
                role="navigation"
                aria-label="Main navigation"
            >
                <div className={`flex items-center justify-between px-4 md:px-6 py-2.5 md:py-3 rounded-full transition-all duration-700 pointer-events-auto border ${isScrolled
                    ? 'bg-background/60 backdrop-blur-2xl shadow-2xl border-foreground/10 py-3.5 md:py-4 px-6 md:px-8'
                    : 'bg-transparent border-transparent'
                    }`}>

                    {/* Logo & Technical Marker */}
                    <div className="flex items-center gap-6">
                        <Link
                            href="/"
                            className="flex flex-col group focus:outline-none"
                            aria-label="Fresnel - Homepage"
                        >
                            <span className="font-serif text-xl md:text-2xl tracking-tighter leading-none text-foreground">
                                Fresnel
                            </span>
                            <div className="flex items-center gap-2 mt-1 transition-opacity duration-500 overflow-hidden">
                                <span className="text-[7px] tracking-[0.4em] uppercase text-foreground/40 whitespace-nowrap">
                                    {isScrolled ? "SERIES // 01" : "ARCHIVAL PORTFOLIO"}
                                </span>
                                {isScrolled && <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />}
                            </div>
                        </Link>

                        <div className="hidden lg:flex flex-col border-l border-foreground/10 pl-6 space-y-0.5">
                            <span className="text-[7px] tracking-[0.3em] uppercase text-foreground/30">VER // 2026.03</span>
                            <span className="text-[7px] tracking-[0.3em] uppercase text-foreground/30">MOD // STILL.MOTION</span>
                        </div>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-10 lg:gap-14">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative text-[10px] tracking-[0.4em] uppercase font-bold text-foreground/60 hover:text-foreground transition-all group focus:outline-none"
                            >
                                <span className="relative z-10">{link.label}</span>
                                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-primary transition-all duration-500 group-hover:w-full opacity-0 group-hover:opacity-100" />

                                {/* Technical Focus Brackets on Hover */}
                                <span className="absolute -inset-x-2 -inset-y-1 border-x border-foreground/0 group-hover:border-foreground/10 transition-all duration-300" />
                            </Link>
                        ))}

                        <button
                            onClick={() => scrollToSection('#contact')}
                            className="bg-foreground text-background text-[9px] tracking-[0.3em] uppercase font-bold px-5 py-2 rounded-full hover:scale-105 transition-transform active:scale-95"
                        >
                            Contact
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden flex items-center gap-2 p-1 group"
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        <span className="text-[7px] tracking-[0.2em] uppercase text-foreground/60 group-hover:text-foreground">Menu</span>
                        <div className="w-7 h-7 rounded-full border border-foreground/10 flex items-center justify-center group-hover:border-foreground/30 transition-colors">
                            {isMenuOpen ? <X className="w-3 h-3" /> : <Menu className="w-3 h-3" />}
                        </div>
                    </button>
                </div>
            </motion.nav>

            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-xl md:hidden"
                            onClick={() => setIsMenuOpen(false)}
                        />

                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed inset-y-0 right-0 z-[70] w-full max-w-sm bg-background border-l border-foreground/5 md:hidden shadow-2xl flex flex-col p-8"
                            role="dialog"
                            aria-modal="true"
                        >
                            <div className="flex items-center justify-between mb-20">
                                <span className="font-serif text-2xl tracking-tighter">Menu</span>
                                <button onClick={() => setIsMenuOpen(false)} className="p-2">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex flex-col gap-6">
                                {navLinks.map((link, idx) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="font-serif text-5xl tracking-tighter hover:italic transition-all"
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-auto pt-12 border-t border-foreground/10">
                                <p className="text-[10px] tracking-[0.4em] uppercase text-foreground/40 mb-6">Connect</p>
                                <div className="flex gap-6">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-foreground/60 hover:text-foreground transition-colors"
                                        >
                                            <social.icon className="w-5 h-5" />
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
