"use client"

import Navbar from "@/components/navbar"
import { Gallery } from "@/components/gallery"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useCallback } from "react"
import { ArrowRight, ArrowUpRight, Instagram, ExternalLink, Mail, MapPin } from "lucide-react"
import Reveal from "@/components/reveal"

// ─── Shared constants ─────────────────────────────────────────────────────────

const EASE = [0.16, 1, 0.3, 1] as const

// ═══════════════════════════════════════════════════════════════════════════════
// ABOUT SECTION
// ═══════════════════════════════════════════════════════════════════════════════

const PILLARS = [
  {
    index: "01",
    title: "Minimalism",
    desc: "Strip away the noise. Reveal only what matters — the essential truth of the subject.",
  },
  {
    index: "02",
    title: "Archival",
    desc: "Timeless imagery that resists the ephemeral. Every frame is a permanent record.",
  },
  {
    index: "03",
    title: "Organic",
    desc: "Natural light, authentic texture, imperfect beauty. No staging. No pretence.",
  },
  {
    index: "04",
    title: "Intentional",
    desc: "The shutter clicks once. The moment is chosen, not chased.",
  },
]

const STATS = [
  { value: "7+", label: "Years Active" },
  { value: "340+", label: "Frames Archived" },
  { value: "12", label: "Series Completed" },
  { value: "BLR", label: "Based In" },
]

function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"])
  const quoteX = useTransform(scrollYProgress, [0, 1], ["2%", "-2%"])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-background overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* ── Diagonal cut top edge ─────────────────────────────────── */}
      <div
        className="absolute top-0 inset-x-0 h-16 sm:h-24 bg-background z-10 origin-top-left"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 100%)" }}
        aria-hidden="true"
      />

      {/* ── Background large numeral ──────────────────────────────── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute -top-8 -right-8 md:top-0 md:right-0 pointer-events-none z-0 select-none"
        aria-hidden="true"
      >
        <span
          className="font-serif font-bold text-foreground/[0.025] leading-none"
          style={{ fontSize: "clamp(14rem, 35vw, 42rem)" }}
        >
          01
        </span>
      </motion.div>

      <div className="relative z-10 px-6 sm:px-10 md:px-16 lg:px-24 pt-24 sm:pt-32 md:pt-40 pb-0">
        {/* ── Header row ────────────────────────────────────────── */}
        <div className="max-w-[1400px] mx-auto">
          <motion.span
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="inline-flex items-center gap-3 text-[9px] sm:text-[10px] tracking-[0.5em] uppercase text-muted-foreground mb-8 sm:mb-10"
          >
            <span className="w-6 h-px bg-muted-foreground/40" aria-hidden="true" />
            The Philosophy
          </motion.span>

          {/* Oversized heading — breaks at deliberate point */}
          <Reveal direction="up" duration={1.3}>
            <h2
              id="about-heading"
              className="font-serif leading-[0.9] sm:leading-[0.82] tracking-tighter text-foreground"
              style={{ fontSize: "clamp(2.5rem, 9.5vw, 12rem)" }}
            >
              The Fresnel Art of<br />
              <em className="not-italic">Intentional</em><br />
              <span className="italic text-foreground/40">Stillness.</span>
            </h2>
          </Reveal>
        </div>

        {/* ── Stats strip ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, delay: 0.15, ease: EASE }}
          className="max-w-[1400px] mx-auto mt-16 sm:mt-20 md:mt-24 border-t border-b border-foreground/8 py-6 sm:py-8"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-10 gap-x-6 sm:gap-0">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={[
                  "flex flex-col gap-1 px-2 sm:px-8",
                  i % 2 !== 0 ? "border-l border-foreground/8 sm:border-none" : "",
                  i > 0 ? "sm:border-l sm:border-foreground/8" : "",
                ].join(" ")}
              >
                <span
                  className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tighter text-foreground leading-none"
                >
                  {s.value}
                </span>
                <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.4em] uppercase text-muted-foreground">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Body copy + pull-quote ────────────────────────────── */}
        <div className="max-w-[1400px] mx-auto mt-16 sm:mt-20 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Left: pull-quote block */}
          <motion.div
            style={{ x: quoteX }}
            className="lg:col-span-5 relative"
          >
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: EASE }}
              className="absolute -left-6 sm:-left-10 md:-left-16 lg:-left-0 top-0 bottom-0 w-px bg-foreground/10 origin-top"
              aria-hidden="true"
            />
            <div className="pl-6 sm:pl-0 lg:pl-8">
              <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-muted-foreground/60 block mb-5">
                Artist Statement
              </span>
              <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.4rem] leading-[1.2] tracking-tight text-foreground/85 italic">
                “Photography is not about seeing what is there, but acknowledging the soul of the ordinary.”
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-8 h-px bg-foreground/20" aria-hidden="true" />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-muted-foreground">
                  Fresnel — 2026
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: narrative paragraphs */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: EASE }}
              className="space-y-6 text-base sm:text-lg text-muted-foreground leading-[1.85]"
            >
              <p>
                Based in Bengaluru, India, Fresnel specialises in capturing the quiet details that
                define our existence. Work spans the intersection of minimalist aesthetics and
                intentional storytelling — across still imagery and motion media.
              </p>
              <p>
                Whether editorial portraiture or contemporary landscape, the aim is to preserve
                authenticity. Each frame is a curated story — a reminder to pause, and to truly
                observe the world around us.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25 }}
            >
              <Link
                href="/gallery"
                className="group inline-flex items-center gap-3 text-[10px] sm:text-[11px] tracking-[0.4em] uppercase
                                           font-bold text-foreground border-b border-foreground/20 pb-1.5
                                           hover:border-foreground transition-all duration-200
                                           focus-visible:outline-none"
              >
                Explore the archives
                <ArrowRight
                  className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200"
                  aria-hidden="true"
                />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ── Pillars row ───────────────────────────────────────── */}
        <div className="max-w-[1400px] mx-auto mt-20 sm:mt-24 md:mt-32 pb-24 sm:pb-32 md:pb-40">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex items-center gap-4 mb-10 sm:mb-14"
          >
            <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-muted-foreground/60">
              Working Principles
            </span>
            <div className="flex-1 h-px bg-foreground/8" aria-hidden="true" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.index}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
                className={[
                  "group relative px-4 py-8 sm:py-10",
                  "sm:px-8 lg:px-10",
                  i > 0 ? "border-t sm:border-t-0 sm:border-l border-foreground/8" : "",
                ].join(" ")}
              >
                {/* Index */}
                <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-foreground/22 block mb-4">
                  {p.index}
                </span>

                {/* Animated accent line */}
                <div className="w-6 h-px bg-foreground/20 mb-5 transition-all duration-500 group-hover:w-12 group-hover:bg-foreground/60" aria-hidden="true" />

                <h3 className="font-serif text-xl sm:text-2xl tracking-tight text-foreground mb-3">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONTACT / FOOTER SECTION
