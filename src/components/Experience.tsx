'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Palette, Settings, PenTool, Image as ImageIcon, ShoppingBag, Megaphone, LifeBuoy, Monitor } from 'lucide-react'

interface ExperienceItemProps {
    title: string
    description: string
    icon: React.ReactNode
    side: 'left' | 'right'
}

export function Experience() {
    const experiences: ExperienceItemProps[] = [
        { title: "Diseño Web", description: "Landing pages profesionales y optimizadas.", icon: <Palette className="w-5 h-5" />, side: "right" },
        { title: "Mantenimiento Web", description: "Optimización, corrección de bugs y SEO técnico.", icon: <Settings className="w-5 h-5" />, side: "left" },
        { title: "Diseño de Logos", description: "Identidad visual y branding profesional.", icon: <PenTool className="w-5 h-5" />, side: "right" },
        { title: "Mockups & Branding", description: "Presentaciones visuales coherentes.", icon: <ImageIcon className="w-5 h-5" />, side: "left" },
        { title: "Tiendas Online", description: "E-commerce en WooCommerce y Shopify.", icon: <ShoppingBag className="w-5 h-5" />, side: "right" },
        { title: "Flyers Publicitarios", description: "Material gráfico promocional.", icon: <Megaphone className="w-5 h-5" />, side: "left" },
        { title: "Soporte Técnico", description: "Mantenimiento de Hardware y Software.", icon: <LifeBuoy className="w-5 h-5" />, side: "right" },
        { title: "Asistencia Remota", description: "Solución de incidencias a distancia.", icon: <Monitor className="w-5 h-5" />, side: "left" },
    ]

    return (
        <section id="experience" className="py-24 bg-black/40 relative px-4 overflow-hidden">
            <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="mb-12 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-neon-cyan uppercase tracking-widest text-sm font-bold block mb-2"
                    >
                        Detalles
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-heading font-bold text-white relative inline-block"
                    >
                        Capacidades
                        <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-neon-cyan rounded-full shadow-[0_0_10px_var(--color-neon-cyan)]"></span>
                    </motion.h2>
                </div>

                <div className="relative border-l-2 border-neon-cyan/20 ml-6 md:ml-1/2 space-y-12">
                    {/* Timeline dots */}
                    <div className="absolute top-0 left-[-6px] md:left-1/2 md:-ml-[6px] w-4 h-4 bg-neon-cyan rounded-full shadow-[0_0_10px_var(--color-neon-cyan)] animate-pulse"></div>
                    <div className="absolute bottom-0 left-[-6px] md:left-1/2 md:-ml-[6px] w-4 h-4 bg-neon-cyan rounded-full shadow-[0_0_10px_var(--color-neon-cyan)] animate-pulse"></div>

                    {experiences.map((exp, index) => (
                        <ExperienceItem key={index} {...exp} />
                    ))}
                </div>
            </div>
        </section>
    )
}


function ExperienceItem({ title, description, icon, side }: ExperienceItemProps) {
    const isRight = side === "right"
    const containerClass = `relative pl-8 md:pl-0 flex flex-col md:flex-row items-center gap-6 ${isRight ? "md:flex-row-reverse md:text-right" : "md:text-left"}`
    const contentClass = `w-full md:w-[calc(50%-2rem)] ${isRight ? "md:pr-8" : "md:pl-8"}`
    const iconWrapper = `flex items-center gap-4 mb-2 ${isRight ? "md:flex-row-reverse" : ""}`

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={containerClass}
        >
            <div className="absolute left-[-5px] md:left-1/2 md:-ml-[5px] w-3 h-3 bg-neon-cyan rounded-full border border-black z-10"></div>
            <div className={contentClass}>
                <div className="p-6 bg-white/5 rounded-xl border border-white/5 hover:border-neon-cyan/40 transition-all hover:bg-white/10 backdrop-blur-sm group hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,243,255,0.05)]">
                    <div className={iconWrapper}>
                        <div className="p-2.5 rounded-lg bg-neon-cyan/10 text-neon-cyan group-hover:bg-neon-cyan group-hover:text-deep-black transition-colors duration-300">
                            {icon}
                        </div>
                        <h3 className="text-lg font-bold text-white group-hover:text-neon-cyan transition-colors">{title}</h3>
                    </div>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300">{description}</p>
                </div>
            </div>
        </motion.div>
    )
}
