"use client";

import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import SectionTitle from "../buttons/SectionTitle";
import Assets from "@/Assets/Assets";

function ServiceItem({ title }) {
  return (
    <div className="group">
      <div className="flex items-center gap-4 pb-5">
        <Icon
          icon="solar:clipboard-check-bold"
          className="w-6 h-6 shrink-0 text-[#03B8B8]"
        />
        <h3 className="text-white text-[15px] sm:text-[16px] font-medium leading-snug">
          {title}
        </h3>
      </div>
      <div
        className="h-px w-full max-w-[calc(100%-2.5rem)] ml-10 bg-gradient-to-r from-white/25 via-white/10 to-transparent"
        aria-hidden
      />
    </div>
  );
}

export default function ServicesGrid({ data }) {
  const midpoint = Math.ceil(data.services.length / 2);
  const leftColumn = data.services.slice(0, midpoint);
  const rightColumn = data.services.slice(midpoint);

  return (
    <section id="services-we-provide" className="pb-20">
      <div className="px-6 md:px-10 lg:px-62 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-8">
            <SectionTitle
              className="uppercase"
              title={
                <>
                  SERVICES
                  <br />
                  <span className="text-[#03B8B8]">WE PROVIDE</span>
                </>
              }
            />

            <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 xl:gap-x-24">
              <div className="flex flex-col">
                {leftColumn.map((service, index) => (
                  <ServiceItem key={index} title={service.title} />
                ))}
              </div>
              <div className="flex flex-col">
                {rightColumn.map((service, index) => (
                  <ServiceItem key={index} title={service.title} />
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:pt-2">
              <h4 className="text-white text-[13px] font-semibold uppercase tracking-[0.22em] mb-6 lg:mb-8">
                QUICK LINKS
              </h4>
              <ol className="space-y-4 lg:space-y-5">
                {data.quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="inline-flex items-baseline gap-2 text-white/90 hover:text-[#03B8B8] transition-colors text-[15px] font-medium"
                    >
                      <span className="text-white/50 text-[13px] font-normal tabular-nums">
                        {index + 1}.
                      </span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            {data.testimonial ? (
              <div className="mt-10 md:mt-12 relative overflow-hidden rounded-[18px] md:rounded-[22px] border border-white/10 bg-gradient-to-br from-[#141414] via-[#0f0f0f] to-[#0a0a0a] px-6 py-7 md:px-8 md:py-9">
                <div className="absolute top-4 left-4 md:top-6 md:left-6 h-10 w-auto pointer-events-none">
                  <Image
                    src={Assets.CommaIconSharp}
                    alt=""
                    width={72}
                    height={44}
                    className="h-full w-auto object-contain opacity-70"
                  />
                </div>

                <p className="relative z-10 text-white/90 text-[14px] md:text-[15px] italic font-medium leading-[1.5] pt-6">
                  &ldquo;{data.testimonial.quote}&rdquo;
                </p>

                <div className="relative z-10 flex items-center gap-3 mt-6">
                  <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden border border-white/10 shrink-0">
                    <Image
                      src={data.testimonial.avatar}
                      alt={data.testimonial.author}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-white font-semibold text-[13px] tracking-wide truncate">
                      {data.testimonial.author}
                    </h4>
                    <p className="text-white/45 text-[12px] mt-0.5 truncate">
                      {data.testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </section>
  );
}
