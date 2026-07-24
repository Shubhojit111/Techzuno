"use client";

import Assets from "@/Assets/Assets";
import Image from "next/image";
import HeaderBtn from "../buttons/HeaderBtn";
import SectionTitle from "../buttons/SectionTitle";
import SectionDescription from "../buttons/SectionDescription";
import { Icon } from "@iconify/react";
import ServiceCard from "../cards/ServiceCard";

export default function Services() {
  const services = [
    {
      icon: "mynaui:mobile",
      title: "Web Development",
      description: "Custom, responsive websites engineered for speed, search visibility, and conversions — built on modern stacks like Next.js, React, and WordPress.",
    },
    {
      icon: "simple-icons:civicrm",
      title: "App Development",
      description: "Native and cross-platform mobile apps that keep users coming back, from first wireframe to App Store launch.",
    },
    {
      icon: "streamline-plump:web",
      title: "UI/UX Design",
      description: "Interfaces people actually enjoy using — researched, wireframed, and tested before a single line of code is written.",
    },
  ];

  return (
    <section className="pb-24 relative">
      <div className="px-6 sm:px-10 lg:px-62 mx-auto">
        <div className="text-left md:text-center mx-auto mb-12 md:mb-16">
          <HeaderBtn text="OUR SERVICES" />
          <SectionTitle className="mb-4 md:mb-6" title={<>
            PROVIDES FULL-CYCLE{" "}
            <span className="text-[#B8FAFF]">
              CUSTOM <br /> WEBSITE
            </span> DESIGN SERVICES IN <br className="hidden md:block" />
            KOLKATA.
          </>} />
          <SectionDescription className="md:mx-auto" description="Looking for professional website design services in Kolkata? At Techzuno, we specialise in building modern, responsive and SEO-friendly websites that help your business grow online. Being a reputable website design company in Kolkata, we are aware that every company is different. For this reason, whether it’s an e-commerce store, personal portfolio, or corporate website, our talented designers develop custom solutions. To make sure your website works well and ranks higher on Google, we concentrate on search engine optimization, mobile compatibility, clean layouts, and quick loading times." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <ServiceCard
              key={idx}
              className="group h-auto lg:h-[400px] w-full flex flex-col items-center md:items-center justify-center relative rounded-[10px] transition-all duration-300 overflow-hidden text-left md:text-center"
              icon={service.icon}
              title={service.title}
              description={service.description}
              linkText="Explore Our Services"
            >
              
            </ServiceCard>
          ))}
        </div>
      </div>
    </section>
  );
}
