'use client'
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Facebook, Instagram, Mail, ChevronDown } from 'lucide-react'
import Image from 'next/image'

export function Hero() {
    const ref = useRef(null)
    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 500], [0, 200])
    const opacity = useTransform(scrollY, [0, 300], [1, 0])

    const textVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const letterVariants = {
        hidden: { opacity: 0, y: 50, rotateX: -90 },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: { type: "spring", damping: 10, stiffness: 100 }
        }
    }

    const name = "HIBRAIM".split("")

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-0 md:pt-20 perspective-1000">
            <div className="absolute inset-0 cyber-grid opacity-30 z-0"></div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-electric-blue/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

            <motion.div
                style={{ y, opacity }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="container mx-auto px-4 z-10 text-center relative"
            >
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="mb-10 relative inline-block group"
                >
                    <div className="relative w-48 h-48 md:w-64 md:h-64 filter drop-shadow-[0_0_20px_rgba(0,243,255,0.3)]">
                        <div className="absolute -inset-4 rounded-full border border-neon-cyan/20 animate-[spin_10s_linear_infinite]"></div>
                        <div className="absolute -inset-2 rounded-full border border-dashed border-white/10 animate-[spin_20s_linear_infinite_reverse]"></div>
                        <div className="absolute inset-0 rounded-full overflow-hidden bg-deep-black border-2 border-neon-cyan shadow-[0_0_30px_rgba(0,243,255,0.15)] flex items-center justify-center relative z-10 group-hover:border-white transition-colors duration-300">
                            <div className="absolute inset-0 bg-neon-cyan/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity z-20"></div>
                            <Image
                                src="/profile.png"
                                alt="Hibraim"
                                width={256}
                                height={256}
                                priority
                                className="w-full h-full object-cover relative z-10 group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                    </div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-deep-black border-2 border-neon-cyan px-4 py-1.5 rounded-full text-xs font-bold text-neon-cyan flex items-center gap-2 shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:scale-110 transition-transform cursor-default">
                        <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse shadow-[0_0_5px_rgba(0,243,255,0.8)]"></span>
                        ONLINE
                    </div>
                </motion.div>

                <div className="mb-6 relative">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading text-white tracking-tight leading-none relative z-10 flex justify-center gap-1 md:gap-2">
                        {name.map((letter, i) => (
                            <motion.span
                                key={i}
                                variants={letterVariants}
                                className="inline-block hover:text-neon-cyan transition-colors duration-300 cursor-default hover:-translate-y-2 transform"
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </h1>
                    <motion.div
                        className="absolute inset-0 bg-neon-cyan/5 blur-3xl -z-10"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>

                <motion.h2
                    variants={textVariants}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-electric-blue text-2xl md:text-4xl font-light tracking-widest uppercase mb-8"
                >
                    Creative Developer
                </motion.h2>

                <motion.p
                    variants={textVariants}
                    className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed px-4"
                >
                    Fusionando <strong className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">Diseño</strong> y <strong className="text-neon-cyan drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">Tecnología</strong> para crear experiencias digitales de alto impacto.
                </motion.p>

                <motion.div
                    variants={textVariants}
                    className="flex justify-center gap-6 mb-12"
                >
                    <SocialLink href="https://www.facebook.com/share/18L672PTJ2/?mibextid=wwXIfr" icon={<Facebook size={24} />} delay={0} />
                    <SocialLink href="https://www.instagram.com/black_.hulk?igsh=MXMxZ2lzMTRkYzdxbA%3D%3D&utm_source=qr" icon={<Instagram size={24} />} delay={0.1} />
                    <SocialLink href="mailto:leriche5555@gmail.com" icon={<Mail size={24} />} delay={0.2} />
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 text-gray-500 flex flex-col items-center gap-2 cursor-pointer hover:text-neon-cyan transition-colors group"
            >
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold group-hover:tracking-[0.4em] transition-all">Scroll</span>
                <ChevronDown size={20} className="animate-bounce" />
            </motion.div>
        </section>
    )
}

function SocialLink({ href, icon, delay }: { href: string; icon: React.ReactNode, delay: number }) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 + delay, type: "spring" }}
            whileHover={{ scale: 1.2, rotate: 10, backgroundColor: "rgba(0, 243, 255, 0.1)" }}
            whileTap={{ scale: 0.9 }}
            className="p-4 bg-white/5 rounded-full text-white hover:text-neon-cyan transition-colors border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_var(--color-neon-cyan)] relative group overflow-hidden"
        >
            <div className="absolute inset-0 bg-neon-cyan/20 scale-0 group-hover:scale-100 transition-transform rounded-full duration-300 origin-center"></div>
            <span className="relative z-10">{icon}</span>
        </motion.a>
    )
}
