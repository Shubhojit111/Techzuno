'use client'
import { Icon } from '@iconify/react'

const values = [
  {
    icon: 'mdi:view-grid-plus',
    title: 'Flexibility',
    description:
      'Looking For Professional Website Design Services In Kolkata? At Techzuno, We Specialize In Building Modern Digital Experiences.',
  },
  {
    icon: 'mdi:earth',
    title: 'Cultural Awareness',
    description:
      'Looking For Professional Website Design Services In Kolkata? At Techzuno, We Specialize In Building Modern Digital Experiences.',
  },
  {
    icon: 'mdi:share-variant',
    title: 'Open Collaboration',
    description:
      'Looking For Professional Website Design Services In Kolkata? At Techzuno, We Specialize In Building Modern Digital Experiences.',
  },
  {
    icon: 'mdi:shield-check',
    title: 'Reliability',
    description:
      'Looking For Professional Website Design Services In Kolkata? At Techzuno, We Specialize In Building Modern Digital Experiences.',
  },
  {
    icon: 'mdi:hand-heart',
    title: 'Honesty & Integrity',
    description:
      'Looking For Professional Website Design Services In Kolkata? At Techzuno, We Specialize In Building Modern Digital Experiences.',
  },
  {
    icon: 'mdi:account-star',
    title: 'Client Success',
    description:
      'Looking For Professional Website Design Services In Kolkata? At Techzuno, We Specialize In Building Modern Digital Experiences.',
  },
]

export default function ValuesSection() {
  return (
    <section className="bg-[#080a0f] py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label">WELCOME TO OUR COMPANY</span>
          <h2 className="text-[28px] md:text-[38px] font-black mt-3 leading-tight">
            CULTURE &amp; VALUES BASED
            <br />
            ON <span className="text-[#00d4e0]">SIX FUNDAMENTAL</span> PRINCIPLES.
          </h2>

          <div className="mt-8">
            <button className="btn-primary group">
              <span>Always Ready To Craft Your Next Big Idea</span>
              <Icon icon="mdi:arrow-right" className="text-base group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((val, i) => (
            <div
              key={i}
              className="card-hover bg-[#0d1117] border border-[#1e2535] rounded-2xl p-6 flex flex-col gap-4"
            >
              {/* Icon */}
              <div className="icon-circle">
                <Icon icon={val.icon} className="text-[#00d4e0] text-2xl" />
              </div>

              {/* Title */}
              <h3 className="text-white font-bold text-[16px]">{val.title}</h3>

              {/* Description */}
              <p className="text-gray-400 text-[13px] leading-relaxed">{val.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
