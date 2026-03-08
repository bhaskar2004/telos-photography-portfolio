"use client"

import { motion, useAnimate, stagger } from "framer-motion"
import { useEffect } from "react"

const CHARS = ["F", "R", "E", "S", "N", "E", "L"]
const EASE = [0.16, 1, 0.3, 1] as const
const EASE_OUT = [0.22, 1, 0.36, 1] as const

export default function Loading() {
    const [scope, animate] = useAnimate()

    useEffect(() => {
        const seq = async () => {
            await animate([
                // 1. Shutter opens — two halves slide apart
                ["#shutter-top", { y: "-100%" }, { duration: 0.55, ease: EASE }],
                ["#shutter-bot", { y: "100%" }, { duration: 0.55, ease: EASE, at: "<" }],

                // 2. Corner ticks draw in
                ["#corners > *", { opacity: 1, scale: 1 }, {
                    duration: 0.4, delay: stagger(0.07), ease: EASE, at: "-0.1"
                }],

                // 3. Letters reveal upward
                ["#chars > span",
                    { clipPath: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"], opacity: [0, 1] },
                    { duration: 1.0, delay: stagger(0.06), ease: EASE, at: "-0.2" }
                ],

                // 4. Rule + tagline
                ["#rule", { scaleX: 1, opacity: 1 }, { duration: 1.0, ease: EASE_OUT, at: "-0.4" }],
                ["#tagline", { opacity: 1, y: 0 }, { duration: 0.8, ease: EASE, at: "-0.5" }],

                // 5. HUD metadata
                ["#hud > *", { opacity: 1, y: 0 }, { duration: 0.6, delay: stagger(0.08), ease: EASE, at: "-0.2" }]
            ])
        }
        seq()
    }, [animate])

    return (
        <div
            ref={scope}
            className="min-h-svh bg-background flex items-center justify-center overflow-hidden relative select-none"
            aria-label="Loading Fresnel"
            aria-live="polite"
        >
            {/* ── Shutter panels (two halves that split on reveal) ─────── */}
            <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden" aria-hidden="true">
                <motion.div
                    id="shutter-top"
                    className="absolute inset-x-0 top-0 h-1/2 bg-foreground origin-top"
                />
                <motion.div
                    id="shutter-bot"
                    className="absolute inset-x-0 bottom-0 h-1/2 bg-foreground origin-bottom"
                />
            </div>

            {/* ── Viewfinder frame ─────────────────────────────────────── */}
            <div
                className="absolute inset-6 sm:inset-10 md:inset-16 lg:inset-20 pointer-events-none border-[0.5px] border-foreground/5 z-10"
                aria-hidden="true"
            >
                <div id="corners">
                    {[
                        "top-0 left-0 border-t border-l",
                        "top-0 right-0 border-t border-r",
                        "bottom-0 left-0 border-b border-l",
                        "bottom-0 right-0 border-b border-r",
                    ].map((cls) => (
                        <motion.div
                            key={cls}
                            initial={{ opacity: 0, scale: 0.7 }}
                            className={`absolute w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border-foreground/25 ${cls}`}
                        />
                    ))}
                    {/* Crosshair centre */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-5 h-px bg-foreground/12" />
                        <div className="w-px h-5 bg-foreground/12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                </div>
            </div>

            {/* ── HUD metadata strips ───────────────────────────────────── */}
            <div
                id="hud"
                className="absolute inset-x-8 sm:inset-x-12 md:inset-x-20 top-8 sm:top-12 md:top-16 z-20
                           flex justify-between pointer-events-none"
                aria-hidden="true"
            >
                {[
                    { label: "STATUS", value: "ACTIVE" },
                    { label: "SERIES", value: "VOL. 01" },
                ].map(({ label, value }) => (
                    <motion.div
                        key={label}
                        initial={{ opacity: 0, y: -8 }}
                        className="flex flex-col gap-0.5"
                    >
                        <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.4em] uppercase text-foreground/25">
                            {label}
                        </span>
                        <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.3em] uppercase text-foreground/55 font-bold">
                            {value}
                        </span>
                    </motion.div>
                ))}
            </div>

            {/* Bottom HUD */}
            <div
                className="absolute inset-x-8 sm:inset-x-12 md:inset-x-20 bottom-8 sm:bottom-12 md:bottom-16 z-20
                           flex justify-between pointer-events-none"
                aria-hidden="true"
            >
                {[
                    { label: "12.9716° N", value: "77.5946° E" },
                    { label: "ISO 100", value: "f/2.8 · 1/250s" },
                ].map(({ label, value }) => (
                    <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 8 }}
                        className="flex flex-col gap-0.5"
                    >
                        <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.35em] uppercase text-foreground/25">
                            {label}
                        </span>
                        <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.3em] uppercase text-foreground/40">
                            {value}
                        </span>
                    </motion.div>
                ))}
            </div>

            {/* ── Centre content ────────────────────────────────────────── */}
            <div className="relative z-20 flex flex-col items-center text-center px-6">

                {/* Title */}
                <h1
                    id="chars"
                    className="font-serif uppercase tracking-tighter leading-none text-foreground flex overflow-hidden"
                    style={{ fontSize: "clamp(3.5rem, 14vw, 14rem)" }}
                    aria-label="Fresnel"
                >
                    {CHARS.map((char, i) => (
                        <motion.span
                            key={i}
                            initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
                            className="inline-block"
                        >
                            {char}
                        </motion.span>
                    ))}
                </h1>

                {/* Animated horizontal rule */}
                <motion.div
                    id="rule"
                    initial={{ scaleX: 0, opacity: 0 }}
                    className="h-px bg-foreground/15 mt-5 md:mt-7 w-full origin-left"
                />

                {/* Tagline */}
                <motion.p
                    id="tagline"
                    initial={{ opacity: 0, y: 8 }}
                    className="font-mono text-[9px] sm:text-[10px] tracking-[0.6em] uppercase text-muted-foreground mt-4 md:mt-5"
                >
                    Archival Portfolio
                </motion.p>

                {/* Loader bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                    className="mt-8 md:mt-10 w-24 sm:w-32 h-px bg-foreground/8 overflow-hidden relative"
                    aria-hidden="true"
                >
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ delay: 1.8, duration: 1.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.4 }}
                        className="absolute inset-0 bg-foreground/40"
                    />
                </motion.div>
            </div>

            {/* ── Grain texture ─────────────────────────────────────────── */}
            <div
                className="absolute inset-0 z-[1] opacity-[0.035] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "128px 128px",
                }}
                aria-hidden="true"
            />
        </div>
    )
}