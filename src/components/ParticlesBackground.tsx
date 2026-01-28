'use client'
import React, { useEffect, useRef } from 'react'

export function ParticlesBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let width = canvas.width = window.innerWidth
        let height = canvas.height = window.innerHeight

        const particles: Particle[] = []
        // Adjust particle count based on screen size for performance
        const particleCount = Math.min(Math.floor((width * height) / 10000), 100)

        const mouse = { x: -1000, y: -1000, radius: 150 }

        class Particle {
            x: number
            y: number
            size: number
            speedX: number
            speedY: number
            color: string
            baseX: number
            baseY: number
            density: number

            constructor() {
                this.x = Math.random() * width
                this.y = Math.random() * height
                this.size = Math.random() * 2 + 0.5
                this.speedX = Math.random() * 0.5 - 0.25
                this.speedY = Math.random() * 0.5 - 0.25
                this.color = Math.random() > 0.5 ? '#00f3ff' : '#8a2be2' // Neon cyan or Violet
                this.baseX = this.x
                this.baseY = this.y
                this.density = (Math.random() * 30) + 1
            }

            update() {
                this.x += this.speedX
                this.y += this.speedY

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.speedX *= -1
                if (this.y < 0 || this.y > height) this.speedY *= -1

                // Mouse interaction
                const dx = mouse.x - this.x
                const dy = mouse.y - this.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                // Gentle repulsion/attraction effect or just connection?
                // Let's do a slight repulsion to make it feel alive
                if (distance < mouse.radius) {
                    const forceDirectionX = dx / distance
                    const forceDirectionY = dy / distance
                    const maxDistance = mouse.radius
                    const force = (maxDistance - distance) / maxDistance
                    const directionX = forceDirectionX * force * this.density * 0.5
                    const directionY = forceDirectionY * force * this.density * 0.5

                    this.x -= directionX
                    this.y -= directionY
                } else {
                    // Return to original trajectory smoothly? 
                    // No, just let them float free, the physics is enough
                }
            }

            draw() {
                if (!ctx) return
                ctx.fillStyle = this.color
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.closePath()
                ctx.fill()
            }
        }

        const init = () => {
            particles.length = 0
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle())
            }
        }

        const connect = () => {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x
                    const dy = particles[a].y - particles[b].y
                    const distance = dx * dx + dy * dy

                    if (distance < (width / 7) * (height / 7)) {
                        // Dynamic connection distance
                        const distThreshold = 150 * 150
                        if (distance < distThreshold) {
                            const opacity = 1 - (distance / distThreshold)
                            ctx.strokeStyle = `rgba(0, 243, 255, ${opacity * 0.2})` // Cyan glow lines
                            ctx.lineWidth = 1
                            ctx.beginPath()
                            ctx.moveTo(particles[a].x, particles[a].y)
                            ctx.lineTo(particles[b].x, particles[b].y)
                            ctx.stroke()
                        }
                    }
                }
            }
        }

        // Connect to mouse
        const connectMouse = () => {
            for (let i = 0; i < particles.length; i++) {
                const dx = particles[i].x - mouse.x
                const dy = particles[i].y - mouse.y
                const distance = dx * dx + dy * dy
                if (distance < mouse.radius * mouse.radius) {
                    const opacity = 1 - (distance / (mouse.radius * mouse.radius))
                    ctx.strokeStyle = `rgba(138, 43, 226, ${opacity * 0.4})` // Violet mouse connections
                    ctx.lineWidth = 1
                    ctx.beginPath()
                    ctx.moveTo(particles[i].x, particles[i].y)
                    ctx.lineTo(mouse.x, mouse.y)
                    ctx.stroke()
                }
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height)

            // Subtle slow fade effect for trails? Maybe too heavy. stick to clearRect.

            particles.forEach(p => {
                p.update()
                p.draw()
            })
            connect()
            connectMouse()
            requestAnimationFrame(animate)
        }

        const handleResize = () => {
            width = canvas.width = window.innerWidth
            height = canvas.height = window.innerHeight
            init()
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.x
            mouse.y = e.y
        }

        const handleMouseLeave = () => {
            mouse.x = -1000
            mouse.y = -1000
        }

        window.addEventListener('resize', handleResize)
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseout', handleMouseLeave)

        init()
        animate()

        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseout', handleMouseLeave)
        }
    }, [])

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40 bg-transparent" />
}
