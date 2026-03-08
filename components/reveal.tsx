"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useMemo, type ReactNode } from "react"

type Direction = "up" | "down" | "left" | "right"

interface RevealProps {
    children: ReactNode
    width?: "fit-content" | "100%"
    delay?: number
    duration?: number
    direction?: Direction
    viewportMargin?: string
    once?: boolean
}

function getVariants(direction: Direction) {
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
                hidden: { clipPath: "inset(0% 100% 0% 0%)", x: 20, opacity: 0 },
                visible: { clipPath: "inset(0% 0% 0% 0%)", x: 0, opacity: 1 },
            }
        case "right":
            return {
                hidden: { clipPath: "inset(0% 0% 0% 100%)", x: -20, opacity: 0 },
                visible: { clipPath: "inset(0% 0% 0% 0%)", x: 0, opacity: 1 },
            }
    }
}

const reducedVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
}

export default function Reveal({
    children,
    width = "fit-content",
    delay = 0.2,
    duration = 0.8,
    direction = "up",
    viewportMargin = "-100px",
    once = true,
}: RevealProps) {
    const shouldReduce = useReducedMotion()
    const variants = useMemo(() => getVariants(direction), [direction])

    return (
        <div style={{ position: "relative", width }}>
            <motion.div
                variants={shouldReduce ? reducedVariants : variants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once, margin: viewportMargin }}
                transition={{
                    duration: shouldReduce ? 0.2 : duration,
                    delay: shouldReduce ? 0 : delay,
                    ease: [0.16, 1, 0.3, 1], // easeOutExpo
                }}
            >
                {children}
            </motion.div>
        </div>
    )
}