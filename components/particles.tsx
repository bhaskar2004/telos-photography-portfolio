"use client"

import { useEffect, useRef } from "react"

export default function Particles() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId: number
        let particles: Particle[] = []

        // Configuration
        const particleCount = 50
        const connectionDistance = 150
        const mouseDistance = 200

        let mouse = { x: 0, y: 0 }
        let dpr = 1
        let foregroundColor = "rgba(0, 0, 0, 1)"

        const updateColors = () => {
            const style = getComputedStyle(document.documentElement)
            const foreground = style.getPropertyValue("--foreground").trim()
            // Convert oklch to something canvas can use or just use a fallback
            // Since we use the grain overlay and specific colors, we can derive a safe rgba
            // For simplicity, let's use the actual foreground color if it's rendered by the browser
            // or stick to a simplified theme-aware approach.
            const isDark = document.documentElement.classList.contains("dark")
            foregroundColor = isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"
        }

        class Particle {
            x: number
            y: number
            vx: number
            vy: number
            size: number

            constructor(w: number, h: number) {
                this.x = Math.random() * w
                this.y = Math.random() * h
                this.vx = (Math.random() - 0.5) * 0.4
                this.vy = (Math.random() - 0.5) * 0.4
                this.size = (Math.random() * 2 + 1) * dpr
            }

            update(w: number, h: number) {
                this.x += this.vx
                this.y += this.vy

                if (this.x < 0 || this.x > w) this.vx *= -1
                if (this.y < 0 || this.y > h) this.vy *= -1

                const dx = (mouse.x * dpr) - this.x
                const dy = (mouse.y * dpr) - this.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < mouseDistance * dpr) {
                    const forceDirectionX = dx / distance
                    const forceDirectionY = dy / distance
                    const force = (mouseDistance * dpr - distance) / (mouseDistance * dpr)
                    this.vx += forceDirectionX * force * 0.05
                    this.vy += forceDirectionY * force * 0.05
                }
            }

            draw() {
                if (!ctx) return
                ctx.fillStyle = foregroundColor
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        const init = () => {
            particles = []
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(canvas.width, canvas.height))
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            updateColors()

            particles.forEach(particle => {
                particle.update(canvas.width, canvas.height)
                particle.draw()
            })

            particles.forEach((a, i) => {
                particles.slice(i + 1).forEach(b => {
                    const dx = a.x - b.x
                    const dy = a.y - b.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < connectionDistance * dpr) {
                        const opacity = (1 - distance / (connectionDistance * dpr)) * 0.3
                        const isDark = document.documentElement.classList.contains("dark")
                        ctx.strokeStyle = isDark
                            ? `rgba(255, 255, 255, ${opacity})`
                            : `rgba(0, 0, 0, ${opacity})`
                        ctx.lineWidth = 1 * dpr
                        ctx.beginPath()
                        ctx.moveTo(a.x, a.y)
                        ctx.lineTo(b.x, b.y)
                        ctx.stroke()
                    }
                })
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        const handleResize = () => {
            dpr = window.devicePixelRatio || 1
            canvas.width = window.innerWidth * dpr
            canvas.height = window.innerHeight * dpr
            canvas.style.width = `${window.innerWidth}px`
            canvas.style.height = `${window.innerHeight}px`
            init()
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX
            mouse.y = e.clientY
        }

        window.addEventListener("resize", handleResize)
        window.addEventListener("mousemove", handleMouseMove)

        handleResize()
        animate()

        return () => {
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("mousemove", handleMouseMove)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none hidden md:block"
        />
    )
}