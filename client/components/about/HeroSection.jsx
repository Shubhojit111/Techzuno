'use client'

export default function HeroSection() {
  return (
    <section
      className="relative pt-[64px] h-[280px] flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0c12 0%, #0d1117 100%)',
      }}
    >
      {/* Dark overlay grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,224,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,224,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#080a0f]/60 via-[#080a0f]/40 to-[#080a0f]/80" />

      {/* Watermark */}
      <span
        className="absolute select-none pointer-events-none font-black text-[120px] opacity-[0.04] uppercase tracking-widest"
        style={{ whiteSpace: 'nowrap' }}
      >
        ABOUT US
      </span>

      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-[42px] md:text-[56px] font-black uppercase tracking-[0.15em] text-white">
          ABOUT US
        </h1>
        <div className="w-16 h-[3px] bg-[#00d4e0] mx-auto mt-3 rounded-full" />
      </div>
    </section>
  )
}
