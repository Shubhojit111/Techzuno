"use client";
import { Icon } from "@iconify/react";
import SectionTitle from "../buttons/SectionTitle";
import SectionDescription from "../buttons/SectionDescription";
import HeaderBtn from "../buttons/HeaderBtn";
import KnowMoreBtn from "../buttons/KnowMoreBtn";
import Image from "next/image";
import Assets from "@/Assets/Assets";

const milestones = [
  {
    year: "2022",
    text: "Started As A Group Of Freelance Professionals Collaborating On Web Development And Design Projects.",
  },
  {
    year: "2023",
    text: "Started As A Group Of Freelance Professionals Collaborating On Web Development And Design Projects.",
  },
  {
    year: "2024",
    text: "Started As A Group Of Freelance Professionals Collaborating On Web Development And Design Projects.",
  },
  {
    year: "2025",
    text: "Started As A Group Of Freelance Professionals Collaborating On Web Development And Design Projects.",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80",
  "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=400&q=80",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80",
];

export default function MilestonesSection() {
  return (
    <section className="bg-black pb-20">
      <div className="w-full mx-auto px-6 sm:px-10 lg:px-62 mb-6 md:mb-16 ">
        {/* Header */}
        <div className="mx-auto relative mb-10">
          <div className="max-w-full md:max-w-[70%] lg:max-w-[60%]">
            <HeaderBtn text="OUR HISTORY" />
            <SectionTitle
              className="mb-4 md:mb-6 uppercase"
              title={
                <>
                 some of the <span className="text-[#38FFF2]">biggest <br /> milestones</span> we’ve <span className="md:whitespace-nowrap">crossed along the way</span> 
                </>
              }
            />
            <SectionDescription
              description={
                <>
                  We Go Beyond Maintaining Operations We Empower Businesses With
                  Data, Insights, And Best Practices To Stay Ahead In An
                  Ever-Evolving Digital Landscape.
                </>
              }
            />
            <KnowMoreBtn text="Download Company Profile" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-12 items-start w-full h-auto lg:h-[550px]">
          {/* Left - Image Gallery */}
          <div className="relative w-full lg:w-[55%] shrink-0">
            <Image src={Assets.Milestone} alt="Milestone" className="w-full h-auto object-cover rounded-2xl" />
          </div>

          {/* Right - Timeline */}
          <div className="w-full md:max-w-[75%] lg:max-w-none lg:w-[45%] h-full flex items-center justify-center mx-auto lg:mx-0">
            <div className="max-h-full lg:max-h-[80%] w-full flex items-center justify-start lg:justify-center">
              <div className="relative flex flex-col gap-[58px] md:gap-[30px] py-8 ">
                {/* Vertical Dashed Line */}
                <div
                  className="absolute left-[9px] md:left-[9.1px] lg:left-[8.5px] top-[10px] bottom-[40px] w-[1px] md:w-[0.5px] -translate-x-1/2"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, rgba(255,255,255,0.9) 0px, rgba(255,255,255,0.9) 5px, transparent 5px, transparent 10px)",
                  }}
                />

                {milestones.map((item, index) => (
                  <div key={index} className="relative flex items-start">
                    {/* Dot */}
                    <div className="relative mt-0.5 z-10 shrink-0 rounded-full">
                      <div className="w-[18px] h-[18px] md:w-[18px] md:h-[18px] lg:w-[16px] lg:h-[16px] rounded-full bg-white border-[2px] border-black" />
                    </div>

                    {/* Content */}
                    <div className="ml-10 md:ml-12 max-w-[640px] ">
                      {/* Year */}
                      <h3 className="text-white font-semibold text-[26px] md:text-[30px] lg:text-[20px] leading-none tracking-[-0.02em]">
                        {item.year}
                      </h3>

                      {/* Description */}
                      <p className="mt-3 text-white/80 md:text-[16px] lg:text-[13px] leading-[1.32] max-w-[95%] ">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA text */}
        <div className="mt-14 text-center">
          <p className="text-white/80 text-[13px]">
            Want To Accelerate In Web And App Development At Your Company?{" "}
            <a href="#" className="text-[#00d4e0] underline hover:no-underline">
              See How We Can Help
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
