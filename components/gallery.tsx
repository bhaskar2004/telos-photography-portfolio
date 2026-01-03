"use client"

import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react"

const photos = [
  {
    id: 1,
    src: "/photo1.jpg",
    title: "Moment I",
    category: "Photography",
    span: "md:col-span-2",
    description: "I ventured into misty hills shrouded in fog, overlooking lush green forests that whisper wilderness secrets.",
    width: 1920,
    height: 1080,
  },
  {
    id: 2,
    src: "/photo2.jpg",
    title: "Moment II",
    category: "Photography",
    span: "md:col-span-1",
    description: "I captured this vibrant blue sky pierced by sunlight, with power lines framing the glowing sun amid scattered clouds.",
    width: 1080,
    height: 1350,
  },
  {
    id: 3,
    src: "/photo3.jpg",
    title: "Moment III",
    category: "Photography",
    span: "md:col-span-1",
    description: "At sunset, I photographed a serene lake reflecting distant mountains bathed in golden light.",
    width: 1080,
    height: 1350,
  },
  {
    id: 4,
    src: "/photo4.jpg",
    title: "Moment IV",
    category: "Photography",
    span: "md:col-span-1",
    description: "Through my lens, palm trees stand tall at dusk under brooding clouds, evoking tropical tension in monochrome.",
    width: 1080,
    height: 1440,
  },
  {
    id: 5,
    src: "/photo5.jpg",
    title: "Moment V",
    category: "Photography",
    span: "md:col-span-1",
    description: "My take on a backlit rose silhouette in black and white, petals glowing against a cloudy sky for dramatic elegance.",
    width: 1080,
    height: 1620,
  },
  {
    id: 6,
    src: "/photo6.jpg",
    title: "Moment VI",
    category: "Photography",
    span: "md:col-span-2",
    description: "I silhouetted dark tree branches against a fading twilight sky in black and white, highlighting stark natural forms.",
    width: 1920,
    height: 1080,
  },
  {
    id: 7,
    src: "/photo7.jpg",
    title: "Moment VII",
    category: "Photography",
    span: "md:col-span-1",
    description: "My shot of crystal-clear water gushing from a pipe into a village pond, surrounded by rice fields under a blue sky.",
    width: 1080,
    height: 1350,
  },
  {
    id: 9,
    src: "/photo9.jpg",
    title: "Moment IX",
    category: "Photography",
    span: "md:col-span-1",
    description: "I framed the intricate fronds of vibrant green ferns up close, celebrating nature's delicate patterns.",
    width: 1080,
    height: 1350,
  },
  {
    id: 10,
    src: "/photo10.jpg",
    title: "Moment X",
    category: "Photography",
    span: "md:col-span-1",
    description: "My close-up of dense evergreen foliage, revealing the lush depth of a conifer cluster.",
    width: 1080,
    height: 1440,
  },
]

