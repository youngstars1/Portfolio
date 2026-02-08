'use client'
import React, { useState, useEffect, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronRight, ChevronLeft, Zap, Rocket, Crown, User, Mail, Phone, MessageSquare, Send, Sparkles, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ParticlesBackground } from '@/components/ParticlesBackground'
import { MouseSpotlight } from '@/components/MouseSpotlight'

const plans = [
    {
        id: 'basico',
        title: 'Plan Básico',
        subtitle: 'Ideal para emprendimientos',
        price: '89.990',
        icon: Zap,
        color: 'electric-blue',
        colorHex: '#0066ff',
        features: [
            '10 flyers + logo + branding',
            'Mantenimiento web básico',
            'Soporte técnico básico',
            'Entrega en 5-10 días hábiles',
        ]
    },
    {
        id: 'pro',
        title: 'Plan Pro',
        subtitle: 'Más elegido por los clientes',
        price: '119.990',
        icon: Rocket,
        color: 'neon-cyan',
        colorHex: '#00f3ff',
        isPopular: true,
        features: [
            'Diseño Web profesional',
            '15 flyers + logo + branding',
            'Mantenimiento web básico',
            '1 video marketing mensual (30s)',
            'Soporte técnico mediano',
            'Entrega en 7-10 días hábiles',
            'Reunión mensual de planificación',
        ]
    },
    {
        id: 'premium',
        title: 'Plan Premium',
        subtitle: 'Para marcas que quieren destacar',
        price: '199.990',
        icon: Crown,
        color: 'violet',
        colorHex: '#8a2be2',
        features: [
            'Diseño Web profesional',
            '20 flyers + logo + branding',
            'Diseños constantes',
            'Mantenimiento web completo',
            '2 videos marketing mensuales',
            'Soporte técnico avanzado',
            'Entrega en 15-20 días hábiles',
            '2 reuniones mensuales de estrategia',
            'Reportes de rendimiento mensual',
        ]
    }
]

const steps = [
    { id: 1, title: 'Selecciona tu Plan', icon: Sparkles },
    { id: 2, title: 'Tus Datos', icon: User },
    { id: 3, title: 'Confirmación', icon: Check },
]

