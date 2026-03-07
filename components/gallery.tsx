"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect, useCallback, type KeyboardEvent } from "react"
import { X, ZoomIn, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Photo {
  id: number
  src: string
  title: string
  category: string
  span: string
  description: string
  width: number
  height: number
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const photos: Photo[] = [
  {
    id: 1,
    src: "/photo1.jpg",
    title: "Misty Highlands - Nature Photography",
    category: "Landscape",
    span: "md:col-span-2",
    description: "Atmospheric landscape photography of misty hills and lush green forests, capturing the raw beauty of mountainous wilderness.",
    width: 1920,
    height: 1080,
  },
  {
    id: 2,
    src: "/photo2.jpg",
    title: "Urban Skyline - Minimalist Sunset",
    category: "Architecture",
    span: "md:col-span-1",
    description: "Minimalist urban sunset photography featuring power lines framing a glowing sun against a deep blue sky in Bengaluru.",
    width: 1080,
    height: 1350,
  },
  {
    id: 3,
    src: "/photo3.jpg",
    title: "Golden Hour Lake - Fine Art Landscape",
    category: "Landscape",
    span: "md:col-span-1",
    description: "Serene lakeside landscape at golden hour, with distant mountains reflecting in the calm water of a mountain lake.",
    width: 1080,
    height: 1350,
  },
  {
    id: 4,
    src: "/photo4.jpg",
    title: "Dusk Silhouette - Tropical Minimalist",
    category: "Editorial",
    span: "md:col-span-1",
    description: "Monochrome editorial photography of palm trees silhouetted against a dramatic tropical sky at dusk.",
    width: 1080,
    height: 1440,
  },
  {
    id: 5,
    src: "/photo5.jpg",
    title: "Eternal Rose - Fine Art Monochrome",
    category: "Still Life",
    span: "md:col-span-1",
    description: "Dramatic fine-art monochrome photography of a backlit rose, highlighting the delicate petals against a moody sky.",
    width: 1080,
    height: 1620,
  },
  {
    id: 6,
    src: "/photo6.jpg",
    title: "Twilight Branches - Natural Forms",
    category: "Landscape",
    span: "md:col-span-2",
    description: "Abstract natural form photography featuring stark tree branches silhouetted against the fading twilight sky in monochrome.",
    width: 1920,
    height: 1080,
  },
  {
    id: 7,
    src: "/photo7.jpg",
    title: "Village Oasis - Rural Life",
    category: "Documentary",
    span: "md:col-span-1",
    description: "Documentary photography of crystal-clear water gushing into a village pond, set against a backdrop of vibrant green rice fields in rural India.",
    width: 1080,
    height: 1350,
  },
  {
    id: 9,
    src: "/photo9.jpg",
    title: "Nature's Geometry - Fern Study",
    category: "Macro",
    span: "md:col-span-1",
    description: "Detailed macro photography of intricate fern fronds, showcasing the delicate organic patterns and vibrant emerald hues of nature.",
    width: 1080,
    height: 1350,
  },
  {
    id: 10,
    src: "/photo10.jpg",
    title: "Evergreen Depth - Forest Texture",
    category: "Macro",
    span: "md:col-span-1",
    description: "Abstract close-up of dense evergreen foliage, capturing the rich textures and deep shadows of a coniferous forest.",
    width: 1080,
    height: 1440,
  },
]

// ─── Easing ───────────────────────────────────────────────────────────────────

const EASE_EXPO = [0.16, 1, 0.3, 1] as const
const EASE_SPRING = [0.34, 1.56, 0.64, 1] as const

// ─── Gallery ──────────────────────────────────────────────────────────────────

interface GalleryProps {
  detailed?: boolean
  limit?: number
}

export function Gallery({ detailed = false, limit }: GalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [filter, setFilter] = useState<string>("All")

  // Derive unique categories once; memo would help but photos is static
  const categories = ["All", ...Array.from(new Set(photos.map((p) => p.category)))]

  const filteredPhotos = filter === "All" ? photos : photos.filter((p) => p.category === filter)
  const displayedPhotos = limit ? filteredPhotos.slice(0, limit) : filteredPhotos

  // Stable callbacks so child components don't get unnecessary re-renders
  const openLightbox = useCallback((index: number) => {
    setSelectedPhoto(index)
    document.body.style.overflow = "hidden"
  }, [])

  const closeLightbox = useCallback(() => {
    setSelectedPhoto(null)
    document.body.style.overflow = ""
  }, [])

  const navigatePhoto = useCallback(
    (direction: "prev" | "next") => {
      setSelectedPhoto((prev) => {
        if (prev === null) return null
        if (direction === "prev") return prev === 0 ? displayedPhotos.length - 1 : prev - 1
        return prev === displayedPhotos.length - 1 ? 0 : prev + 1
      })
    },
    [displayedPhotos.length]
  )

  // Restore scroll if component unmounts while lightbox is open
  useEffect(() => {
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <>
      <section id="work" aria-label="Photography gallery" className="grain px-4 sm:px-6 py-16 sm:py-20 md:px-12 md:py-32 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: EASE_EXPO }}
          className="mb-12 sm:mb-16 md:mb-24"
        >
          {/* Use h1 only when this is the page's primary heading; h2 otherwise */}
          <h2 className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight mb-4 sm:mb-6 text-foreground">
            Photography Gallery
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed">
            A curated collection of moments captured through the lens
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.1, ease: EASE_EXPO }}
          className="mb-10 sm:mb-12 md:mb-16"
        >
          {/* role="group" + aria-label groups the filter buttons semantically */}
          <div
            role="group"
            aria-label="Filter by category"
            className="flex overflow-x-auto gap-2 sm:gap-3 pb-2 scrollbar-hide"
          >
            {categories.map((cat, idx) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.05, ease: EASE_EXPO }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setFilter(cat)}
                aria-pressed={filter === cat}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 text-[10px] sm:text-sm tracking-[0.2em] uppercase transition-all duration-500 whitespace-nowrap flex-shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${filter === cat
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-secondary text-secondary-foreground hover:bg-border hover:shadow-md"
                  }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Masonry Gallery Grid */}
        <motion.div
          layout
          transition={{ layout: { duration: 0.6, ease: EASE_EXPO } }}
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 md:gap-8 block w-full"
        >
          <AnimatePresence mode="popLayout">
            {displayedPhotos.map((photo, index) => (
              <GalleryItem
                key={photo.id}
                photo={photo}
                index={index}
                detailed={detailed}
                onClick={() => openLightbox(index)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Image Counter */}
        <motion.p
          aria-live="polite"
          aria-atomic="true"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: EASE_EXPO }}
          className="mt-12 sm:mt-16 md:mt-24 text-center text-muted-foreground text-xs sm:text-sm tracking-[0.3em] uppercase"
        >
          {displayedPhotos.length} {displayedPhotos.length === 1 ? "Image" : "Images"}
        </motion.p>

        <div className="flex justify-center mt-12 md:mt-16">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90 transition-all hover:gap-4 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            View Full Gallery
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <Lightbox
        photos={displayedPhotos}
        selectedIndex={selectedPhoto}
        onClose={closeLightbox}
        onNavigate={navigatePhoto}
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
  const ref = useRef<HTMLDivElement>(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  // Allow keyboard activation (Enter / Space) for the card
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onClick?.()
    }
  }

  // Zero-pad index up to 2 digits. Works correctly for index ≥ 9 (avoids "010").
  const displayIndex = String(index + 1).padStart(2, "0")

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 1, delay: index * 0.05, ease: EASE_EXPO }}
      animate={{
        y: [0, -4, 0],
        transition: {
          duration: 4 + (index % 3),
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      whileHover={{ y: -10, transition: { duration: 0.4, ease: EASE_EXPO } }}
      className="break-inside-avoid mb-4 sm:mb-6 md:mb-8 group cursor-pointer relative bg-card shadow-lg hover:shadow-2xl transition-shadow duration-500 rounded-sm overflow-hidden inline-block w-full"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // Accessibility: make the card a focusable, keyboard-operable button-like element
      role="button"
      tabIndex={0}
      aria-label={`Open ${photo.title} in lightbox`}
      onKeyDown={handleKeyDown}
    >
      <div className="relative overflow-hidden bg-muted/30">
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted shimmer" aria-hidden="true" />
        )}

        <motion.div style={{ y }} className="relative w-full">
          <Image
            src={photo.src || "/placeholder.svg"}
            alt={photo.description}
            width={photo.width}
            height={photo.height}
            quality={90}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onLoad={() => setImageLoaded(true)}
            loading={index < 2 ? "eager" : "lazy"}
            priority={index < 2}
            className={`w-full h-auto transition-all duration-[1200ms] ease-out group-hover:scale-[1.08] ${imageLoaded ? "opacity-100" : "opacity-0"
              }`}
          />
        </motion.div>

        {/* Hover overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.6, ease: EASE_EXPO }}
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: EASE_SPRING }}
          >
            <div className="glass p-3 sm:p-4 rounded-full">
              <ZoomIn className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-4 sm:p-6 md:p-8 bg-card">
        <div className="flex justify-between items-baseline border-b border-border pb-3 sm:pb-4">
          <div className="space-y-1 sm:space-y-2">
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl tracking-tight leading-none text-card-foreground">
              {photo.title}
            </h3>
            <p className="text-[8px] sm:text-[9px] tracking-[0.3em] uppercase text-muted-foreground">
              {photo.category}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="text-[10px] sm:text-[11px] font-serif italic text-muted-foreground/60"
          >
            {displayIndex}
          </span>
        </div>

        {detailed && (
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
            {photo.description}
          </p>
        )}
      </div>
    </motion.div>
  )
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

interface LightboxProps {
  photos: Photo[]
  selectedIndex: number | null
  onClose: () => void
  onNavigate: (direction: "prev" | "next") => void
}

const MIN_SWIPE_DISTANCE = 50

function Lightbox({ photos, selectedIndex, onClose, onNavigate }: LightboxProps) {
  const selectedPhoto = selectedIndex !== null ? photos[selectedIndex] : null
  const touchStartX = useRef<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Touch state kept in refs to avoid re-renders mid-swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const distance = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(distance) >= MIN_SWIPE_DISTANCE) {
      onNavigate(distance > 0 ? "next" : "prev")
    }
    touchStartX.current = null
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (selectedIndex === null) return
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onNavigate("prev")
      if (e.key === "ArrowRight") onNavigate("next")
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedIndex, onClose, onNavigate])

  // Trap focus inside the dialog when open
  useEffect(() => {
    if (selectedIndex !== null) {
      closeButtonRef.current?.focus()
    }
  }, [selectedIndex])

  if (!selectedPhoto) return null

  return (
    <AnimatePresence>
      {selectedIndex !== null && (
        /* role="dialog" + aria-modal tells screen readers this is a modal */
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Lightbox: ${selectedPhoto.title}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_EXPO }}
          className="fixed inset-0 z-[110] bg-[oklch(0_0_0_/_0.96)] backdrop-blur-md flex items-center justify-center grain"
          onClick={onClose}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close */}
          <motion.button
            ref={closeButtonRef}
            initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
            transition={{ duration: 0.4, delay: 0.2, ease: EASE_SPRING }}
            whileHover={{ scale: 1.1, rotate: 90, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            aria-label="Close lightbox"
            className="absolute top-4 sm:top-6 right-4 sm:right-6 z-[120] p-3 sm:p-4 glass-dark rounded-full hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
          </motion.button>

          {/* Prev */}
          <motion.button
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, delay: 0.2, ease: EASE_EXPO }}
            whileHover={{ scale: 1.1, x: -5, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.stopPropagation(); onNavigate("prev") }}
            aria-label="Previous photo"
            className="hidden sm:flex absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-[120] p-3 sm:p-4 glass-dark rounded-full hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
          </motion.button>

          {/* Next */}
          <motion.button
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.4, delay: 0.2, ease: EASE_EXPO }}
            whileHover={{ scale: 1.1, x: 5, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.stopPropagation(); onNavigate("next") }}
            aria-label="Next photo"
            className="hidden sm:flex absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-[120] p-3 sm:p-4 glass-dark rounded-full hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
          </motion.button>

          {/* Image Container */}
          <motion.div
            key={selectedIndex}
            initial={{ scale: 0.85, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 40 }}
            transition={{ duration: 0.6, ease: EASE_EXPO }}
            className="relative w-full max-w-[90vw] sm:max-w-[85vw] max-h-[85vh] sm:max-h-[75vh] flex flex-col items-center justify-center px-4 sm:px-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full flex items-center justify-center">
              <div className="relative overflow-hidden rounded-sm shadow-2xl w-full">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.description}
                  width={selectedPhoto.width}
                  height={selectedPhoto.height}
                  quality={90}
                  priority // lightbox image should load immediately
                  className="max-w-full max-h-[55vh] sm:max-h-[70vh] w-auto h-auto object-contain mx-auto"
                />
              </div>
            </div>

            {/* Caption */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE_EXPO }}
              className="mt-6 sm:mt-8 text-center space-y-2 sm:space-y-3 max-w-3xl px-4"
            >
              <h2 className="text-white font-serif text-2xl sm:text-3xl md:text-4xl tracking-tight">
                {selectedPhoto.title}
              </h2>

              <p className="text-white/60 text-xs sm:text-sm tracking-[0.2em] uppercase">
                {selectedPhoto.category} &bull; {selectedPhoto.width} &times; {selectedPhoto.height}
              </p>

              <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto pt-2">
                {selectedPhoto.description}
              </p>

              {/* Counter */}
              <div className="pt-3 sm:pt-4 flex items-center justify-center gap-2" aria-live="polite">
                <div className="h-px w-8 sm:w-12 bg-white/20" aria-hidden="true" />
                <p className="text-white/40 text-xs tracking-wider">
                  <span className="sr-only">Photo </span>
                  {selectedIndex + 1} / {photos.length}
                </p>
                <div className="h-px w-8 sm:w-12 bg-white/20" aria-hidden="true" />
              </div>
            </motion.div>

            {/* Mobile swipe hint */}
            <p className="sm:hidden mt-4 text-white/40 text-xs tracking-wider" aria-hidden="true">
              Swipe to navigate
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Gallery