export function Gallery({ detailed = false, limit }: { detailed?: boolean; limit?: number }) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [filter, setFilter] = useState<string>("All")

  const categories = ["All", ...Array.from(new Set(photos.map(p => p.category)))]

  const filteredPhotos = filter === "All"
    ? photos
    : photos.filter(p => p.category === filter)

  const displayedPhotos = limit ? filteredPhotos.slice(0, limit) : filteredPhotos

  const openLightbox = (index: number) => {
    setSelectedPhoto(index)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setSelectedPhoto(null)
    document.body.style.overflow = 'unset'
  }

  const navigatePhoto = (direction: 'prev' | 'next') => {
    if (selectedPhoto === null) return

    if (direction === 'prev') {
      setSelectedPhoto(selectedPhoto === 0 ? displayedPhotos.length - 1 : selectedPhoto - 1)
    } else {
      setSelectedPhoto(selectedPhoto === displayedPhotos.length - 1 ? 0 : selectedPhoto + 1)
    }
  }

  return (
    <>
      <section id="work" className="grain px-4 sm:px-6 py-16 sm:py-20 md:px-12 md:py-32 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="mb-12 sm:mb-16 md:mb-24"
        >
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight mb-4 sm:mb-6 text-foreground">
            Photography Gallery
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed">
            A curated collection of moments captured through the lens
          </p>
        </motion.div>

        {/* Filter Bar - Horizontal scroll on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 1.2,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="mb-10 sm:mb-12 md:mb-16"
        >
          <div className="flex overflow-x-auto gap-2 sm:gap-3 pb-2 scrollbar-hide">
            {categories.map((cat, idx) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: idx * 0.05,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setFilter(cat)}
                className={`magnetic px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-500 ease-out-expo whitespace-nowrap flex-shrink-0 ${filter === cat
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-secondary text-secondary-foreground hover:bg-border hover:shadow-md'
                  }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid with better spacing */}
        <motion.div
          layout
          transition={{
            layout: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
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
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="mt-12 sm:mt-16 md:mt-24 text-center text-muted-foreground text-xs sm:text-sm tracking-[0.3em] uppercase"
        >
          {displayedPhotos.length} {displayedPhotos.length === 1 ? 'Image' : 'Images'}
        </motion.div>
      </section>

      {/* Lightbox */}
      <Lightbox
        photos={displayedPhotos}
        selectedIndex={selectedPhoto}
        onClose={closeLightbox}
        onNavigate={navigatePhoto}
      />
    </>
  )
}

function GalleryItem({ photo, index, detailed, onClick }: { photo: any; index: number; detailed?: boolean; onClick?: () => void }) {
  const ref = useRef(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 1,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={{
        y: -6,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
      }}
      className="group cursor-pointer relative bg-card shadow-md hover:shadow-2xl transition-shadow duration-500 gpu-accelerated rounded-sm overflow-hidden"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden bg-muted/30">
        {/* Loading skeleton with shimmer */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted shimmer" />
        )}

        <motion.div
          style={{ y }}
          className="relative w-full"
        >
          <Image
            src={photo.src || "/placeholder.svg"}
            alt={photo.title}
            width={photo.width}
            height={photo.height}
            quality={100}
            unoptimized={true}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
            className={`w-full h-auto transition-all duration-[1.2s] ease-out-expo group-hover:scale-[1.08] ${imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
          />
        </motion.div>

        {/* Overlay with smooth gradient */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: isHovered ? 1 : 0.8,
              opacity: isHovered ? 1 : 0
            }}
            transition={{
              duration: 0.4,
              delay: 0.1,
              ease: [0.34, 1.56, 0.64, 1]
            }}
          >
            <div className="glass p-3 sm:p-4 rounded-full">
              <ZoomIn className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Info section with premium styling */}
      <div className="p-4 sm:p-6 md:p-8 bg-card">
        <div className="flex justify-between items-baseline border-b border-border pb-3 sm:pb-4">
          <div className="space-y-1 sm:space-y-2">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-xl sm:text-2xl md:text-3xl tracking-tight leading-none text-card-foreground"
            >
              {photo.title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[8px] sm:text-[9px] tracking-[0.3em] uppercase text-muted-foreground"
            >
              {photo.category}
            </motion.p>
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[10px] sm:text-[11px] font-serif italic text-muted-foreground/60"
          >
            0{index + 1}
          </motion.span>
        </div>

        {detailed && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground"
          >
            {photo.description}
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}

function Lightbox({
  photos,
  selectedIndex,
  onClose,
  onNavigate
}: {
  photos: any[]
  selectedIndex: number | null
  onClose: () => void
  onNavigate: (direction: 'prev' | 'next') => void
}) {
  const selectedPhoto = selectedIndex !== null ? photos[selectedIndex] : null
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      onNavigate('next')
    }
    if (isRightSwipe) {
      onNavigate('prev')
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return

      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onNavigate('prev')
      if (e.key === 'ArrowRight') onNavigate('next')
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, onClose, onNavigate])

  if (!selectedPhoto) return null

  return (
    <AnimatePresence>
      {selectedIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="fixed inset-0 z-50 bg-black/96 backdrop-blur-md flex items-center justify-center grain"
          onClick={onClose}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
            transition={{
              duration: 0.4,
              delay: 0.2,
              ease: [0.34, 1.56, 0.64, 1]
            }}
            whileHover={{
              scale: 1.1,
              rotate: 90,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 z-50 p-3 sm:p-4 glass-dark rounded-full transition-all duration-300 hover:shadow-xl magnetic"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </motion.button>

          {/* Navigation Buttons - Hidden on mobile */}
          <motion.button
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{
              duration: 0.4,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1]
            }}
            whileHover={{
              scale: 1.1,
              x: -5,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation()
              onNavigate('prev')
            }}
            className="hidden sm:flex absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-50 p-3 sm:p-4 glass-dark rounded-full transition-all duration-300 hover:shadow-xl magnetic"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{
              duration: 0.4,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1]
            }}
            whileHover={{
              scale: 1.1,
              x: 5,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation()
              onNavigate('next')
            }}
            className="hidden sm:flex absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 p-3 sm:p-4 glass-dark rounded-full transition-all duration-300 hover:shadow-xl magnetic"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </motion.button>

          {/* Image Container */}
          <motion.div
            key={selectedIndex}
            initial={{ scale: 0.85, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 40 }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="relative w-full max-w-[90vw] sm:max-w-[85vw] max-h-[85vh] sm:max-h-[75vh] flex flex-col items-center justify-center px-4 sm:px-0 gpu-accelerated"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="relative w-full flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative overflow-hidden rounded-sm shadow-2xl w-full">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  width={selectedPhoto.width}
                  height={selectedPhoto.height}
                  quality={100}
                  unoptimized={true}
                  className="max-w-full max-h-[55vh] sm:max-h-[70vh] w-auto h-auto object-contain mx-auto"
                />
              </div>
            </motion.div>

            {/* Image Info */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="mt-6 sm:mt-8 text-center space-y-2 sm:space-y-3 max-w-3xl px-4"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-white font-serif text-2xl sm:text-3xl md:text-4xl tracking-tight"
              >
                {selectedPhoto.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-gray-400 text-xs sm:text-sm tracking-[0.2em] uppercase"
              >
                {selectedPhoto.category} • {selectedPhoto.width} × {selectedPhoto.height}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto pt-2"
              >
                {selectedPhoto.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="pt-3 sm:pt-4 flex items-center justify-center gap-2"
              >
                <div className="h-px w-8 sm:w-12 bg-gray-600"></div>
                <p className="text-gray-500 text-xs tracking-wider">
                  {selectedIndex + 1} / {photos.length}
                </p>
                <div className="h-px w-8 sm:w-12 bg-gray-600"></div>
              </motion.div>
            </motion.div>

            {/* Mobile swipe indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="sm:hidden mt-4 text-gray-500 text-xs tracking-wider"
            >
              Swipe to navigate
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Gallery