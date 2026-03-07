"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface RevealProps {
    children: ReactNode
    width?: "fit-content" | "100%"
    delay?: number
    duration?: number
    direction?: "up" | "down" | "left" | "right"
}

export default function Reveal({
    children,
    width = "fit-content",
    delay = 0.2,
    duration = 0.8,
    direction = "up",
}: RevealProps) {
    const getVariants = () => {
        switch (direction) {
            case "up":
                return {
                    hidden: { clipPath: "inset(100% 0% 0% 0%)", y: 20, opacity: 0 },
                    visible: { clipPath: "inset(0% 0% 0% 0%)", y: 0, opacity: 1 },
                }
            case "down":
                return {
                    hidden: { clipPath: "inset(0% 0% 100% 0%)", y: -20, opacity: 0 },
                    visible: { clipPath: "inset(0% 0% 0% 0%)", y: 0, opacity: 1 },
                }
            case "left":
                return {
                    hidden: { clipPath: "inset(0% 0% 0% 100%)", x: 20, opacity: 0 },
                    visible: { clipPath: "inset(0% 0% 0% 0%)", x: 0, opacity: 1 },
                }
            case "right":
                return {
                    hidden: { clipPath: "inset(0% 100% 0% 0%)", x: -20, opacity: 0 },
                    visible: { clipPath: "inset(0% 0% 0% 0%)", x: 0, opacity: 1 },
                }
            default:
                return {
                    hidden: { clipPath: "inset(100% 0% 0% 0%)", y: 20, opacity: 0 },
                    visible: { clipPath: "inset(0% 0% 0% 0%)", y: 0, opacity: 1 },
                }
        }
    }

    return (
        <div style={{ position: "relative", width, overflow: "hidden" }}>
            <motion.div
                variants={getVariants()}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                    duration,
                    delay,
                    ease: [0.16, 1, 0.3, 1], // easeOutExpo
                }}
            >
                {children}
            </motion.div>
        </div>
    )
}
