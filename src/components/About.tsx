'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Rocket, Users, Award, Download } from 'lucide-react'

export function About() {
    return (
        <section id="about" className="py-24 relative px-4">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="mb-12 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-neon-cyan uppercase tracking-widest text-sm font-bold block mb-2"
                    >
                        Nuestro ADN
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-heading font-bold text-white relative inline-block"
                    >
                        ¿Quiénes Somos?
                        <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-neon-cyan rounded-full shadow-[0_0_10px_var(--color-neon-cyan)]"></span>
                    </motion.h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative group"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan/30 to-electric-blue/30 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
                        <div className="relative h-full min-h-[300px] md:min-h-[400px] bg-gradient-to-br from-deep-black via-deep-black/95 to-neon-cyan/5 rounded-xl border-2 border-neon-cyan/30 overflow-hidden flex flex-col items-center justify-center p-8 text-center shadow-[0_0_50px_rgba(0,243,255,0.1)]">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,243,255,0.08),transparent_70%)]"></div>
                            <div className="absolute inset-0 cyber-grid opacity-30"></div>

                            {/* Decorative corners */}
                            <div className="hidden md:block absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-neon-cyan opacity-60"></div>
                            <div className="hidden md:block absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-neon-cyan opacity-60"></div>
                            <div className="hidden md:block absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-neon-cyan opacity-60"></div>
                            <div className="hidden md:block absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-neon-cyan opacity-60"></div>

                            <div className="z-10 relative">
                                <div className="mb-4 md:mb-6 inline-block p-3 md:p-4 rounded-full bg-neon-cyan/10 border border-neon-cyan/30">
                                    <span className="text-3xl md:text-4xl">⚡</span>
                                </div>
                                <span className="block text-electric-blue font-mono text-xs md:text-sm tracking-widest mb-3 md:mb-4 animate-pulse">EST. 2024</span>
                                <h3 className="text-4xl md:text-6xl font-heading font-bold text-white mb-2 tracking-tight drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
                                    YOUNG<span className="text-neon-cyan">STARS</span>
                                </h3>
                                <span className="text-xl md:text-2xl font-light text-gray-400 tracking-[0.2em] md:tracking-[0.3em] uppercase block mb-6 md:mb-8">Design Studio</span>
                                <div className="flex gap-3 md:gap-4 justify-center">
                                    <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></div>
                                    <div className="w-2 h-2 rounded-full bg-electric-blue animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="w-2 h-2 rounded-full bg-violet animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="space-y-8 pt-4">
                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold text-white">
                                Impulsamos tu marca con <br /><span className="text-neon-cyan">Estrategia y Diseño Digital.</span>
                            </h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                En <strong>YoungStars Design</strong>, nos especializamos en crear identidades visuales impactantes y plataformas web de alto rendimiento. Desde el diseño de <strong>flyers y logotipos</strong> hasta el mantenimiento técnico de tu negocio, nos encargamos de todo para que tú solo te preocupes por vender.
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-3 justify-items-center max-w-md mx-auto">
                            <InfoCard icon={<Rocket className="w-5 h-5" />} title="Branding" subtitle="Identidad" color="neon-cyan" />
                            <InfoCard icon={<Users className="w-5 h-5" />} title="Soporte" subtitle="24/7" color="electric-blue" />
                            <InfoCard icon={<Award className="w-5 h-5" />} title="Calidad" subtitle="Garantizada" color="violet" />
                        </div>

                        <div className="pt-4">
                            <a href="/CV_Hibraim_YoungStars.png" target="_blank" rel="noopener noreferrer">
                                <button className="px-8 py-4 rounded-full font-heading font-bold transition-all relative overflow-hidden bg-white/5 border border-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan hover:shadow-[0_0_30px_rgba(0,243,255,0.2)] flex items-center gap-3 group w-fit hover:scale-105 backdrop-blur-md">
                                    <div className="relative">
                                        <Download className="w-5 h-5 relative z-10 group-hover:text-white transition-colors" />
                                        <div className="absolute inset-0 blur-md bg-neon-cyan/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                    <span className="tracking-wide group-hover:text-white transition-colors">Descargar Credenciales</span>
                                </button>
                            </a>
                        </div>
                    </div>
                </div>

                <TechStack />
            </div>
        </section>
    )
}

