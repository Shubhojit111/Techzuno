"use client";

import React from "react";
import SectionTitle from "../buttons/SectionTitle";
import { Icon } from "@iconify/react";
import Image from "next/image";

export default function WhyChoose({ data }) {
  return (
    <section className="py-20">
      <div className="px-6 md:px-10 lg:px-62 mx-auto">
        <div className="flex justify-end mb-14 md:mb-16">
          <SectionTitle
            title={
              <>
                WHY CHOOSE <span className="text-[#03B8B8]">TECHZUNO</span>
              </>
            }
            className="text-right uppercase"
          />
        </div>

        <div className="lg:hidden space-y-12">
          {data.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
              <div className="bg-[#121212] border border-white/5 rounded-[22px] p-7 md:p-8 relative overflow-hidden">
                <div className="absolute top-5 right-5 text-[#03B8B8] font-bold text-[20px] tracking-widest">
                  {item.number}
                </div>
                <div className="w-12 h-12 rounded-2xl bg-black border border-[#03B8B8]/20 flex items-center justify-center text-[#03B8B8] mb-6">
                  <Icon icon={item.icon} className="w-6 h-6" />
                </div>
                <h3 className="text-white font-bold tracking-widest uppercase text-[15px] mb-4">
                  {item.title}
                </h3>
                <p className="text-white/60 text-[13px] md:text-[14px] leading-relaxed font-montserrat">
                  {item.description}
                </p>
              </div>

              <div className="rounded-[22px] overflow-hidden border border-white/10 bg-black">
                <div className="w-full aspect-[16/10]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden lg:block relative h-[560px] xl:h-[600px]">
          <div className="absolute left-[34%] top-[56%] -translate-x-1/2 -translate-y-1/2 w-[520px] xl:w-[600px]">
            <div className="rounded-[28px] overflow-hidden border border-white/10 shadow-2xl bg-black">
              <div className="w-full aspect-[16/10]">
                <Image
                  src={data?.[0]?.image}
                  alt={data?.[0]?.title || "Why Choose Techzuno"}
                  fill
                  sizes="600px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="absolute left-0 bottom-0 w-[560px] xl:w-[640px]">
            <div className="rounded-[28px] overflow-hidden border border-white/10 shadow-2xl bg-black">
              <div className="w-full aspect-[16/10]">
                <Image
                  src={data?.[1]?.image}
                  alt={data?.[1]?.title || "Delivery Excellence"}
                  fill
                  sizes="640px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="absolute left-0 top-0 w-[360px]">
            <div className="bg-[#121212] border border-white/5 rounded-[22px] p-8 relative overflow-hidden">
              <div className="absolute top-6 right-6 text-[#03B8B8] font-bold text-[22px] tracking-widest">
                {data?.[0]?.number}
              </div>
              <div className="w-12 h-12 rounded-2xl bg-black border border-[#03B8B8]/20 flex items-center justify-center text-[#03B8B8] mb-6">
                <Icon icon={data?.[0]?.icon} className="w-6 h-6" />
              </div>
              <h3 className="text-white font-bold tracking-widest uppercase text-[15px] mb-4">
                {data?.[0]?.title}
              </h3>
              <p className="text-white/60 text-[13px] leading-relaxed font-montserrat">
                {data?.[0]?.description}
              </p>
            </div>
          </div>

          <div className="absolute right-0 top-[44%] -translate-y-1/2 w-[360px]">
            <div className="bg-[#121212] border border-white/5 rounded-[22px] p-8 relative overflow-hidden">
              <div className="absolute top-6 right-6 text-[#03B8B8] font-bold text-[22px] tracking-widest">
                {data?.[1]?.number}
              </div>
              <div className="w-12 h-12 rounded-2xl bg-black border border-[#03B8B8]/20 flex items-center justify-center text-[#03B8B8] mb-6">
                <Icon icon={data?.[1]?.icon} className="w-6 h-6" />
              </div>
              <h3 className="text-white font-bold tracking-widest uppercase text-[15px] mb-4">
                {data?.[1]?.title}
              </h3>
              <p className="text-white/60 text-[13px] leading-relaxed font-montserrat">
                {data?.[1]?.description}
              </p>
            </div>
          </div>

          <div className="absolute left-[56%] bottom-0 translate-x-[-50%] w-[360px]">
            <div className="bg-[#121212] border border-white/5 rounded-[22px] p-8 relative overflow-hidden">
              <div className="absolute top-6 right-6 text-[#03B8B8] font-bold text-[22px] tracking-widest">
                {data?.[2]?.number}
              </div>
              <div className="w-12 h-12 rounded-2xl bg-black border border-[#03B8B8]/20 flex items-center justify-center text-[#03B8B8] mb-6">
                <Icon icon={data?.[2]?.icon} className="w-6 h-6" />
              </div>
              <h3 className="text-white font-bold tracking-widest uppercase text-[15px] mb-4">
                {data?.[2]?.title}
              </h3>
              <p className="text-white/60 text-[13px] leading-relaxed font-montserrat">
                {data?.[2]?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
