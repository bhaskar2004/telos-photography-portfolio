"use client"

import { motion } from "framer-motion"

export function GalleryHeader() {
    return (
        <div className="pt-32 md:pt-48 px-4 sm:px-6 md:px-12">
            <div className="max-w-4xl space-y-4 md:space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl tracking-tighter text-foreground">Collection</h1>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="text-[11px] tracking-[0.5em] uppercase text-muted-foreground">Detailed Archives</p>
                </motion.div>
            </div>
        </div>
    )
}