function SolicitarServicioContent() {
    const searchParams = useSearchParams()
    const [currentStep, setCurrentStep] = useState(1)
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [paymentError, setPaymentError] = useState<string | null>(null)

    useEffect(() => {
        window.scrollTo(0, 0)

        // Leer plan desde URL query params
        const planFromUrl = searchParams.get('plan')
        if (planFromUrl && ['basico', 'pro', 'premium'].includes(planFromUrl)) {
            setSelectedPlan(planFromUrl)
            // Si viene un plan preseleccionado, ir directo al paso 2
            setCurrentStep(2)
        }
    }, [searchParams])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const nextStep = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1)
    }

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1)
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)
        setPaymentError(null)

        try {
            const response = await fetch('/api/flow/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    planId: selectedPlan,
                    customerEmail: formData.email,
                    customerName: formData.nombre,
                    customerPhone: formData.telefono,
                    message: formData.mensaje
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Error al procesar el pago')
            }

            // Redirigir a Flow para completar el pago
            if (data.paymentUrl) {
                window.location.href = data.paymentUrl
            } else {
                throw new Error('No se recibió la URL de pago')
            }
        } catch (error) {
            console.error('Error creating payment:', error)
            setPaymentError(error instanceof Error ? error.message : 'Ocurrió un error al procesar tu solicitud')
            setIsSubmitting(false)
        }
    }

    const selectedPlanData = plans.find(p => p.id === selectedPlan)

    const canProceed = () => {
        if (currentStep === 1) return selectedPlan !== null
        if (currentStep === 2) return formData.nombre && formData.email && formData.telefono
        return true
    }

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
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Volver</span>
                    </motion.button>
                </Link>
            </div>

            {/* Hero Header */}
            <section className="pt-28 pb-12 relative">
                <div className="absolute inset-0 cyber-grid opacity-30"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/10 rounded-full blur-[150px] pointer-events-none"></div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-neon-cyan uppercase tracking-widest text-sm font-bold mb-4 block">
                            Solicitar Servicio
                        </span>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
                            Comienza tu Proyecto
                        </h1>
                        <p className="text-gray-400 max-w-xl mx-auto">
                            Selecciona el plan que mejor se adapte a tus necesidades y completa tus datos para comenzar.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Progress Steps */}
            <section className="pb-8 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center items-center gap-4 md:gap-8">
                        {steps.map((step, index) => {
                            const Icon = step.icon
                            const isActive = currentStep === step.id
                            const isCompleted = currentStep > step.id

                            return (
                                <React.Fragment key={step.id}>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`flex items-center gap-3 ${isActive ? 'opacity-100' : 'opacity-50'}`}
                                    >
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${isCompleted
                                            ? 'bg-neon-cyan text-deep-black'
                                            : isActive
                                                ? 'bg-neon-cyan/20 text-neon-cyan border-2 border-neon-cyan shadow-[0_0_20px_rgba(0,243,255,0.5)]'
                                                : 'bg-white/5 text-gray-500 border border-white/10'
                                            }`}>
                                            {isCompleted ? <Check size={20} /> : <Icon size={20} />}
                                        </div>
                                        <span className={`hidden md:block text-sm font-medium ${isActive ? 'text-white' : 'text-gray-500'}`}>
                                            {step.title}
                                        </span>
                                    </motion.div>
                                    {index < steps.length - 1 && (
                                        <div className={`w-12 md:w-24 h-0.5 transition-all duration-500 ${isCompleted ? 'bg-neon-cyan' : 'bg-white/10'}`}></div>
                                    )}
                                </React.Fragment>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Content Area */}
            <section className="py-12 relative z-10">
                <div className="container mx-auto px-4 max-w-5xl">
                    <AnimatePresence mode="wait">
                        {/* Step 1: Plan Selection */}
                        {currentStep === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                className="grid md:grid-cols-3 gap-6"
                            >
                                {plans.map((plan) => {
                                    const Icon = plan.icon
                                    const isSelected = selectedPlan === plan.id

                                    return (
                                        <motion.div
                                            key={plan.id}
                                            whileHover={{ scale: 1.02, y: -5 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setSelectedPlan(plan.id)}
                                            className={`glass-card p-6 rounded-xl cursor-pointer transition-all duration-300 relative ${isSelected
                                                ? 'border-2 border-neon-cyan shadow-[0_0_30px_rgba(0,243,255,0.3)]'
                                                : 'border border-white/10 hover:border-white/30'
                                                } ${plan.isPopular ? 'md:scale-105' : ''}`}
                                        >
                                            {plan.isPopular && (
                                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neon-cyan text-deep-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                                    Popular
                                                </div>
                                            )}

                                            {isSelected && (
                                                <div className="absolute top-4 right-4 w-6 h-6 bg-neon-cyan rounded-full flex items-center justify-center">
                                                    <Check size={14} className="text-deep-black" />
                                                </div>
                                            )}

                                            <div className="text-center pt-4">
                                                <div
                                                    className={`mx-auto w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-4 border border-white/10`}
                                                    style={{ color: plan.colorHex }}
                                                >
                                                    <Icon size={28} />
                                                </div>
                                                <h3 className="text-xl font-bold text-white mb-1">{plan.title}</h3>
                                                <p className="text-xs text-gray-400 mb-4">{plan.subtitle}</p>
                                                <div className="text-3xl font-bold text-white mb-1">
                                                    <span className="text-lg text-gray-500">$</span>{plan.price}
                                                </div>
                                                <p className="text-xs text-gray-500 mb-4">/ Mes + IVA</p>

                                                <ul className="text-left space-y-2 mt-6">
                                                    {plan.features.slice(0, 4).map((feature, idx) => (
                                                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-400">
                                                            <Check size={12} className="text-neon-cyan mt-0.5 flex-shrink-0" />
                                                            <span>{feature}</span>
                                                        </li>
                                                    ))}
                                                    {plan.features.length > 4 && (
                                                        <li className="text-xs text-neon-cyan">
                                                            +{plan.features.length - 4} más...
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </motion.div>
                        )}

                        {/* Step 2: User Data */}
                        {currentStep === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                className="max-w-xl mx-auto"
                            >
                                <div className="glass-card p-8 rounded-2xl border border-white/10">
                                    <h2 className="text-2xl font-bold text-white mb-6 text-center">
                                        Tus Datos de Contacto
                                    </h2>

                                    <div className="space-y-6">
                                        <div className="relative group">
                                            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-neon-cyan transition-colors" />
                                            <input
                                                type="text"
                                                name="nombre"
                                                value={formData.nombre}
                                                onChange={handleInputChange}
                                                placeholder="Tu nombre completo"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_20px_rgba(0,243,255,0.2)] transition-all"
                                            />
                                        </div>

                                        <div className="relative group">
                                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-neon-cyan transition-colors" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="Tu correo electrónico"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_20px_rgba(0,243,255,0.2)] transition-all"
                                            />
                                        </div>

                                        <div className="relative group">
                                            <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-neon-cyan transition-colors" />
                                            <input
                                                type="tel"
                                                name="telefono"
                                                value={formData.telefono}
                                                onChange={handleInputChange}
                                                placeholder="Tu teléfono (ej: +56 9 1234 5678)"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_20px_rgba(0,243,255,0.2)] transition-all"
                                            />
                                        </div>

                                        <div className="relative group">
                                            <MessageSquare size={18} className="absolute left-4 top-4 text-gray-500 group-focus-within:text-neon-cyan transition-colors" />
                                            <textarea
                                                name="mensaje"
                                                value={formData.mensaje}
                                                onChange={handleInputChange}
                                                placeholder="Cuéntanos sobre tu proyecto (opcional)"
                                                rows={4}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_20px_rgba(0,243,255,0.2)] transition-all resize-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Selected Plan Summary */}
                                    {selectedPlanData && (
                                        <div className="mt-8 p-4 bg-neon-cyan/10 rounded-xl border border-neon-cyan/30">
                                            <p className="text-xs text-neon-cyan uppercase tracking-widest mb-2">Plan seleccionado</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <selectedPlanData.icon size={20} style={{ color: selectedPlanData.colorHex }} />
                                                    <span className="font-bold text-white">{selectedPlanData.title}</span>
                                                </div>
                                                <span className="text-neon-cyan font-bold">${selectedPlanData.price}/mes</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Confirmation */}
                        {currentStep === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                className="max-w-xl mx-auto"
                            >
                                <div className="glass-card p-8 rounded-2xl border border-white/10">
                                    <h2 className="text-2xl font-bold text-white mb-6 text-center">
                                        Confirma tu Solicitud
                                    </h2>

                                    <div className="space-y-6">
                                        {/* Plan Summary */}
                                        {selectedPlanData && (
                                            <div className="p-6 bg-gradient-to-br from-neon-cyan/10 to-electric-blue/10 rounded-xl border border-neon-cyan/30">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center" style={{ color: selectedPlanData.colorHex }}>
                                                        <selectedPlanData.icon size={28} />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold text-white">{selectedPlanData.title}</h3>
                                                        <p className="text-gray-400 text-sm">{selectedPlanData.subtitle}</p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                                                    <span className="text-gray-400">Total mensual</span>
                                                    <span className="text-2xl font-bold text-neon-cyan">${selectedPlanData.price} + IVA</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* User Data Summary */}
                                        <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                                            <h4 className="text-sm text-neon-cyan uppercase tracking-widest mb-4">Tus Datos</h4>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <User size={16} className="text-gray-500" />
                                                    <span className="text-white">{formData.nombre}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Mail size={16} className="text-gray-500" />
                                                    <span className="text-white">{formData.email}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Phone size={16} className="text-gray-500" />
                                                    <span className="text-white">{formData.telefono}</span>
                                                </div>
                                                {formData.mensaje && (
                                                    <div className="flex items-start gap-3">
                                                        <MessageSquare size={16} className="text-gray-500 mt-0.5" />
                                                        <span className="text-gray-400 text-sm">{formData.mensaje}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {paymentError && (
                                        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                                            {paymentError}
                                        </div>
                                    )}

                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="w-full mt-8 bg-neon-cyan text-deep-black py-4 rounded-xl font-bold text-lg hover:bg-neon-cyan-hover transition-all shadow-[0_0_30px_rgba(0,243,255,0.4)] hover:shadow-[0_0_50px_rgba(0,243,255,0.6)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-deep-black/30 border-t-deep-black rounded-full animate-spin"></div>
                                                Procesando...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={20} />
                                                Pagar con Flow
                                            </>
                                        )}
                                    </button>

                                    <p className="text-xs text-gray-500 mt-4 text-center">
                                        Serás redirigido a la pasarela de pagos segura de Flow
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Navigation Buttons */}
            <section className="py-8 relative z-10">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="flex justify-between items-center">
                        <button
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition-all font-medium ${currentStep === 1
                                ? 'border-white/10 text-gray-600 cursor-not-allowed'
                                : 'border-white/20 text-white hover:border-neon-cyan hover:text-neon-cyan'
                                }`}
                        >
                            <ChevronLeft size={20} />
                            Anterior
                        </button>

                        {currentStep < 3 && (
                            <button
                                onClick={nextStep}
                                disabled={!canProceed()}
                                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${canProceed()
                                    ? 'bg-neon-cyan text-deep-black hover:bg-neon-cyan-hover shadow-[0_0_20px_rgba(0,243,255,0.4)]'
                                    : 'bg-white/10 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Siguiente
                                <ChevronRight size={20} />
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 text-center text-gray-600 text-sm border-t border-white/5 relative z-10 glass">
                <div className="container mx-auto px-4">
                    <p className="font-heading font-light tracking-widest uppercase">
                        © {new Date().getFullYear()} YoungStars Design
                    </p>
                </div>
            </footer>
        </main>
    )
}

export default function SolicitarServicio() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-deep-black flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <SolicitarServicioContent />
        </Suspense>
    )
}
