'use client'
import { Icon } from '@iconify/react'
import { useState } from 'react'

const navLinks = ['Home', 'Pricing', 'Learn More', 'Services', 'Blog']

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080a0f]/95 backdrop-blur-md border-b border-[#1e2535]">
      <div className="max-w-[1200px] mx-auto px-6 h-[64px] flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-[#00d4e0] flex items-center justify-center">
            <Icon icon="mdi:lightning-bolt" className="text-black text-xl" />
          </div>
          <span className="text-white font-bold text-lg tracking-wide">TECHZUNO</span>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href="#"
                className="text-[13px] text-gray-300 hover:text-[#00d4e0] transition-colors duration-200 font-medium"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button className="text-[13px] text-gray-300 hover:text-white px-4 py-2 transition-colors duration-200 font-medium">
            Login
          </button>
          <button className="bg-[#00d4e0] hover:bg-[#00b4bf] text-black text-[13px] font-semibold px-5 py-2 rounded-full transition-all duration-200">
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Icon icon={mobileOpen ? 'mdi:close' : 'mdi:menu'} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0d1117] border-t border-[#1e2535] px-6 py-4">
          <ul className="flex flex-col gap-4 mb-4">
            {navLinks.map((link) => (
              <li key={link}>
                <a href="#" className="text-[13px] text-gray-300 hover:text-[#00d4e0] transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex gap-3">
            <button className="text-[13px] text-gray-300 px-4 py-2">Login</button>
            <button className="bg-[#00d4e0] text-black text-[13px] font-semibold px-5 py-2 rounded-full">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
