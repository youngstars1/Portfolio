'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export function WhatsAppButton() {
    return (
        <motion.a
            href="https://wa.me/56920444783"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="fixed bottom-24 right-4 md:bottom-10 md:right-10 z-50 group"
        >
            <div className="relative">
                <span className="absolute -top-2 -right-2 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                </span>
                <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] hover:scale-110 transition-all duration-300">
                    <MessageCircle size={32} fill="white" />
                </div>
            </div>
            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg text-sm text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/5">
                ¡Escríbenos!
            </span>
        </motion.a>
    )
}
