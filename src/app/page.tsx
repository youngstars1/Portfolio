'use client'
import React, { useEffect } from 'react'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Services } from '@/components/Services'
import { Experience } from '@/components/Experience'
import { Pricing } from '@/components/Pricing'
import { Contact } from '@/components/Contact'
import { FloatingNav } from '@/components/FloatingNav'
import { ParticlesBackground } from '@/components/ParticlesBackground'
import { MouseSpotlight } from '@/components/MouseSpotlight'
import { WhatsAppButton } from '@/components/WhatsAppButton'

export default function Home() {
  useEffect(() => {
    // Force scroll to top on mount to avoid stuck position
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="bg-deep-black min-h-screen text-white selection:bg-neon-cyan/30 selection:text-neon-cyan overflow-hidden">
      <MouseSpotlight />
      <ParticlesBackground />
      <FloatingNav />
      <WhatsAppButton />

      <Hero />
      <About />
      <Services />
      <Experience />
      <Pricing />
      <Contact />

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
