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
    description: "A captured moment that speaks to the calm within.",
    width: 1920,
    height: 1080,
  },
  {
    id: 2,
    src: "/photo2.jpg",
    title: "Moment II",
    category: "Photography",
    span: "md:col-span-1",
    description: "Finding beauty in everyday scenes.",
    width: 1080,
    height: 1350,
  },
  {
    id: 3,
    src: "/photo3.jpg",
    title: "Moment III",
    category: "Photography",
    span: "md:col-span-1",
    description: "A glimpse into the stories around us.",
    width: 1080,
    height: 1350,
  },
  {
    id: 5,
    src: "/photo5.jpg",
    title: "Moment V",
    category: "Photography",
    span: "md:col-span-1",
    description: "Through my lens, a different perspective.",
    width: 1080,
    height: 1620,
  },
]

export function Gallery({ detailed = false }: { detailed?: boolean }) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [filter, setFilter] = useState<string>("All")

  const categories = ["All", ...Array.from(new Set(photos.map(p => p.category)))]

  const filteredPhotos = filter === "All"
    ? photos
    : photos.filter(p => p.category === filter)

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
      setSelectedPhoto(selectedPhoto === 0 ? filteredPhotos.length - 1 : selectedPhoto - 1)
    } else {
      setSelectedPhoto(selectedPhoto === filteredPhotos.length - 1 ? 0 : selectedPhoto + 1)
    }
  }

  return (
    <>
      <section id="work" className="px-6 py-20 md:px-12 md:py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6">
            Photography Gallery
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl">
            A curated collection of moments captured through the lens
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 md:mb-16 flex flex-wrap gap-3"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 text-sm tracking-wider uppercase transition-all duration-300 ${filter === cat
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, index) => (
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
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 md:mt-24 text-center text-gray-500 text-sm tracking-widest"
        >
          {filteredPhotos.length} {filteredPhotos.length === 1 ? 'IMAGE' : 'IMAGES'}
        </motion.div>
      </section>

      {/* Lightbox */}
      <Lightbox
        photos={filteredPhotos}
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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -40])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      className={`group cursor-pointer relative ${photo.span}`}
      onClick={onClick}
    >
      <div className="relative overflow-hidden bg-gray-100">
        <motion.div
          style={{ y }}
          className="relative"
        >
          <Image
            src={photo.src || "/placeholder.svg"}
            alt={photo.title}
            width={photo.width}
            height={photo.height}
            quality={100}
            unoptimized={true}
            onLoad={() => setImageLoaded(true)}
            className="w-full h-auto transition-all duration-[2s] group-hover:scale-105 opacity-100"
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
        </motion.div>

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
          <ZoomIn className="w-12 h-12 text-white opacity-80" />
        </div>
      </div>

      <div className="mt-8 flex justify-between items-baseline border-b border-gray-200 pb-4">
        <div className="space-y-1">
          <h3 className="font-serif text-3xl md:text-4xl tracking-tight leading-none">{photo.title}</h3>
          <p className="text-[10px] tracking-[0.3em] uppercase text-gray-500">{photo.category}</p>
        </div>
        <span className="text-[12px] font-serif italic text-gray-500">0{index + 1}</span>
      </div>

      {detailed && <p className="mt-4 text-sm leading-relaxed text-gray-600 max-w-sm">{photo.description}</p>}
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
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={onClose}
        >
          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </motion.button>

          {/* Navigation Buttons */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ delay: 0.2 }}
            onClick={(e) => {
              e.stopPropagation()
              onNavigate('prev')
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: 0.2 }}
            onClick={(e) => {
              e.stopPropagation()
              onNavigate('next')
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </motion.button>

          {/* Image Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                width={selectedPhoto.width}
                height={selectedPhoto.height}
                quality={100}
                unoptimized={true}
                className="max-w-full max-h-[80vh] w-auto h-auto object-contain"
              />
            </div>

            {/* Image Info */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-center space-y-2"
            >
              <h2 className="text-white font-serif text-3xl">{selectedPhoto.title}</h2>
              <p className="text-gray-400 text-sm tracking-wider uppercase">
                {selectedPhoto.category} • {selectedPhoto.width} × {selectedPhoto.height}
              </p>
              <p className="text-gray-300 text-sm max-w-2xl mx-auto mt-3">
                {selectedPhoto.description}
              </p>
              <p className="text-gray-500 text-xs mt-4">
                {selectedIndex + 1} / {photos.length}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Gallery