// ═══════════════════════════════════════════════════════════════════════════════

const SOCIAL_LINKS = [
  { href: "https://www.instagram.com/fresnelphotography/", label: "Instagram", Icon: Instagram },
  { href: "https://bhaskar.xyz", label: "Portfolio", Icon: ExternalLink },
  { href: "mailto:photography.fresnel@gmail.com", label: "Email", Icon: Mail },
]

type FormState = "idle" | "sending" | "sent" | "error"

function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const emailRef = useRef<HTMLAnchorElement>(null)
  const [hoveringEmail, setHoveringEmail] = useState(false)
  const [formState, setFormState] = useState<FormState>("idle")
  const [fields, setFields] = useState({ name: "", email: "", message: "" })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"])

  // Simulated form submit — replace with real handler
  const handleSubmit = async () => {
    if (!fields.name || !fields.email || !fields.message) return
    setFormState("sending")
    await new Promise((r) => setTimeout(r, 1200))
    setFormState("sent")
  }

  const inputBase =
    "w-full bg-transparent border-b border-contact-rule py-3 text-sm text-contact-text placeholder:text-contact-meta " +
    "focus:outline-none focus:border-contact-text transition-colors duration-300 resize-none"

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="relative bg-foreground text-background overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Grain */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
        aria-hidden="true"
      />

      {/* Background large numeral */}
      <motion.div
        style={{ y: bgY }}
        className="absolute -bottom-16 -left-8 pointer-events-none z-0 select-none"
        aria-hidden="true"
      >
        <span
          className="font-serif font-bold text-white/[0.03] leading-none"
          style={{ fontSize: "clamp(14rem, 35vw, 40rem)" }}
        >
          02
        </span>
      </motion.div>

      <div className="relative z-10 px-6 sm:px-10 md:px-16 lg:px-24 pt-24 sm:pt-32 md:pt-40">

        {/* ── Section label ──────────────────────────────────────── */}
        <motion.span
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="inline-flex items-center gap-3 text-[9px] sm:text-[10px] tracking-[0.5em] uppercase text-contact-meta mb-10 sm:mb-14"
        >
          <span className="w-6 h-px bg-contact-rule" aria-hidden="true" />
          Get in Touch
        </motion.span>

        {/* ── Mega email headline ───────────────────────────────── */}
        <div className="overflow-hidden mb-16 sm:mb-20 md:mb-24 max-w-[1400px] mx-auto">
          <motion.a
            ref={emailRef}
            href="mailto:photography.fresnel@gmail.com"
            id="contact-heading"
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: EASE }}
            onMouseEnter={() => setHoveringEmail(true)}
            onMouseLeave={() => setHoveringEmail(false)}
            className="block font-serif tracking-tighter leading-[0.9] sm:leading-[0.85] text-contact-text/[0.95]
                                   break-all sm:break-normal focus-visible:outline-none focus-visible:underline"
            style={{ fontSize: "clamp(1.75rem, 5.5vw, 7rem)" }}
            aria-label="Send email to photography.fresnel@gmail.com"
          >
            <motion.span
              animate={{ x: hoveringEmail ? "1.5%" : "0%" }}
              transition={{ duration: 0.5, ease: EASE }}
              className="inline-flex items-end gap-4 sm:gap-6"
            >
              photography.fresnel@gmail.com
              <motion.span
                animate={{
                  opacity: hoveringEmail ? 1 : 0,
                  x: hoveringEmail ? 0 : -12,
                }}
                transition={{ duration: 0.35, ease: EASE }}
                aria-hidden="true"
              >
                <ArrowUpRight
                  className="mb-2"
                  style={{ width: "clamp(1.2rem, 3vw, 3.5rem)", height: "clamp(1.2rem, 3vw, 3.5rem)" }}
                />
              </motion.span>
            </motion.span>
          </motion.a>

          {/* Rule below email */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, delay: 0.2, ease: EASE }}
            className="h-px bg-contact-rule mt-6 sm:mt-8 origin-left"
          />
        </div>

        {/* ── Two-column body ───────────────────────────────────── */}
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

          {/* Left: studio info + socials */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="lg:col-span-5 flex flex-col gap-12"
          >
            {/* Studio blurb */}
            <div className="space-y-4">
              <p className="font-mono text-[9px] tracking-[0.45em] uppercase text-contact-meta mb-3">
                Studio
              </p>
              <p className="text-contact-text text-sm sm:text-base leading-[1.85]">
                When not behind the camera, you'll find me wandering the streets of Bengaluru,
                chasing golden hour, or sitting quietly with a coffee, planning the next adventure.
              </p>
            </div>

            {/* Location pill */}
            <div className="inline-flex items-center gap-2.5 border border-contact-pill rounded-full px-4 py-2 w-fit">
              <MapPin className="w-3 h-3 text-contact-meta" aria-hidden="true" />
              <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.35em] uppercase text-contact-meta">
                Bengaluru, India — 12.97° N
              </span>
            </div>

            {/* Social links */}
            <div className="flex gap-3" role="list" aria-label="Social media links">
              {SOCIAL_LINKS.map(({ href, label, Icon }, i) => (
                <motion.a
                  key={label}
                  role="listitem"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                  whileHover={{ y: -3, transition: { duration: 0.25 } }}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-contact-pill
                                               flex items-center justify-center text-contact-meta
                                               hover:text-contact-text hover:border-contact-meta transition-colors duration-200
                                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-contact-meta"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </motion.a>
              ))}
            </div>

            {/* HUD-style meta */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-contact-rule pt-8 mb-4 lg:mb-0">
              {[
                { label: "Response", value: "24–48 hrs" },
                { label: "Format", value: "Still + Motion" },
                { label: "Base", value: "Bengaluru, IN" },
                { label: "Series", value: "Vol. 01 Active" },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="font-mono text-[7px] tracking-[0.4em] uppercase text-contact-meta/50">
                    {label}
                  </span>
                  <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.25em] text-contact-text">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: contact form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="lg:col-span-7"
          >
            <p className="font-mono text-[9px] tracking-[0.45em] uppercase text-contact-meta mb-8">
              Send a Message
            </p>

            {formState === "sent" ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="py-16 flex flex-col items-start gap-4"
              >
                <span className="font-serif italic text-4xl sm:text-5xl text-contact-text">
                  Thank you.
                </span>
                <p className="text-contact-meta text-sm leading-relaxed max-w-xs">
                  Message received. I'll be in touch within 24–48 hours.
                </p>
                <button
                  onClick={() => { setFormState("idle"); setFields({ name: "", email: "", message: "" }) }}
                  className="mt-4 font-mono text-[9px] tracking-[0.4em] uppercase text-contact-meta
                                               hover:text-contact-text border-b border-contact-pill hover:border-contact-meta pb-1
                                               transition-all duration-200 focus-visible:outline-none"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <div className="flex flex-col gap-8">
                {/* Name */}
                <div className="relative">
                  <label
                    htmlFor="contact-name"
                    className="font-mono text-[8px] tracking-[0.4em] uppercase text-contact-meta block mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    value={fields.name}
                    onChange={(e) => setFields((f) => ({ ...f, name: e.target.value }))}
                    className={inputBase}
                    autoComplete="name"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <label
                    htmlFor="contact-email"
                    className="font-mono text-[8px] tracking-[0.4em] uppercase text-contact-meta block mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="your@email.com"
                    value={fields.email}
                    onChange={(e) => setFields((f) => ({ ...f, email: e.target.value }))}
                    className={inputBase}
                    autoComplete="email"
                  />
                </div>

                {/* Message */}
                <div className="relative">
                  <label
                    htmlFor="contact-message"
                    className="font-mono text-[8px] tracking-[0.4em] uppercase text-contact-meta block mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Tell me about your project…"
                    value={fields.message}
                    onChange={(e) => setFields((f) => ({ ...f, message: e.target.value }))}
                    className={inputBase}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={formState === "sending" || !fields.name || !fields.email || !fields.message}
                  className="w-full sm:w-auto justify-center sm:justify-start inline-flex items-center gap-3
                                               font-mono text-[10px] tracking-[0.4em] uppercase
                                               text-contact-bg bg-contact-text px-7 py-3.5 rounded-full
                                               hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed
                                               transition-all duration-200
                                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-contact-meta"
                  aria-label={formState === "sending" ? "Sending message…" : "Send message"}
                >
                  {formState === "sending" ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-3 h-3 border border-background/40 border-t-background rounded-full"
                        aria-hidden="true"
                      />
                      Sending
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </>
                  )}
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>

        {/* ── Footer strip ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-[1400px] mx-auto mt-20 sm:mt-24 md:mt-32 pt-8 border-t border-contact-rule
                               flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-10 sm:pb-12 md:pb-14"
        >
          <span className="font-serif text-2xl sm:text-3xl tracking-tighter text-contact-text">
            Fresnel
          </span>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-8">
            <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.35em] uppercase text-contact-meta">
              VOL. 01 // BLR // MMXXVI
            </span>
            <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.3em] uppercase text-contact-meta">
              © {new Date().getFullYear()} All Rights Reserved
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

function scrollToSection(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  const heroRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const y = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <main className="min-h-screen">
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:rounded"
      >
        Skip to main content
      </a>

      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        id="main-content"
        ref={heroRef}
        className="relative h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden bg-background"
        aria-labelledby="hero-title"
      >
        {/* Camera flash on load */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0 bg-foreground z-[60] pointer-events-none"
          aria-hidden="true"
        />

        {/* Grain texture */}
        <div
          className="absolute inset-0 z-[1] opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
          aria-hidden="true"
        />

        {/* ── Viewfinder brackets ─────────────────────────────────────────── */}
        {/* Outer border */}
        <div
          className="absolute inset-4 sm:inset-8 md:inset-12 lg:inset-16 border-[0.5px] border-foreground/5 pointer-events-none z-20"
          aria-hidden="true"
        >
          {/* Corner ticks — scale with viewport via responsive sizing */}
          {[
            "top-0 left-0 border-t border-l",
            "top-0 right-0 border-t border-r",
            "bottom-0 left-0 border-b border-l",
            "bottom-0 right-0 border-b border-r",
          ].map((cls) => (
            <div
              key={cls}
              className={`absolute w-5 h-5 sm:w-7 sm:h-7 md:w-10 md:h-10 border-foreground/25 ${cls}`}
            />
          ))}

          {/* Centre crosshair */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
            <div className="w-6 h-px bg-foreground/15" />
            <div className="w-px h-6 bg-foreground/15 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* ── Archival metadata HUD ───────────────────────────────────────── */}
        {/*
          Responsive strategy:
          - Mobile  : only the right-side fields (status + exposure) — they're compact
          - sm+     : add left-side series / coordinates
          - Use safe insets that don't overlap the viewfinder corners
        */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 1.2 }}
          className="absolute inset-0 z-30 pointer-events-none
                     flex flex-col justify-between
                     px-6 py-28
                     sm:px-10 sm:py-28
                     md:px-16 md:py-28
                     lg:px-24 lg:py-24"
          aria-hidden="true"
        >
          {/* Top row */}
          <div className="flex justify-between items-start">
            {/* Left — hidden on mobile */}
            <div className="hidden sm:flex flex-col gap-1">
              <p className="font-mono text-[8px] md:text-[9px] tracking-[0.35em] uppercase text-foreground/35">
                Archival Series
              </p>
              <p className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-foreground font-bold italic">
                Vol. 01 / BLR
              </p>
            </div>

            {/* Right — always visible */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_6px_oklch(var(--primary)/0.8)]" />
              <p className="font-mono text-[8px] md:text-[9px] tracking-[0.3em] uppercase text-foreground/50">
                Status: Active
              </p>
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex justify-between items-end">
            {/* Left — hidden on mobile */}
            <div className="hidden sm:flex flex-col gap-0.5">
              <p className="font-mono text-[8px] md:text-[9px] tracking-[0.25em] uppercase text-foreground/30">
                12.9716° N
              </p>
              <p className="font-mono text-[8px] md:text-[9px] tracking-[0.25em] uppercase text-foreground/30">
                77.5946° E
              </p>
            </div>

            {/* Right — always visible */}
            <div className="text-right ml-auto flex flex-col gap-0.5">
              <p className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-foreground font-bold">
                ISO 100
              </p>
              <p className="font-mono text-[8px] md:text-[9px] tracking-[0.25em] uppercase text-foreground/35">
                f/2.8 · 1/250s
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Main hero content ────────────────────────────────────────────── */}
        <motion.div
          style={{ opacity, scale, y }}
          className="relative z-10 w-full max-w-7xl px-4 sm:px-6"
        >
          {/* Title — single fluid clamp, no md: override collision */}
          <h1
            id="hero-title"
            className="font-serif uppercase leading-none tracking-tight text-center text-foreground flex justify-center overflow-hidden"
            style={{ fontSize: "clamp(3.5rem, 15vw, 20rem)" }}
            aria-label="Fresnel Photography"
          >
            {["F", "R", "E", "S", "N", "E", "L"].map((char, i) => (
              <motion.span
                key={i}
                initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
                animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
                transition={{
                  duration: 1.4,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.3 + i * 0.09,
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle strip */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 sm:mt-14 md:mt-20
                       flex flex-col sm:flex-row
                       items-center justify-center
                       gap-6 sm:gap-10 md:gap-16 lg:gap-28"
          >
            {/* Left label */}
            <div className="flex flex-col items-center sm:items-start gap-3 order-2 sm:order-1">
              <p className="text-[9px] sm:text-[10px] tracking-[0.5em] uppercase text-muted-foreground">
                Archival Capture
              </p>
              <div className="w-12 h-px bg-foreground/20" />
            </div>

            {/* Centre tagline — full width on mobile, constrained on desktop */}
            <p className="font-serif italic text-base sm:text-lg md:text-xl
                          max-w-[28ch] sm:max-w-xs md:max-w-sm
                          leading-relaxed text-center text-foreground/75
                          order-1 sm:order-2 px-2 sm:px-0">
              Documenting the quiet intentionality of&nbsp;existence through an archival&nbsp;lens.
            </p>

            {/* Right CTA */}
            <div className="order-3 flex flex-col items-center sm:items-end gap-3">
              <button
                onClick={() => scrollToSection("#work")}
                className="group flex items-center gap-3 text-[9px] sm:text-[10px] tracking-[0.4em] uppercase
                           font-bold text-foreground border-b border-foreground/20 pb-1.5
                           hover:border-foreground focus-visible:outline-none focus-visible:border-foreground
                           transition-all duration-200"
              >
                Entrance
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Scroll indicator ─────────────────────────────────────────────── */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          onClick={() => scrollToSection("#work")}
          className="absolute bottom-8 sm:bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 z-30
                     flex flex-col items-center gap-3 group
                     focus-visible:outline-none"
          aria-label="Scroll to work"
        >
          <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.45em] uppercase
                           text-muted-foreground group-hover:text-foreground transition-colors duration-300">
            Observe
          </span>
          {/* Animated line */}
          <div className="relative w-px h-10 sm:h-12 bg-foreground/10 overflow-hidden">
            <motion.div
              animate={{ y: ["-100%", "110%"] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-foreground/70"
            />
          </div>
        </motion.button>
      </section>

      {/* ── Gallery ──────────────────────────────────────────────────────── */}
      <Gallery detailed limit={6} />

      <AboutSection />
      <ContactSection />
    </main>
  )
}