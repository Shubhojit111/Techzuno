'use client'
import { Icon } from '@iconify/react'

const milestones = [
  {
    year: '2022',
    text: 'Started As A Group Of Freelance Professionals Collaborating On Web Development And Design Projects.',
  },
  {
    year: '2023',
    text: 'Started As A Group Of Freelance Professionals Collaborating On Web Development And Design Projects.',
  },
  {
    year: '2024',
    text: 'Started As A Group Of Freelance Professionals Collaborating On Web Development And Design Projects.',
  },
  {
    year: '2025',
    text: 'Started As A Group Of Freelance Professionals Collaborating On Web Development And Design Projects.',
  },
]

const galleryImages = [
  'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80',
  'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=400&q=80',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80',
]

export default function MilestonesSection() {
  return (
    <section className="bg-[#080a0f] py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <span className="section-label">OUR HISTORY</span>
          <h2 className="text-[28px] md:text-[38px] font-black mt-3 leading-tight">
            SOME OF THE{' '}
            <span className="text-[#00d4e0]">BIGGEST</span>
            <br />
            <span className="text-[#00d4e0]">MILESTONES</span> WE&apos;VE
            <br />
            CROSSED ALONG THE WAY
          </h2>
          <div className="mt-6">
            <button className="btn-primary group">
              <span>Download Company Profile</span>
              <Icon
                icon="mdi:arrow-right"
                className="text-base group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left - Image Gallery */}
          <div className="relative w-full lg:w-[480px] flex-shrink-0">
            <div className="grid grid-cols-2 gap-3 relative">
              {galleryImages.map((src, i) => (
                <div
                  key={i}
                  className={`rounded-xl overflow-hidden ${
                    i === 0 ? 'col-span-2 h-[200px]' : 'h-[140px]'
                  }`}
                >
                  <img
                    src={src}
                    alt={`Milestone ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Floating play button / badge */}
            <div className="absolute bottom-6 right-6 bg-[#00d4e0] rounded-full w-12 h-12 flex items-center justify-center shadow-lg cursor-pointer hover:bg-[#00b4bf] transition-colors">
              <Icon icon="mdi:play" className="text-black text-xl ml-1" />
            </div>
          </div>

          {/* Right - Timeline */}
          <div className="flex-1">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[4px] top-2 bottom-2 w-[1px] bg-[#1e2535]" />

              <div className="flex flex-col gap-8 pl-7">
                {milestones.map((m, i) => (
                  <div key={i} className="relative">
                    {/* Dot */}
                    <div className="absolute -left-7 top-1 timeline-dot" />

                    {/* Year */}
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[#00d4e0] font-black text-[18px]">{m.year}</span>
                      <div className="h-px flex-1 bg-[#1e2535]" />
                    </div>

                    {/* Text */}
                    <p className="text-gray-400 text-[13px] leading-relaxed">{m.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA text */}
        <div className="mt-14 text-center">
          <p className="text-gray-500 text-[13px]">
            Want To Accelerate In Web And App Development At Your Company?{' '}
            <a href="#" className="text-[#00d4e0] underline hover:no-underline">
              See How We Can Help
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
