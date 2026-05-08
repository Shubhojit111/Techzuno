"use client";

import Assets from "@/Assets/Assets";
import { Icon } from "@iconify/react";
import Image from "next/image";
import KnowMoreBtn from "../buttons/KnowMoreBtn";
import SectionTitle from "../buttons/SectionTitle";
import SectionDescription from "../buttons/SectionDescription";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyChooseUs() {
  const reasons = [
    {
      index: 1,
      icon: "carbon:settings-edit",
      title: "Customised",
      description:
        "We don’t use one-size-fits-all. Every website or app is tailored specifically to your business goals, user needs, and long-term scalability.",
    },
    {
      index: 2,
      icon: "mdi:cloud-check-outline",
      title: "High-Quality",
      description:
        "We don’t use one-size-fits-all. Every website or app is tailored specifically to your business goals, user needs, and long-term scalability.",
    },
    {
      index: 3,
      icon: "carbon:star-review",
      title: "Experience",
      description:
        "We don’t use one-size-fits-all. Every website or app is tailored specifically to your business goals, user needs, and long-term scalability.",
    },
    {
      index: 4,
      icon: "streamline-plump:customer-support-7",
      title: "Support",
      description:
        "We don’t use one-size-fits-all. Every website or app is tailored specifically to your business goals, user needs, and long-term scalability.",
    },
  ];

  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".pop-icon", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      className="py-16 md:py-24 bg-black relative overflow-hidden"
      ref={containerRef}
    >
      {/* Decorative background elements */}
      <div className="absolute -left-4 top-8 md:-left-10 md:top-1/2 md:-translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 md:w-64 md:h-64 pointer-events-none">
        <Image
          src={Assets.HomeFigure2}
          alt="WhyChooseUs"
          fill
          sizes="(min-width: 768px) 256px, 128px"
          className="object-cover"
        />
      </div>

      <div className="px-6 sm:px-10 lg:px-62 mx-auto text-center">
        <SectionTitle className="mb-4 md:mb-6" title={<>
          WHY CHOOSE <span className="text-[#38FFF2]">TECHZUNO?</span>
        </>} />
        <SectionDescription className="mx-auto" description="Below are 4 reasons that make us different" />

        <div className="mb-10 md:mb-16">
          <KnowMoreBtn text="Find More About Techzuno" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="group h-auto lg:h-80 w-full flex flex-col items-center lg:items-center justify-center relative rounded-[10px] transition-all duration-300 overflow-hidden text-left lg:text-center"
            >
              <div className="w-full h-full absolute top-0 left-0">
                <Image
                  src={Assets.Group491}
                  alt="Group 491"
                  className={`h-full w-full object-cover ${reason.index % 2 === 0 ? "transform-[rotateY(180deg)]" : ""}`}
                />
              </div>

              <div className="h-full w-full flex flex-col items-left lg:items-center justify-center text-center px-4 pt-6 pb-8 md:pt-6 md:pb-10 lg:px-8 lg:pt-6 lg:pb-10 ">
                <div className="pop-icon w-14 h-14 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white rounded-full flex items-center justify-center text-4xl mb-4 md:mb-3 lg:mb-4 relative">
                  <Icon
                    icon={reason.icon}
                    className="text-[#03B8B8] w-8 h-8 sm:w-8 sm:h-8 lg:w-10 lg:h-10  "
                  />
                </div>

                <h3 className="text-[20px] sm:text-[16px] lg:text-[24px] font-bold text-[#38FFF2] mb-3 md:mb-2 lg:mb-3 relative text-left lg:text-center z-10">
                  {reason.title}
                </h3>
                <p className="text-[#E5E5E5] leading-tight text-[14px] sm:text-[12px] relative text-left lg:text-center z-10">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
