"use client"

import { ReactLenis, type LenisRef } from "lenis/react"
import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

interface SmoothScrollProps {
    children: React.ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    const lenisRef = useRef<LenisRef>(null)
    const pathname = usePathname()

    // Respect the user's OS-level "reduce motion" preference.
    // When active, disable smooth scrolling entirely — Lenis otherwise overrides
    // the browser's own prefers-reduced-motion behaviour for wheel/touch events.
    const prefersReducedMotion =
        typeof window !== "undefined"
            ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
            : false

    // Scroll to top on route change.
    // Next.js App Router does not guarantee this for soft navigations;
    // Lenis keeps its own scroll position, so we reset it explicitly.
    useEffect(() => {
        lenisRef.current?.lenis?.scrollTo(0, { immediate: true })
    }, [pathname])

    // Stop Lenis when the page is hidden (e.g. tab switch) and resume on return.
    // Without this, the rAF loop keeps running in the background, wasting CPU.
    useEffect(() => {
        const lenis = lenisRef.current?.lenis
        if (!lenis) return

        const handleVisibilityChange = () => {
            if (document.hidden) {
                lenis.stop()
            } else {
                lenis.start()
            }
        }

        document.addEventListener("visibilitychange", handleVisibilityChange)
        return () =>
            document.removeEventListener("visibilitychange", handleVisibilityChange)
    }, [])

    if (prefersReducedMotion) {
        // Render children without any scroll wrapper — native scroll only
        return <>{children}</>
    }

    return (
        <ReactLenis
            ref={lenisRef}
            root
            options={{
                lerp: 0.1,         // interpolation factor — controls "heaviness"
                duration: 1.5,     // gesture duration in seconds
                smoothWheel: true, // smooth mouse-wheel events
                syncTouch: false,  // native momentum on touch; Lenis touch feels unnatural
                overscroll: false, // prevent Lenis from handling elastic overscroll (let the OS do it)
            }}
        >
            {children}
        </ReactLenis>
    )
}