function InfoCard({ icon, title, subtitle, color }: { icon: React.ReactNode, title: string, subtitle: string, color: string }) {
    const borderColor = `border-${color}/20`
    const bgColor = `bg-${color}/5`
    const textColor = `text-${color}`

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`glass-card rounded-xl text-white p-3 text-center ${borderColor} ${bgColor} w-full`}
        >
            <div className={`${textColor} mx-auto mb-1 flex justify-center`}>{icon}</div>
            <div className="text-lg font-bold text-white">{title}</div>
            <div className="text-[9px] uppercase text-gray-500 font-bold tracking-wider">{subtitle}</div>
        </motion.div>
    )
}

function TechStack() {
    const techs = [
        { name: "HTML5/CSS3", percent: 90, color: "#e34f26", verified: true },
        { name: "JavaScript", percent: 85, color: "#f7df1e", verified: true },
        { name: "React/Next.js", percent: 80, color: "#61dafb", verified: true },
        { name: "Linux/SysAdmin", percent: 75, color: "#FCC624", verified: true },
        { name: "WordPress", percent: 85, color: "#21759b", verified: true },
        { name: "SEO/Performance", percent: 70, color: "#8a2be2", verified: true },
    ]

    return (
        <div className="mt-20 border-t border-white/5 pt-16">
            <h3 className="text-2xl font-bold text-white mb-10 text-center flex items-center justify-center gap-4">
                <span className="w-10 h-[1px] bg-neon-cyan"></span>
                Nuestro Tech Stack
                <span className="w-10 h-[1px] bg-neon-cyan"></span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {techs.map((tech, index) => (
                    <TechCard key={index} {...tech} />
                ))}
            </div>
        </div>
    )
}

function TechCard({ name, percent, color, verified }: { name: string, percent: number, color: string, verified: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="relative bg-[#050505]/60 backdrop-blur-md rounded-2xl border border-white/5 p-6 overflow-hidden group hover:border-neon-cyan/30 transition-all duration-300 w-full shadow-lg"
        >
            {/* Top Glow Line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent opacity-30 group-hover:opacity-100 transition-opacity"></div>

            <div className="flex items-center gap-6">
                {/* Animated Tech Core */}
                <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
                    {/* Rotating Outer Circle (Restored) */}
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-dashed border-white/30"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Glow Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 opacity-40 blur-xl rounded-full" style={{ background: `radial-gradient(circle, ${color}60 0%, transparent 70%)` }}></div>

                    <svg viewBox="0 0 100 100" className="w-16 h-16 relative z-10" style={{ filter: `drop-shadow(0 0 8px ${color})` }}>
                        {/* Inner Pulsing Hexagon */}
                        <motion.path
                            d="M50 15 L85 32.5 L85 67.5 L50 85 L15 67.5 L15 32.5 Z"
                            fill="none"
                            stroke={color}
                            strokeWidth="3"
                            initial={{ pathLength: 0, opacity: 0.2 }}
                            animate={{
                                pathLength: [0, 1, 0],
                                opacity: [0.4, 1, 0.4],
                                strokeWidth: [2, 4, 2]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />

                        {/* Core Energy */}
                        <motion.circle
                            cx="50" cy="50" r="6"
                            fill={color}
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </svg>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold font-heading text-white mb-2 truncate group-hover:text-neon-cyan transition-colors">{name}</h3>

                    {/* Progress Bar Line */}
                    <div className="relative h-[2px] w-full bg-white/10 rounded-full mb-2 overflow-hidden">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-neon-cyan via-electric-blue to-purple-500"
                            style={{ backgroundColor: color }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${percent}%` }}
                            transition={{ duration: 1.5, delay: 0.2 }}
                        />
                    </div>

                    {/* Verified Label */}
                    {verified && (
                        <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse"></span>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-neon-cyan/70 font-mono">SYS.VERIFIED</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Background Gradient Blob */}
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-neon-cyan/5 rounded-full blur-3xl group-hover:bg-neon-cyan/10 transition-colors pointer-events-none"></div>
        </motion.div>
    )
}
