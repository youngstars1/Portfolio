'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Globe, ShoppingCart, Cpu } from 'lucide-react'

export function Services() {
    return (
        <section id="services" className="py-20 relative px-4">
            <div className="absolute inset-0 bg-gradient-to-b from-deep-black to-deep-black/50 z-0"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="mb-16 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-neon-cyan uppercase tracking-widest text-sm font-bold block mb-2"
                    >
                        Lo que hacemos
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-heading font-bold text-white relative inline-block"
                    >
                        Servicios
                        <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-neon-cyan rounded-full shadow-[0_0_10px_var(--color-neon-cyan)]"></span>
                    </motion.h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <ServiceCard
                        icon={<Globe className="w-10 h-10" />}
                        title="Desarrollo Web"
                        description="Creamos sitios web a medida, optimizados para velocidad y SEO. Desde landing pages de alto impacto hasta plataformas corporativas complejas."
                        color="#00f3ff"
                    />
                    <ServiceCard
                        icon={<ShoppingCart className="w-10 h-10" />}
                        title="Tiendas Online"
                        description="Soluciones de E-commerce robustas con WooCommerce o Shopify. Gestión de inventario, pasarelas de pago y diseño enfocado en conversión."
                        color="#fbbf24"
                    />
                    <ServiceCard
                        icon={<Cpu className="w-10 h-10" />}
                        title="Soporte & Sistemas"
                        description="Mantenimiento integral de infraestructura TI. Administración de servidores Linux/Windows, seguridad y optimización de rendimiento."
                        color="#fb7185"
                    />
                </div>
            </div>
        </section>
    )
}

function ServiceCard({ icon, title, description, color }: { icon: React.ReactNode, title: string, description: string, color: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="bg-[#0a0a0a] p-8 rounded-3xl relative overflow-hidden group border transition-all duration-300 h-full flex flex-col justify-start text-left"
            style={{
                borderColor: color,
                boxShadow: `0 0 5px ${color}40, inset 0 0 20px ${color}10`
            }}
        >
            {/* Glow effect on hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${color}, transparent 70%)` }}
            ></div>

            <div className="relative z-10">
                {/* Icon Container */}
                <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 border relative"
                    style={{
                        borderColor: color,
                        color: color,
                        boxShadow: `inset 0 0 15px ${color}40`
                    }}
                >
                    <div className="absolute inset-0 opacity-20" style={{ backgroundColor: color }}></div>
                    <div className="drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] text-white">
                        {/* Render icon with forced white color/light for contrast inside the colored box as per reference */}
                        {icon}
                    </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 font-heading text-white">{title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm font-medium">{description}</p>
            </div>
        </motion.div>
    )
}
