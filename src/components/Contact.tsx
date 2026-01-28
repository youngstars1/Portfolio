'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, Send } from 'lucide-react'

export function Contact() {
    return (
        <section id="contact" className="py-20 relative px-4">
            <div className="absolute inset-0 cyber-grid opacity-10 z-0"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="mb-12 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-neon-cyan uppercase tracking-widest text-sm font-bold block mb-2"
                    >
                        Hablemos
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-heading font-bold text-white relative inline-block"
                    >
                        Contacto
                        <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-neon-cyan rounded-full shadow-[0_0_10px_var(--color-neon-cyan)]"></span>
                    </motion.h2>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-3xl font-heading font-bold text-white mb-6">
                            Empecemos un proyecto <span className="text-neon-cyan relative inline-block">Juntos<span className="absolute bottom-0 left-0 w-full h-1 bg-neon-cyan shadow-[0_0_10px_var(--color-neon-cyan)]"></span></span>
                        </h3>
                        <p className="text-gray-400 mb-8 max-w-md">Cuéntanos sobre tu idea y te ayudaremos a hacerla realidad con la mejor tecnología y diseño.</p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-full bg-neon-cyan/10 flex items-center justify-center text-neon-cyan border border-neon-cyan/50 group-hover:bg-neon-cyan group-hover:text-deep-black transition-all shadow-[0_0_10px_rgba(0,243,255,0.2)]">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <span className="text-sm text-gray-500 block">Llámanos</span>
                                    <span className="text-white font-bold group-hover:text-neon-cyan transition-colors">+569 2044 4783</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-full bg-neon-cyan/10 flex items-center justify-center text-neon-cyan border border-neon-cyan/50 group-hover:bg-neon-cyan group-hover:text-deep-black transition-all shadow-[0_0_10px_rgba(0,243,255,0.2)]">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <span className="text-sm text-gray-500 block">Escríbenos</span>
                                    <span className="text-white font-bold group-hover:text-neon-cyan transition-colors">leriche5555@gmail.com</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-card rounded-xl text-white p-8 border-neon-cyan/20"
                    >
                        <form className="space-y-6" action="https://formspree.io/f/mbdgernq" method="POST">
                            <div className="relative group">
                                <input type="text" placeholder="Nombre" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:bg-white/10 transition-all" name="name" />
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-neon-cyan transition-all group-focus-within:w-full"></span>
                            </div>
                            <div className="relative group">
                                <input type="email" placeholder="Email" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:bg-white/10 transition-all" name="email" />
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-neon-cyan transition-all group-focus-within:w-full"></span>
                            </div>
                            <div className="relative group">
                                <input type="text" placeholder="Tema" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:bg-white/10 transition-all" name="subject" />
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-neon-cyan transition-all group-focus-within:w-full"></span>
                            </div>
                            <div className="relative group">
                                <textarea name="message" rows={4} placeholder="Mensaje" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:bg-white/10 transition-all resize-none"></textarea>
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-neon-cyan transition-all group-focus-within:w-full"></span>
                            </div>
                            <button className="px-6 py-3 rounded-md font-heading font-bold transition-all relative overflow-hidden bg-neon-cyan text-deep-black hover:bg-neon-cyan-hover shadow-[0_0_15px_rgba(0,243,255,0.5)] hover:shadow-[0_0_25px_rgba(0,243,255,0.8)] w-full flex items-center justify-center gap-2" type="submit">
                                <Send size={18} /> Enviar Mensaje
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
