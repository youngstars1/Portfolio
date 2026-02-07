'use client'
import React, { useEffect, useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Check, X, Clock, ArrowLeft, Home, MessageCircle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ParticlesBackground } from '@/components/ParticlesBackground'
import { MouseSpotlight } from '@/components/MouseSpotlight'

type PaymentStatus = 'success' | 'pending' | 'rejected' | 'cancelled' | 'loading' | 'error'

function PaymentResultContent() {
    const searchParams = useSearchParams()
    const [status, setStatus] = useState<PaymentStatus>('loading')
    const [orderNumber, setOrderNumber] = useState<string>('')

    useEffect(() => {
        // Flow redirige con parámetros después del pago
        const token = searchParams.get('token')
        const flowStatus = searchParams.get('status')
        const order = searchParams.get('order')

        if (order) {
            setOrderNumber(order)
        }

        // Determinar estado basado en la respuesta de Flow
        // En producción, deberías verificar el estado con el backend
        if (flowStatus === '2' || flowStatus === 'success') {
            setStatus('success')
        } else if (flowStatus === '1' || flowStatus === 'pending') {
            setStatus('pending')
        } else if (flowStatus === '3' || flowStatus === 'rejected') {
            setStatus('rejected')
        } else if (flowStatus === '4' || flowStatus === 'cancelled') {
            setStatus('cancelled')
        } else {
            // Por defecto mostrar éxito si vienen del flujo normal
            setStatus('success')
        }
    }, [searchParams])

    const statusConfig = {
        loading: {
            icon: Clock,
            title: 'Procesando...',
            description: 'Estamos verificando tu pago.',
            color: 'text-gray-400',
            bgColor: 'bg-gray-500/20',
            borderColor: 'border-gray-500/30'
        },
        success: {
            icon: Check,
            title: '¡Pago Exitoso!',
            description: 'Tu pago ha sido procesado correctamente. Nos pondremos en contacto contigo a la brevedad para comenzar con tu proyecto.',
            color: 'text-green-400',
            bgColor: 'bg-green-500/20',
            borderColor: 'border-green-500/30'
        },
        pending: {
            icon: Clock,
            title: 'Pago Pendiente',
            description: 'Tu pago está siendo procesado. Te notificaremos cuando se complete.',
            color: 'text-yellow-400',
            bgColor: 'bg-yellow-500/20',
            borderColor: 'border-yellow-500/30'
        },
        rejected: {
            icon: X,
            title: 'Pago Rechazado',
            description: 'Lo sentimos, tu pago no pudo ser procesado. Por favor, intenta nuevamente o contacta a tu banco.',
            color: 'text-red-400',
            bgColor: 'bg-red-500/20',
            borderColor: 'border-red-500/30'
        },
        cancelled: {
            icon: X,
            title: 'Pago Cancelado',
            description: 'El pago fue cancelado. Si tienes dudas, no dudes en contactarnos.',
            color: 'text-orange-400',
            bgColor: 'bg-orange-500/20',
            borderColor: 'border-orange-500/30'
        },
        error: {
            icon: X,
            title: 'Error',
            description: 'Ocurrió un error al procesar tu solicitud. Por favor, contacta con soporte.',
            color: 'text-red-400',
            bgColor: 'bg-red-500/20',
            borderColor: 'border-red-500/30'
        }
    }

    const config = statusConfig[status]
    const Icon = config.icon

    return (
        <main className="bg-deep-black min-h-screen text-white selection:bg-neon-cyan/30 selection:text-neon-cyan overflow-hidden">
            <MouseSpotlight />
            <ParticlesBackground />

            {/* Back Button */}
            <div className="fixed top-6 left-6 z-50">
                <Link href="/">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-white/10 hover:border-neon-cyan/50 transition-all group"
                    >
                        <ArrowLeft size={18} className="text-neon-cyan group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Inicio</span>
                    </motion.button>
                </Link>
            </div>

            {/* Content */}
            <section className="min-h-screen flex items-center justify-center px-4 py-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/10 rounded-full blur-[150px] pointer-events-none"></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-lg w-full text-center relative z-10"
                >
                    <div className={`glass-card p-10 rounded-2xl border ${config.borderColor}`}>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', delay: 0.2 }}
                            className={`w-24 h-24 ${config.bgColor} rounded-full flex items-center justify-center mx-auto mb-8`}
                        >
                            <Icon size={48} className={config.color} />
                        </motion.div>

                        <h1 className={`text-3xl font-bold mb-4 ${config.color}`}>
                            {config.title}
                        </h1>

                        <p className="text-gray-400 mb-6">
                            {config.description}
                        </p>

                        {orderNumber && (
                            <div className="bg-white/5 rounded-lg p-4 mb-8">
                                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Número de Orden</p>
                                <p className="text-lg font-mono text-neon-cyan">{orderNumber}</p>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/">
                                <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white hover:border-neon-cyan hover:text-neon-cyan transition-all font-medium w-full sm:w-auto">
                                    <Home size={18} />
                                    Volver al Inicio
                                </button>
                            </Link>
                            <a href="https://wa.me/56920444783" target="_blank" rel="noopener noreferrer">
                                <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-neon-cyan text-deep-black hover:bg-neon-cyan-hover transition-all font-bold shadow-[0_0_20px_rgba(0,243,255,0.4)] w-full sm:w-auto">
                                    <MessageCircle size={18} />
                                    Contactar por WhatsApp
                                </button>
                            </a>
                        </div>

                        {(status === 'rejected' || status === 'cancelled') && (
                            <div className="mt-8 pt-6 border-t border-white/10">
                                <Link href="/solicitar">
                                    <button className="text-neon-cyan hover:underline text-sm">
                                        Intentar nuevamente →
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="absolute bottom-0 left-0 right-0 py-8 text-center text-gray-600 text-sm border-t border-white/5 glass">
                <div className="container mx-auto px-4">
                    <p className="font-heading font-light tracking-widest uppercase">
                        © {new Date().getFullYear()} YoungStars Design
                    </p>
                </div>
            </footer>
        </main>
    )
}

export default function PaymentResult() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-deep-black flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <PaymentResultContent />
        </Suspense>
    )
}
