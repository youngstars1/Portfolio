'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Zap, MonitorCog, FileText, Check, Calendar, Rocket, Video, Crown, ChartNoAxesColumnIncreasing } from 'lucide-react'

export function Pricing() {
    return (
        <section id="pricing" className="py-24 relative overflow-hidden px-4">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric-blue/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="mb-12 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-neon-cyan uppercase tracking-widest text-sm font-bold block mb-2"
                    >
                        Planes Mensuales
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-heading font-bold text-white relative inline-block"
                    >
                        Elige tu Plan
                        <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-neon-cyan rounded-full shadow-[0_0_10px_var(--color-neon-cyan)]"></span>
                    </motion.h2>
                </div>
                <p className="text-center text-gray-400 mb-12 -mt-8">Todos los precios son mensuales + IVA</p>

                <div className="grid md:grid-cols-3 gap-8 items-start">
                    <PricingCard
                        title="Plan Básico"
                        subtitle="Ideal para emprendimientos"
                        price="89.990"
                        icon={<Zap size={32} />}
                        iconColor="text-electric-blue"
                        features={[

                            { icon: <FileText size={16} />, text: "10 flyers + logo + branding", color: "text-electric-blue" },
                            { icon: <MonitorCog size={16} />, text: "Mantenimiento web básico", color: "text-electric-blue" },
                            { icon: <MonitorCog size={16} />, text: "Soporte técnico básico", color: "text-electric-blue" },
                            { icon: <Calendar size={16} />, text: "Entrega en 5-10 días hábiles", color: "text-electric-blue" },
                        ]}
                        benefits={[
                            "Diseños profesionales listos para redes",
                            "Ahorro de tiempo y esfuerzo",
                            "Comunicación directa sin intermediarios"
                        ]}
                        link="/solicitar?plan=basico"
                        color="electric-blue"
                    />

                    <PricingCard
                        title="Plan Pro"
                        subtitle="Más elegido por los clientes"
                        price="119.990"
                        icon={<Rocket size={32} />}
                        iconColor="text-neon-cyan"
                        features={[
                            { icon: <MonitorCog size={16} />, text: "Diseño Web profesional", color: "text-neon-cyan" },
                            { icon: <FileText size={16} />, text: "15 flyers + logo + branding", color: "text-neon-cyan" },
                            { icon: <MonitorCog size={16} />, text: "Mantenimiento web básico", color: "text-neon-cyan" },
                            { icon: <Video size={16} />, text: "1 video marketing mensual (30s)", color: "text-neon-cyan" },
                            { icon: <MonitorCog size={16} />, text: "Soporte técnico mediano", color: "text-neon-cyan" },
                            { icon: <Calendar size={16} />, text: "Entrega en 7-10 días hábiles", color: "text-neon-cyan" },
                            { icon: <Calendar size={16} />, text: "Reunión mensual de planificación", color: "text-neon-cyan" },
                        ]}
                        benefits={[
                            "Contenido atractivo para redes",
                            "Sitio web siempre actualizado",
                            "Videos cortos con más engagement",
                            "Atención rápida",
                            "Estrategia alineada a objetivos"
                        ]}
                        link="/solicitar?plan=pro"
                        color="neon-cyan"
                        isPopular
                    />

                    <PricingCard
                        title="Plan Premium"
                        subtitle="Para marcas que quieren destacar"
                        price="199.990"
                        icon={<Crown size={32} />}
                        iconColor="text-violet"
                        features={[
                            { icon: <MonitorCog size={16} />, text: "Diseño Web profesional", color: "text-violet" },
                            { icon: <FileText size={16} />, text: "20 flyers + logo + branding", color: "text-violet" },
                            { icon: <FileText size={16} />, text: "Diseños constantes", color: "text-violet" },
                            { icon: <MonitorCog size={16} />, text: "Mantenimiento web completo", color: "text-violet" },
                            { icon: <Video size={16} />, text: "2 videos marketing mensuales (30-60s)", color: "text-violet" },
                            { icon: <MonitorCog size={16} />, text: "Soporte técnico avanzado", color: "text-violet" },
                            { icon: <Calendar size={16} />, text: "Entrega en 15-20 días hábiles", color: "text-violet" },
                            { icon: <Calendar size={16} />, text: "2 reuniones mensuales de estrategia", color: "text-violet" },
                            { icon: <ChartNoAxesColumnIncreasing size={16} />, text: "Reportes de rendimiento mensual", color: "text-violet" },
                        ]}
                        benefits={[
                            "Máxima calidad y cantidad de contenido",
                            "Diseños perfectos sin límite de ajustes",
                            "Web siempre optimizada",
                            "Videos de alta calidad",
                            "Atención inmediata",
                            "Decisiones basadas en datos reales"
                        ]}
                        link="/solicitar?plan=premium"
                        color="violet"
                    />
                </div>
            </div>
        </section>
    )
}

function PricingCard({ title, subtitle, price, icon, iconColor, features, benefits, link, color, isPopular }: any) {
    const borderColor = isPopular ? 'border-neon-cyan' : 'border-white/10 hover:border-white/30'
    const cardClasses = `glass-card p-6 rounded-xl text-white relative flex flex-col h-full transition-all duration-500 hover:-translate-y-4 hover:scale-105 perspective-1000 ${borderColor}`
    const popularClasses = isPopular ? 'shadow-[0_0_30px_rgba(0,243,255,0.15)] scale-100 md:scale-105 z-20 bg-deep-black/80 animate-[pulse-glow_3s_ease-in-out_infinite]' : ''
    const buttonClasses = isPopular
        ? 'bg-neon-cyan text-deep-black hover:bg-neon-cyan-hover shadow-[0_0_15px_rgba(0,243,255,0.5)] hover:shadow-[0_0_25px_rgba(0,243,255,0.8)]'
        : `border border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10`

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`${cardClasses} ${popularClasses}`}
        >
            {isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neon-cyan text-deep-black px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_var(--color-neon-cyan)] flex items-center gap-2 animate-pulse">
                    <Zap size={14} className="fill-current" /> Más Elegido
                </div>
            )}

            <div className="text-center mb-8 pt-4">
                <div className={`mx-auto w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 ${iconColor} border border-white/10 shadow-inner`}>
                    {icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-400 mb-6">{subtitle}</p>
                <div className="text-5xl font-heading font-bold text-white mb-2">
                    <span className="text-2xl font-sans font-normal text-gray-500 mr-1 align-top relative top-4">$</span>{price}
                </div>
                <p className="text-xs text-gray-500 uppercase tracking-widest">/ Mes + IVA</p>
            </div>

            <div className="space-y-8 flex-1">
                <div>
                    <h4 className="text-xs font-bold text-neon-cyan uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Incluye</h4>
                    <ul className="space-y-4">
                        {features.map((feature: any, index: number) => (
                            <li key={index} className="flex items-start gap-3 text-gray-300 text-sm">
                                <span className={`flex-shrink-0 mt-0.5 ${feature.color}`}>{feature.icon}</span>
                                <span>{feature.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Beneficios</h4>
                    <ul className="space-y-2">
                        {benefits.map((benefit: string, index: number) => (
                            <li key={index} className="flex items-start gap-2 text-xs text-gray-400">
                                <Check size={12} className="text-green-400 flex-shrink-0 mt-0.5" />
                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
                <a href={link} className="block w-full">
                    <button className={`px-6 py-3 rounded-md font-heading font-bold transition-all relative overflow-hidden w-full justify-center group ${buttonClasses}`}>
                        Contratar ahora
                    </button>
                </a>
            </div>
        </motion.div>
    )
}
