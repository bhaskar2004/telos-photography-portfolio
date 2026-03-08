"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect, useCallback, useMemo, type KeyboardEvent } from "react"
import { X, ZoomIn, ChevronLeft, ChevronRight, ArrowRight, ArrowUpRight } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Photo {
  id: number
  src: string
  title: string
  category: string
  description: string
  width: number
  height: number
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const photos: Photo[] = [
  {
    id: 1,
    src: "/photo1.jpg",
    title: "Misty Highlands",
    category: "Landscape",
    description: "Editorial portrait with soft refraction and deep shadows by Fresnel, Bengaluru.",
    width: 1920,
    height: 1080,
  },
  {
    id: 2,
    src: "/photo2.jpg",
    title: "Urban Skyline",
    category: "Architecture",
    description: "Close-up of a lens aperture reflecting the architectural lines of Bengaluru, an archival optics study.",
    width: 1080,
    height: 1350,
  },
  {
    id: 3,
    src: "/photo3.jpg",
    title: "Golden Hour Lake",
    category: "Landscape",
    description: "A fine art photography session utilizing high-contrast diffraction and natural light focus.",
    width: 1080,
    height: 1350,
  },
  {
    id: 4,
    src: "/photo4.jpg",
    title: "Dusk Silhouette",
    category: "Editorial",
    description: "Black and white archival print showing exceptional depth of field and human connection.",
    width: 1080,
    height: 1440,
  },
  {
    id: 5,
    src: "/photo5.jpg",
    title: "Eternal Rose",
    category: "Still Life",
    description: "Cinematic studio setup focusing on the wavelength of golden hour light for an editorial portrait.",
    width: 1080,
    height: 1620,
  },
  {
    id: 6,
    src: "/photo6.jpg",
    title: "Twilight Branches",
    category: "Landscape",
    description: "Stark tree branches silhouetted against fading twilight, a cinematic capture by Fresnel.",
    width: 1920,
    height: 1080,
  },
  {
    id: 7,
    src: "/photo7.jpg",
    title: "Village Oasis",
    category: "Documentary",
    description: "Crystal-clear water gushing into a village pond amid rice fields, documented by Fresnel.",
    width: 1080,
    height: 1350,
  },
  {
    id: 9,
    src: "/photo9.jpg",
    title: "Nature's Geometry",
    category: "Macro",
    description: "Macro study of intricate fern fronds in emerald hues by Fresnel.",
    width: 1080,
    height: 1350,
  },
  {
    id: 10,
    src: "/photo10.jpg",
    title: "Evergreen Depth",
    category: "Macro",
    description: "Abstract close-up of dense evergreen foliage, rich textures captured by Fresnel Photography.",
    width: 1080,
    height: 1440,
  },
]

// ─── Constants ────────────────────────────────────────────────────────────────

const EASE_EXPO = [0.16, 1, 0.3, 1] as const
const EASE_SPRING = [0.34, 1.56, 0.64, 1] as const
const GAP = 16 // px — matches gap-4

// ─── True Masonry Hook ───────────────────────────────────────────────────────
//
// Distributes items into N columns by always picking the shortest column
// (measured as cumulative normalised aspect-ratio height). This is the
// "Pinterest" algorithm — no CSS columns, no grid spans needed.

function useMasonryColumns(items: Photo[], columnCount: number): Photo[][] {
  return useMemo(() => {
    const cols: Photo[][] = Array.from({ length: columnCount }, () => [])
    const heights = new Array<number>(columnCount).fill(0)

    for (const item of items) {
      const shortest = heights.indexOf(Math.min(...heights))
      cols[shortest].push(item)
      heights[shortest] += item.height / item.width // aspect ratio as proxy for rendered height
    }

    return cols
  }, [items, columnCount])
}

// ─── useColumnCount ──────────────────────────────────────────────────────────

function useColumnCount(containerRef: React.RefObject<HTMLElement | null>): number {
  const [cols, setCols] = useState(3)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => {
      const w = el.offsetWidth
      setCols(w < 560 ? 1 : w < 900 ? 2 : 3)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [containerRef])

  return cols
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

interface GalleryProps {
  detailed?: boolean
  limit?: number
}

export function Gallery({ detailed = false, limit }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [filter, setFilter] = useState("All")
  const containerRef = useRef<HTMLDivElement>(null)
  const columnCount = useColumnCount(containerRef)

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(photos.map((p) => p.category)))],
    []
  )

  const filteredPhotos = useMemo(
    () => (filter === "All" ? photos : photos.filter((p) => p.category === filter)),
    [filter]
  )

  const displayedPhotos = useMemo(
    () => (limit ? filteredPhotos.slice(0, limit) : filteredPhotos),
    [filteredPhotos, limit]
  )

  const masonryCols = useMasonryColumns(displayedPhotos, columnCount)

  const openLightbox = useCallback((index: number) => {
    setSelectedIndex(index)
    document.body.style.overflow = "hidden"
  }, [])

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null)
    document.body.style.overflow = ""
  }, [])

  const navigate = useCallback(
    (dir: "prev" | "next") => {
      setSelectedIndex((prev) => {
        if (prev === null) return null
        const len = displayedPhotos.length
        return dir === "prev" ? (prev === 0 ? len - 1 : prev - 1) : (prev === len - 1 ? 0 : prev + 1)
      })
    },
    [displayedPhotos.length]
  )

  useEffect(() => () => { document.body.style.overflow = "" }, [])

  return (
    <>
      <section
        id="work"
        aria-label="Photography gallery"
        className="px-4 sm:px-6 md:px-12 py-20 md:py-32 bg-background"
      >
        {/* ── Section header ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: EASE_EXPO }}
          className="max-w-7xl mx-auto mb-14 md:mb-20 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div>
            <p className="text-[9px] tracking-[0.5em] uppercase text-muted-foreground mb-4">
              Selected Work
            </p>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.85] text-foreground">
              The Archive
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed sm:text-right">
            A curated collection of moments,<br className="hidden sm:block" /> captured through an archival lens.
          </p>
        </motion.div>

        {/* ── Filter bar ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease: EASE_EXPO }}
          className="max-w-7xl mx-auto mb-12 md:mb-16"
        >
          <div
            role="group"
            aria-label="Filter by category"
            className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide"
          >
            {categories.map((cat, i) => {
              const active = filter === cat
              return (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: EASE_EXPO }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setFilter(cat)}
                  aria-pressed={active}
                  className={[
                    "relative px-4 sm:px-5 py-2 text-[9px] sm:text-[10px] tracking-[0.35em] uppercase whitespace-nowrap flex-shrink-0",
                    "transition-colors duration-300 rounded-full border",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    active
                      ? "bg-foreground text-background border-foreground"
                      : "bg-transparent text-foreground/50 border-foreground/15 hover:text-foreground hover:border-foreground/40",
                  ].join(" ")}
                >
                  {cat}
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* ── True Masonry Grid ──────────────────────────────────────────── */}
        <div
          ref={containerRef}
          className="max-w-7xl mx-auto"
          style={{ display: "flex", gap: GAP, alignItems: "flex-start" }}
        >
          <AnimatePresence mode="wait">
            {masonryCols.map((col, colIdx) => (
              <div
                key={`col-${colIdx}-${columnCount}`}
                style={{ flex: 1, display: "flex", flexDirection: "column", gap: GAP }}
              >
                {col.map((photo, rowIdx) => {
                  // global index into displayedPhotos for lightbox
                  const globalIndex = displayedPhotos.indexOf(photo)
                  return (
                    <GalleryItem
                      key={photo.id}
                      photo={photo}
                      index={rowIdx + colIdx * 3}
                      detailed={detailed}
                      onClick={() => openLightbox(globalIndex)}
                    />
                  )
                })}
              </div>
            ))}
          </AnimatePresence>
        </div>

        {/* ── Footer row ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: EASE_EXPO }}
          className="max-w-7xl mx-auto mt-14 md:mt-20 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <p
            aria-live="polite"
            aria-atomic="true"
            className="text-[9px] tracking-[0.35em] uppercase text-muted-foreground"
          >
            {displayedPhotos.length} {displayedPhotos.length === 1 ? "image" : "images"} shown
          </p>

          <Link
            href="/gallery"
            className="group inline-flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase font-bold
                       text-foreground border-b border-foreground/20 pb-1.5 hover:border-foreground
                       transition-all duration-200 focus-visible:outline-none"
          >
            View full archive
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" aria-hidden="true" />
          </Link>
        </motion.div>
      </section>

      <Lightbox
        photos={displayedPhotos}
        selectedIndex={selectedIndex}
        onClose={closeLightbox}
        onNavigate={navigate}
      />
    </>
  )
}

// ─── GalleryItem ──────────────────────────────────────────────────────────────

interface GalleryItemProps {
  photo: Photo
  index: number
  detailed?: boolean
  onClick?: () => void
}

function GalleryItem({ photo, index, detailed, onClick }: GalleryItemProps) {
  const [loaded, setLoaded] = useState(false)
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  // Subtle parallax on the inner image only — doesn't affect card height
  const imgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"])

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick?.() }
  }

  const displayIndex = String(index + 1).padStart(2, "0")
  const aspectRatio = photo.width / photo.height

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.9, delay: index * 0.04, ease: EASE_EXPO }}
      whileHover={{ y: -6, transition: { duration: 0.4, ease: EASE_EXPO } }}
      className="group cursor-pointer relative overflow-hidden bg-muted/20 rounded-sm shadow-md hover:shadow-xl transition-shadow duration-500"
      style={{ aspectRatio }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`Open ${photo.title} in lightbox`}
      onKeyDown={handleKeyDown}
    >
      {/* Skeleton */}
      {!loaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" aria-hidden="true" />
      )}

      {/* Image with parallax */}
      <motion.div
        style={{ y: imgY, scale: 1.1 }}
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        <Image
          src={photo.src || "/placeholder.svg"}
          alt={photo.description}
          fill
          quality={85}
          sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
          onLoad={() => setLoaded(true)}
          loading={index < 3 ? "eager" : "lazy"}
          priority={index < 3}
          className={[
            "object-cover transition-all duration-[1400ms] ease-out",
            "group-hover:scale-[1.06]",
            loaded ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />
      </motion.div>

      {/* ── Hover overlay ─────────────────────────────────────────────── */}
      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/0 z-10"
        aria-hidden="true"
      />

      {/* Top-right: index + expand icon */}
      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -8 }}
        transition={{ duration: 0.35, ease: EASE_EXPO }}
        className="absolute top-4 right-4 z-20 flex items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-mono text-[9px] tracking-[0.3em] text-white/60">{displayIndex}</span>
        <div className="w-7 h-7 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <ArrowUpRight className="w-3.5 h-3.5 text-white" />
        </div>
      </motion.div>

      {/* Bottom: title + category */}
      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 12 }}
        transition={{ duration: 0.4, delay: 0.05, ease: EASE_EXPO }}
        className="absolute bottom-0 inset-x-0 z-20 p-5 sm:p-6"
      >
        <p className="text-[8px] sm:text-[9px] tracking-[0.35em] uppercase text-white/55 mb-1.5">
          {photo.category}
        </p>
        <h3 className="font-serif text-lg sm:text-xl md:text-2xl tracking-tight leading-tight text-white">
          {photo.title}
        </h3>
        {detailed && (
          <p className="mt-2 text-xs text-white/60 leading-relaxed line-clamp-2">
            {photo.description}
          </p>
        )}
      </motion.div>

      {/* Subtle border glow on hover */}
      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 z-30 ring-1 ring-white/10 rounded-sm pointer-events-none"
        aria-hidden="true"
      />
    </motion.div>
  )
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

