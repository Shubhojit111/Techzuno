"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Icon } from "@iconify/react";


export default function PricingCards({ data = [] }) {
  return (
    <div className="w-full relative z-10 px-6 md:px-10 lg:px-62 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-8 place-items-center md:place-items-stretch">
        {data.map((plan, index) => (
          <div key={index} className="relative w-full max-w-[400px] md:max-w-none pt-10 md:pt-12">
            {/* MOST POPULAR RIBBON */}
            {plan.isPopular && (
              <div
                className="absolute top-2 top-0 left-0 w-full text-black text-[10px] md:text-xs font-bold text-center py-2.5 tracking-widest rounded-t-[24px] z-10 bg-[#03B8B8]"
              >
                MOST POPULAR
              </div>
            )}

            <div
              className={`relative h-full rounded-[24px] bg-gradient-to-b from-[#1c272a] to-[#121617] border-2 flex flex-col shadow-2xl transition-all duration-300 ${
                plan.isPopular ? "border-[#03B8B8]" : "border-white/5"
              }`}
            >
              <div className="p-6 md:p-6 lg:p-8 flex-1 flex flex-col pt-8 md:pt-8 lg:pt-10">
              {/* Icon */}
              <div className="mb-4">
                <Icon icon={plan.icon} className="text-white w-8 h-8 opacity-80" />
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-[#03B8B8] text-xl md:text-lg lg:text-2xl font-bold mb-1 leading-tight w-[80%]">
                {plan.title}
              </h3>
              <p className="text-white/40 text-[10px] md:text-[9px] lg:text-xs tracking-wider mb-4 uppercase">
                {plan.subtitle}
              </p>

              {/* Price */}
              <div className="flex items-start text-white font-toxigenesis mb-6">
                <span className="text-3xl md:text-2xl lg:text-4xl">₹{plan.price}</span>
              </div>

              {/* Button */}
              <button
                className={`w-full py-2.5 rounded-full font-bold text-sm md:text-xs lg:text-sm text-white transition-all shadow-lg ${
                  plan.isPopular
                    ? "bg-[#e60000] hover:bg-[#cc0000] shadow-[#e60000]/30"
                    : "bg-[#03B8B8] hover:bg-[#029595] shadow-[#03B8B8]/30"
                } mb-8`}
              >
                Get Started
              </button>

              {/* Features List */}
              <div className="flex-1">
                <p className="text-white/60 text-xs md:text-[10px] lg:text-xs mb-4">
                  Services include:
                </p>
                <ul className="space-y-3 md:space-y-2 lg:space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 md:gap-2 lg:gap-3">
                      <Icon
                        icon="mdi:check-circle-outline"
                        className="text-[#03B8B8] w-5 h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 shrink-0 mt-[2px]"
                      />
                      <span className="text-white/80 text-[13px] md:text-[11px] lg:text-[14px] leading-snug">
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
