'use client'
import { Icon } from '@iconify/react'

const tools = [
  { name: 'PHP', icon: 'logos:php', color: '#777BB4' },
  { name: 'Node.js', icon: 'logos:nodejs-icon', color: '#339933' },
  { name: 'Python', icon: 'logos:python', color: '#3776AB' },
  { name: 'WordPress', icon: 'logos:wordpress-icon', color: '#21759B' },
  { name: 'React', icon: 'logos:react', color: '#61DAFB' },
  { name: 'Next.js', icon: 'logos:nextjs-icon', color: '#ffffff' },
  { name: 'Flutter', icon: 'logos:flutter', color: '#54C5F8' },
  { name: 'MongoDB', icon: 'logos:mongodb-icon', color: '#47A248' },
]

export default function ToolsSection() {
  return (
    <section className="bg-[#0a0c12] py-16 border-t border-b border-[#1e2535]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Label */}
          <div className="flex-shrink-0 md:w-[220px]">
            <p className="text-[13px] text-gray-300 font-medium leading-snug">
              Tools We Master To Build
              <br />
              <span className="text-white font-bold">Digital Excellence</span>
            </p>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-12 bg-[#1e2535]" />

          {/* Tools Grid */}
          <div className="flex flex-wrap justify-center md:justify-start gap-5">
            {tools.map((tool, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 group cursor-pointer"
                title={tool.name}
              >
                <div className="w-12 h-12 rounded-xl bg-[#0d1117] border border-[#1e2535] flex items-center justify-center group-hover:border-[#00d4e0]/50 transition-all duration-200 group-hover:shadow-lg group-hover:shadow-[#00d4e0]/10">
                  <Icon icon={tool.icon} className="text-2xl" style={{ color: tool.color }} />
                </div>
                <span className="text-[10px] text-gray-500 group-hover:text-[#00d4e0] transition-colors">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
