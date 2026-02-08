'use client'
import React, { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { House, User, Zap, ShoppingCart, Mail } from 'lucide-react'

export function FloatingNav() {
    const { scrollY } = useScroll()
    const [hidden, setHidden] = useState(false)

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0
        if (latest > previous && latest > 150) {
            setHidden(true)
        } else {
            setHidden(false)
        }
    })

    return (
        <motion.div
            variants={{
                visible: { y: 0, opacity: 1 },
                hidden: { y: 100, opacity: 0 }
            }}
            initial="hidden"
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed bottom-0 md:bottom-auto md:top-6 inset-x-0 mx-auto w-full md:max-w-fit z-50 pointer-events-auto"
        >
            <div className="relative flex items-center justify-center md:justify-start gap-1 p-2 md:rounded-full border-t md:border border-white/10 bg-deep-black/60 backdrop-blur-2xl shadow-[0_-5px_30px_rgba(0,0,0,0.5)] md:shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent"></div>
                <NavItem href="#home" icon={<House size={20} />} label="Home" />
                <NavItem href="#about" icon={<User size={24} />} label="About" />
                <NavItem href="#services" icon={<Zap size={24} />} label="Services" />
                <NavItem href="#pricing" icon={<ShoppingCart size={24} />} label="Contratar" />
                <NavItem href="#contact" icon={<Mail size={24} />} label="Contact" />
            </div>
        </motion.div>
    )
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <a href={href} className="relative group px-4 py-3 rounded-full hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
            <span className="relative z-10 text-sm font-medium text-gray-400 group-hover:text-white transition-colors flex items-center gap-2">
                <span className="group-hover:text-neon-cyan transition-colors">{icon}</span>
                <span className="hidden sm:inline">{label}</span>
            </span>
        </a>
    )
}
