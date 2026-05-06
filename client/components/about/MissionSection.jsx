'use client'

export default function MissionSection() {
  return (
    <section className="bg-[#0a0c12] py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-14">
          {/* Right Image (reversed layout) */}
          <div className="relative w-full lg:w-[420px] flex-shrink-0">
            <div className="relative rounded-2xl overflow-hidden w-full h-[320px] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                alt="Our Mission"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tl from-[#080a0f]/50 to-transparent" />
            </div>
            {/* Decorative corner accents */}
            <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[#00d4e0] rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-[#00d4e0] rounded-bl-2xl" />
          </div>

          {/* Left Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-[2px] bg-[#00d4e0]" />
              <span className="section-label">ABOUT TECHZUNO</span>
            </div>

            <h2 className="text-[32px] md:text-[40px] font-black leading-tight mb-5">
              OUR <span className="text-[#00d4e0]">MISSION</span>
            </h2>

            <p className="text-gray-400 text-[14px] leading-relaxed mb-4">
              Founded With A Passion And Digital And Digital Innovation, Techzuno Delivers High-Quality
              Web And Mobile App Solutions Tailored To Modern Business Needs. From Startup To Scaling
              Enterprises, We Help Brands Build Fast, Functional, And Beautifully Designed Products.
            </p>
            <p className="text-gray-400 text-[14px] leading-relaxed mb-4">
              We Specialize In Technologies Like Next.js, React, Python, WordPress, And Shopify,
              Crafting Every Detail With Precision And Care. We Believe Great Software Is More Than
              Just Code — We Show It To You — Not Around You.
            </p>
            <p className="text-gray-400 text-[14px] leading-relaxed">
              At Techzuno, We Don&apos;t Just Build — We Help You Turn Ideas Into Reality Through
              Smart Development And Honest Collaboration.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
