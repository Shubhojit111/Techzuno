"use client";

import { useRef } from "react";
import Image from "next/image";
import Assets from "@/Assets/Assets";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TechStack() {
  const sectionRef = useRef(null);

  const techs = [
    { name: "PHP", image: Assets.Frame1 },
    { name: "MySQL", image: Assets.Frame2 },
    { name: "Python", image: Assets.Frame3 },
    { name: "WordPress", image: Assets.Frame4 },
    { name: "Node.js", image: Assets.Frame5 },
  ];

  const sliderTechs = [...techs, ...techs];

  useGSAP(
    () => {
      gsap.from(".tech-logo", {
        y: 20,
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 60%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="bg-black py-16">
      <div className="mx-auto flex flex-col items-center justify-between gap-10 px-6 sm:px-10 md:flex-row md:px-12 lg:px-62">
        <h3 className="w-full text-center text-[16px] font-normal tracking-wide text-white/70 md:w-auto md:text-left md:text-[14px] lg:text-[18px]">
          Tools We Master To Build Digital Excellence
        </h3>
        <div className="tech-slider-wrapper w-full md:max-w-[55%]">
          <div className="tech-slider" aria-label="Technologies we use">
            {[0, 1].map((group) => (
              <div
                key={group}
                className="tech-slider-group"
                aria-hidden={group === 1}
              >
                {sliderTechs.map((tech, index) => (
                  <div
                    key={`${group}-${tech.name}-${index}`}
                    className="tech-logo flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full md:h-12 md:w-12 lg:h-16 lg:w-16"
                  >
                    <Image
                      src={tech.image}
                      alt={group === 0 ? tech.name : ""}
                      className="h-full w-full rounded-full border border-white/10 object-cover grayscale transition-all duration-300 hover:scale-110 hover:grayscale-0"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
