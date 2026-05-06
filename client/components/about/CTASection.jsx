'use client'
import { Icon } from '@iconify/react'

export default function CTASection() {
  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0d1117 0%, #0a1628 50%, #0d1117 100%)',
      }}
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,224,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,224,1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Glow blobs */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-72 h-72 bg-[#00d4e0]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-72 h-72 bg-[#00d4e0]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left - Image */}
          <div className="relative w-full lg:w-[420px] flex-shrink-0">
            <div className="relative rounded-2xl overflow-hidden h-[320px] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&q=80"
                alt="Experts ready to help"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080a0f]/60 to-transparent" />
            </div>
          </div>

          {/* Right - Content */}
          <div className="flex-1 text-center lg:text-left">
            <span className="section-label block mb-3">LET&apos;S MAKE GREAT THINGS</span>

            <h2 className="text-[32px] md:text-[44px] font-black leading-tight mb-4">
              HAVE A PROJECT?
              <br />
              SPEAK WITH
              <br />
              OUR <span className="text-[#00d4e0]">EXPERT</span>
            </h2>

            <p className="text-gray-400 text-[14px] leading-relaxed mb-8 max-w-md lg:mx-0 mx-auto">
              Leave Your Contact Details To Get A Free Consultation With A Techzuno Expert.
            </p>

            <button className="btn-solid group text-base px-8 py-3">
              <span>Get Started</span>
              <Icon
                icon="mdi:arrow-right"
                className="text-lg group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
