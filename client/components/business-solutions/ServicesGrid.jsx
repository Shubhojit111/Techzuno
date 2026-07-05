"use client";

import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import SectionTitle from "../buttons/SectionTitle";
import Assets from "@/Assets/Assets";
import HeaderBtn from "../buttons/HeaderBtn";

function ServiceItem({ title }) {
  return (
    <div className="group pb-4">
      <div className="flex items-start gap-4 pb-1.5">
        <Icon
          icon="teenyicons:clipboard-tick-outline"
          className=" lg:w-5 lg:h-5 shrink-0 text-[#38FFF2]"
        />
        <h3 className="text-white text-[15px] leading-none sm:text-[16px]  tracking-wide lg:whitespace-nowrap ">
          {title}
        </h3>
      </div>
      <div
        className="mt-1 h-px w-full max-w-[calc(100%-6rem)] lg:max-w-[calc(100%-8rem)] ml-2 lg:ml-10 bg-linear-to-r from-white/10 via-white/45 via-white/35 via-white/25 to-white/10"
        aria-hidden
      />
    </div>
  );
}




export default function ServicesGrid() {

  const serviceData = {
  services: [
    { title: "Custom ERP Solutions" },
    { title: "CRM Development" },
    { title: "E-Commerce Solutions" },
    { title: "Inventory & Warehouse Management Systems" },
    { title: "SaaS Product Development" },
    { title: "Project Management Platforms" },
    { title: "Booking & Appointment Systems" },
    { title: "Learning Management Systems (LMS)" },
    { title: "Billing & Invoicing Systems" },
    { title: "Job Portals & Marketplace Solutions" },
  ],
  quickLinks: [
    { label: "Services We Provide", href: "#services-we-provide" },
    { label: "What You Get", href: "#what-you-get" },
    { label: "Why Choose Techzuno", href: "#why-choose-techzuno" },
    { label: "FAQ's For Service", href: "#faq-service" },
  ],
  saying: {
    quote:
      "At Techzuno, Diverse Experiences And A Passion For Innovation Shape Everything We Build — And That's Something We're Truly Proud Of.",
    author: "Bishal Kayal",
    role: "CEO",
    avatar: Assets.CEO,
  },
};
  const midpoint = Math.ceil(serviceData.services.length / 2);
  const leftColumn = serviceData.services.slice(0, midpoint);
  const rightColumn = serviceData.services.slice(midpoint);

  return (
    <section id="services-we-provide" className="pb-20">
      <div className="px-6 md:px-10 lg:px-62 mx-auto">
        <div className="flex flex-col gap-10 lg:gap-14 items-start">
          <div className="w-full">
            <SectionTitle
              className="uppercase"
              title={
                <>
                  SERVICES <br className="hidden lg:block" />
                  <span className="highlightedTextColor">WE PROVIDE</span>
                </>
              }
            />

            <div className="mt-10 md:mt-8 flex flex-col lg:flex-row items-start justify-between w-full ">
              <div className="flex flex-col sm:flex-row w-fit gap-x-10 lg:gap-x-8 ">
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

              <div className="w-fit ">
                <HeaderBtn text="QUICK LINKS" />
                <ol className="flex flex-col gap-2">
                  {serviceData.quickLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="inline-flex items-baseline gap-2 text-white hover:underline transition-colors text-[16px] tracking-wide"
                      >
                        <span className="text-white text-[16px] font-medium tabular-nums highlightedTextColorLight">
                          {index + 1}.
                        </span>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-14 flex justify-center">
          <div className="w-full max-w-[480px] relative overflow-hidden rounded-[12px] card-bg-gradient py-7 px-7">
            <div
              className="h-px w-full bg-linear-to-r from-white/20 via-white/65 via-white/75 via-white/65 to-white/20"
              aria-hidden
            />
            <div className="w-auto pointer-events-none">
              <Icon
                icon="sidekickicons:quotation-mark-solid"
                className="w-16 h-16 shrink-0"
              />
            </div>

            <p className="relative z-10 text-white/90 text-[14px] md:text-[13px] italic font-medium leading-[1.3] pt-6">
              &ldquo;{serviceData.saying.quote}&rdquo;
            </p>

            <div className="relative z-10 flex items-center gap-3 mt-6">
              <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden border border-white/10 shrink-0">
                <Image
                  src={serviceData.saying.avatar}
                  alt={serviceData.saying.author || "Service data"}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <h4 className="text-white text-[13px] tracking-wide truncate">
                  {serviceData.saying.author}
                </h4>
                <p className="text-white/75 text-[12px] mt-0.5 truncate">
                  {serviceData.saying.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
