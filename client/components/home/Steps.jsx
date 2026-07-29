"use client";

import Assets from "@/Assets/Assets";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Steps() {
  const steps = [
    {
      id: "01",
      prefix: "W",
      hidden: "H",
      suffix: "O.",
      subtitle: "WHO we are",
      image: Assets.Step1,
      description: "Working closely with clients to understand their vision.",
      href: "/about",
    },
    {
      id: "02",
      prefix: "W",
      hidden: "HA",
      suffix: "T.",
      subtitle: "WHAT we do",
      image: Assets.Step2,
      description: "Writing robust and scalable code for the future.",
      href: "/services",
    },
    {
      id: "03",
      prefix: "W",
      hidden: "H",
      suffix: "Y.",
      subtitle: "WHY choose us",
      image: Assets.Step3,
      description: "Yielding results that exceed expectations.",
      href: "/blogs",
    },
  ];

  const containerRef = useRef(null);

  useGSAP(
    () => {
      let mm = gsap.matchMedia();

      // Desktop
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 50%",
            end: "top 10%",
            // markers: true,
            scrub: 2,
          },
        });

        const wrappers = gsap.utils.toArray(".step-wrapper");
        wrappers.forEach((wrapper) => {
          const numberEl = wrapper.querySelector(".step-number");
          const cardEl = wrapper.querySelector(".step-card-content");
          const titleEl = wrapper.querySelector(".step-title");
          const plusEl = wrapper.querySelector(".step-plus");

          const cardTl = gsap.timeline();
          cardTl
            .from(
              cardEl,
              {
                y: 150,
                opacity: 0,
                duration: 1.2,
                stagger: 0.12,
                ease: "power3.out",
              },
              0,
            )
            .from(
              numberEl,
              {
                y: 150,
                opacity: 0,
                duration: 1.5,
                ease: "power3.out",
              },
              0,
            )
            .from(
              titleEl,
              {
                x: -40,
                opacity: 0,
                duration: 0.4,
                ease: "power3.out",
              },
              0.4,
            )
            .from(
              plusEl,
              {
                scale: 0,
                opacity: 0,
                duration: 0.6,
                ease: "back.out(2)",
              },
              0.6,
            );

          tl.add(cardTl, ">");
        });
      });

      // Tablet
      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "top 20%",
            // markers: true,
            scrub: 2,
          },
        });

        // Use stagger to cascade animations since cards are side-by-side in tablet
        tl.from(
          ".step-card-content",
          {
            y: 100,
            opacity: 0,
            duration: 1.2,
            stagger: 0.3,
            ease: "power3.out",
          },
          0,
        )
          .from(
            ".step-number",
            {
              y: 100,
              opacity: 0,
              duration: 1.5,
              stagger: 0.3,
              ease: "power3.out",
            },
            0,
          )
          .from(
            ".step-title",
            {
              x: -30,
              y: 20,
              opacity: 0,
              duration: 0.4,
              stagger: 0.3,
              ease: "power3.out",
            },
            0.4,
          )
          .from(
            ".step-plus",
            {
              scale: 1.5,
              y:10,
              opacity: 0,
              duration: 0.6,
              stagger: 0.3,
              ease: "back.out(2)",
            },
            0.6,
          );
      });

      // Mobile: Individual triggers with alternating directions
      mm.add("(max-width: 767px)", () => {
        const wrappers = gsap.utils.toArray(".step-wrapper");
        wrappers.forEach((wrapper, i) => {
          const fromLeft = i % 2 === 0;
          gsap.from(wrapper, {
            x: fromLeft ? -100 : 100,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 85%",
              end: "top 40%",
              scrub: 2,
            },
          });
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      className="relative z-0 bg-black pt-28  md:pt-24 lg:pt-40 overflow-x-clip"
      ref={containerRef}
    >
      <div className="px-6 sm:px-10 md:px-6 lg:px-62 mx-auto">
        <div className="relative flex flex-col items-center gap-28 md:gap-4 lg:gap-8 md:flex-row md:items-start md:justify-center">
          {steps.map((step, index) => {
            const offset =
              index === 0
                ? ""
                : index === 1
                  ? "md:pt-16 lg:pt-24"
                  : "md:pt-32 lg:pt-48";

            return (
              <Link
                key={step.id}
                href={step.href}
                className={` relative block step-wrapper ${offset}`}
              >
                <div
                  className={`step-number pointer-events-none absolute -top-24 md:-top-28 lg:-top-36 select-none text-[100px] md:text-[90px] lg:text-[160px] leading-none text-white/10 font-montserrat font-black ${offset}`}
                >
                  {step.id}
                </div>
                <div className="step-card-content relative h-[240px] w-[300px] md:h-[190px] md:w-[215px] lg:h-65 lg:w-[320px] overflow-hidden rounded-[22px] bg-white shadow-[0_30px_90px_rgba(0,0,0,0.75)] group">
                  <Image
                    src={step.image}
                    alt={step.prefix + step.suffix || "Steps"}
                    className="absolute inset-0 rounded-b-[16px] w-full object-cover h-[230px] md:h-45 lg:h-62.5 transition-transform duration-700 ease-out will-change-transform group-hover:rotate-6 group-hover:scale-110"
                  />

                  <div className="step-title absolute bottom-6 left-6">
                    <div className="flex items-baseline text-[32px] md:text-[32px] lg:text-[44px] leading-none text-white font-toxigenesis">
                      <span>{step.prefix}</span>
                      <span className="grid grid-cols-[0fr] group-hover:grid-cols-[1fr] transition-[grid-template-columns] duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] overflow-hidden">
                        <span className="overflow-hidden whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 ease-out">
                          {step.hidden}
                        </span>
                      </span>
                      <span>{step.suffix}</span>
                    </div>

                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] overflow-hidden">
                      <div className="overflow-hidden">
                        <div className="mt-1 font-montserrat text-xs md:text-sm lg:text-base text-white/85 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-[220ms] ease-out">
                          {step.subtitle}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="step-plus absolute bottom-6 right-6 flex h-7 w-7 md:h-8 md:w-8 lg:h-9 lg:w-9 items-center justify-center">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-white transition-transform duration-300 ease-out will-change-transform group-hover:bg-red-500 group-hover:scale-140 group-hover:rotate-90 group-hover:-translate-y-8">
                      <Plus
                        size={18}
                        className="text-[#00f2fe] md:size-[20] group-hover:text-white"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}