interface LightboxProps {
  photos: Photo[]
  selectedIndex: number | null
  onClose: () => void
  onNavigate: (dir: "prev" | "next") => void
}

const MIN_SWIPE = 48

function Lightbox({ photos, selectedIndex, onClose, onNavigate }: LightboxProps) {
  const photo = selectedIndex !== null ? photos[selectedIndex] : null
  const closeRef = useRef<HTMLButtonElement>(null)
  const touchStartX = useRef<number | null>(null)

  // Keyboard
  useEffect(() => {
    const handle = (e: globalThis.KeyboardEvent) => {
      if (selectedIndex === null) return
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onNavigate("prev")
      if (e.key === "ArrowRight") onNavigate("next")
    }
    window.addEventListener("keydown", handle)
    return () => window.removeEventListener("keydown", handle)
  }, [selectedIndex, onClose, onNavigate])

  // Focus trap
  useEffect(() => {
    if (selectedIndex !== null) closeRef.current?.focus()
  }, [selectedIndex])

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const dx = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(dx) >= MIN_SWIPE) onNavigate(dx > 0 ? "next" : "prev")
    touchStartX.current = null
  }

  return (
    <AnimatePresence>
      {selectedIndex !== null && photo && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Lightbox: ${photo.title}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center"
          onClick={onClose}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* ── Top bar ──────────────────────────────────────────────── */}
          <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-5 sm:px-8 py-5 sm:py-6">
            <div>
              <p className="font-mono text-[8px] sm:text-[9px] tracking-[0.4em] uppercase text-white/35">
                {photo.category}
              </p>
              <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-white/50 mt-0.5">
                {String(selectedIndex + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
              </p>
            </div>

            <motion.button
              ref={closeRef}
              initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
              transition={{ duration: 0.35, ease: EASE_SPRING }}
              whileHover={{ rotate: 90, scale: 1.1, transition: { duration: 0.25 } }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => { e.stopPropagation(); onClose() }}
              aria-label="Close lightbox"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/15 bg-white/5 backdrop-blur-md
                         flex items-center justify-center hover:border-white/35 transition-colors
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" aria-hidden="true" />
            </motion.button>
          </div>

          {/* ── Prev / Next ────────────────────────────────────────────── */}
          {[
            { dir: "prev" as const, Icon: ChevronLeft, side: "left-4 sm:left-6 md:left-10" },
            { dir: "next" as const, Icon: ChevronRight, side: "right-4 sm:right-6 md:right-10" },
          ].map(({ dir, Icon, side }) => (
            <motion.button
              key={dir}
              initial={{ opacity: 0, x: dir === "prev" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir === "prev" ? -20 : 20 }}
              transition={{ duration: 0.4, delay: 0.15, ease: EASE_EXPO }}
              whileHover={{ scale: 1.1, x: dir === "prev" ? -3 : 3, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.93 }}
              onClick={(e) => { e.stopPropagation(); onNavigate(dir) }}
              aria-label={dir === "prev" ? "Previous photo" : "Next photo"}
              className={`hidden sm:flex absolute ${side} top-1/2 -translate-y-1/2 z-20
                         w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/15 bg-white/5 backdrop-blur-md
                         items-center justify-center hover:border-white/35 transition-colors
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50`}
            >
              <Icon className="w-5 h-5 text-white" aria-hidden="true" />
            </motion.button>
          ))}

          {/* ── Image ─────────────────────────────────────────────────── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.93, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: -16 }}
              transition={{ duration: 0.55, ease: EASE_EXPO }}
              className="relative z-10 w-full max-w-[92vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-5xl px-4 sm:px-0 flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative overflow-hidden rounded-sm shadow-2xl w-full">
                <Image
                  src={photo.src}
                  alt={photo.description}
                  width={photo.width}
                  height={photo.height}
                  quality={90}
                  priority
                  className="max-h-[58vh] sm:max-h-[65vh] w-full h-auto object-contain"
                />
              </div>

              {/* Caption */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: EASE_EXPO }}
                className="mt-6 sm:mt-8 text-center w-full"
              >
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl tracking-tight text-white">
                  {photo.title}
                </h2>
                <p className="mt-3 text-sm text-white/50 leading-relaxed max-w-xl mx-auto px-4">
                  {photo.description}
                </p>

                {/* Dot navigation */}
                <div
                  className="mt-6 sm:mt-8 flex items-center justify-center gap-1.5"
                  aria-label={`Photo ${selectedIndex + 1} of ${photos.length}`}
                >
                  {photos.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setSelectedIndexFromDot(i) }}
                      aria-label={`Go to photo ${i + 1}`}
                      aria-current={i === selectedIndex ? "true" : undefined}
                      className={[
                        "rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
                        i === selectedIndex ? "w-6 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/25 hover:bg-white/50",
                      ].join(" ")}
                    />
                  ))}
                </div>

                {/* Mobile swipe hint */}
                <p className="sm:hidden mt-4 font-mono text-[9px] tracking-[0.3em] uppercase text-white/25" aria-hidden="true">
                  Swipe to navigate
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )

  // Dot click helper — needs access to the outer setter
  function setSelectedIndexFromDot(i: number) {
    // We pass this via the onNavigate pattern; use absolute jump via closure
    // Since onNavigate only supports prev/next, we loop to the right index
    if (selectedIndex === null) return
    const diff = i - selectedIndex
    const dir = diff > 0 ? "next" : "prev"
    const steps = Math.abs(diff)
    for (let s = 0; s < steps; s++) onNavigate(dir)
  }
}

export default Gallery