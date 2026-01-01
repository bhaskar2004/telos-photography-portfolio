"use client"

import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const photos = [
  {
    id: 1,
    src: "/minimal-architecture.png",
    title: "Stillness",
    category: "Architecture",
    span: "md:col-span-2",
    description: "A study on the interplay between concrete forms and morning shadows.",
  },
  {
    id: 2,
    src: "/calm-ocean.jpg",
    title: "The Reach",
    category: "Nature",
    span: "md:col-span-1",
    description: "Capturing the infinite horizon where the sky meets the Nordic sea.",
  },
  {
    id: 3,
    src: "/editorial-portrait.jpg",
    title: "Identity",
    category: "Portrait",
    span: "md:col-span-1",
    description: "An exploration of self through minimalist lighting and raw textures.",
  },
  {
    id: 4,
    src: "/minimalist-interior.png",
    title: "Space",
    category: "Interior",
    span: "md:col-span-2",
    description: "The quiet dialogue between negative space and curated functional objects.",
  },
  {
    id: 5,
    src: "/foggy-mountain.jpg",
    title: "Perspective",
    category: "Landscape",
    span: "md:col-span-3",
    description: "Ascending through the mist to find clarity in the high altitudes.",
  },
]

export function Gallery({ detailed = false }: { detailed?: boolean }) {
  return (
    <section id="work" className="px-6 py-32 md:px-12 md:py-64">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 lg:gap-24">
        {photos.map((photo, index) => (
          <GalleryItem key={photo.id} photo={photo} index={index} detailed={detailed} />
        ))}
      </div>
    </section>
  )
}

function GalleryItem({ photo, index, detailed }: { photo: any; index: number; detailed?: boolean }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -40])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1], delay: index * 0.1 }}
      className={`group cursor-pointer relative ${photo.span}`}
    >
      <div className="relative overflow-hidden aspect-[16/10] md:aspect-auto md:h-[600px] bg-secondary">
        <motion.div style={{ y, height: "120%", top: "-10%", position: "relative" }}>
          <Image
            src={photo.src || "/placeholder.svg"}
            alt={photo.title}
            fill
            className="object-cover transition-transform duration-[2s] cubic-bezier group-hover:scale-105"
          />
        </motion.div>

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
          <span className="text-white font-serif text-3xl italic">View Project</span>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-baseline border-b border-border/50 pb-4">
        <div className="space-y-1">
          <h3 className="font-serif text-3xl md:text-4xl tracking-tight leading-none">{photo.title}</h3>
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{photo.category}</p>
        </div>
        <span className="text-[12px] font-serif italic text-muted-foreground">0{index + 1}</span>
      </div>

      {detailed && <p className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-sm">{photo.description}</p>}
    </motion.div>
  )
}
