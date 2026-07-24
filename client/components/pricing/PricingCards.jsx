"use client";

import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function PricingCards({ data = [] }) {
  return (
    <div className="w-full relative z-10 px-6 md:px-10 lg:px-62 mx-auto mb-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-8 place-items-center md:place-items-stretch">
        {data.map((plan, index) => (
          <div key={index} className="relative w-full max-w-[400px] md:max-w-none pt-8 md:pt-8 lg:pt-10">
            {/* MOST POPULAR RIBBON */}
            {plan.isPopular && (
              <div
                className="absolute top-0 left-0 w-full text-white text-[10px] md:text-xs lg:text-sm font-bold text-center py-5 flex items-center justify-center leading-0 tracking-[1.3] rounded-t-[30px] z-10 bg-[#03B8B8]"
              >
                MOST POPULAR
              </div>
            )}

            <div
              className={`relative h-full bg-gradient-to-b from-[#1c272a] to-[#121617] border-2 flex flex-col shadow-2xl transition-all duration-300 ${
                plan.isPopular ? "border-[#03B8B8] rounded-b-[14px]" : "border-white/5 rounded-[14px]"
              }`}
            >
              <div className="p-6 md:p-6 lg:px-6 lg:py-8 flex-1 flex flex-col pt-8 md:pt-8 lg:pt-10">
                {/* Icon */}
                <div className="mb-6">
                  <Icon icon={plan.icon} className="text-[#5BFFFF] w-10 h-10 opacity-80" />
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-[#38FFF2] text-xl md:text-lg lg:text-2xl font-medium mb-3 leading-tight tracking-wide w-[70%]">
                  {plan.title}
                </h3>
                <p className="text-white/90 text-[12px] tracking-wider mb-4 line-clamp-3">
                  {plan.subtitle}
                </p>

                {/* Price */}
                <div className="flex items-start text-white font-toxigenesis mb-6">
                  <span className="text-3xl md:text-2xl lg:text-4xl">Rs. {plan.price}</span>
                </div>

                {/* Button */}
                <Link
                  href={`/contact?inquiry=Services&service=${encodeURIComponent(plan.title)}`}
                  className={`w-full py-2 font-bold text-sm md:text-xs lg:text-[18px] text-white tracking-widest transition-all shadow-lg ${
                    plan.isPopular
                      ? "bg-[#e60000] hover:bg-[#cc0000] shadow-[#e60000]/30 rounded-full"
                      : "bg-[#03B8B8] hover:bg-[#029595] shadow-[#03B8B8]/30 rounded-full"
                  } mb-8 block text-center cursor-pointer`}
                >
                  Get Started
                </Link>

                {/* Features List */}
                <div className="flex-1">
                  <p className="text-white text-xs md:text-[10px] lg:text-[14px] mb-4">
                    Services include:
                  </p>
                  <ul className="space-y-3 md:space-y-2 lg:space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 md:gap-2 lg:gap-3">
                        <Icon
                          icon="mdi:check-circle-outline"
                          className="text-[#03B8B8] w-5 h-5 md:w-4 md:h-4 lg:w-4 lg:h-4 shrink-0 mt-[2px]"
                        />
                        <span className="text-white/80 text-[13px] md:text-[11px] lg:text-[13px] leading-snug">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

