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

  useGSAP(
    () => {
      gsap.from(".tech-item", {
        x: -60,
        opacity: 0,
        duration: 1.5,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 60%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-black py-16">
      <div className="px-6 sm:px-10 md:px-12 lg:px-62 mx-auto flex flex-col items-center justify-between gap-10 md:flex-row">
        <h3 className="text-[16px] md:text-[14px] lg:text-[18px] font-normal tracking-wide text-white/70 text-center md:text-left w-full md:w-auto">
          Tools We Master To Build Digital Excellence
        </h3>
        <div className="flex flex-nowrap items-center justify-center gap-4 md:gap-6 lg:gap-8 w-full md:w-auto overflow-x-auto no-scrollbar">
          {techs.map((tech) => (
            <div
              key={tech.name}
              className="tech-item flex h-10 w-10 md:h-12 md:w-12 lg:h-16 lg:w-16 shrink-0 items-center justify-center overflow-hidden rounded-full"
            >
              <Image
                src={tech.image}
                alt={tech.name || "Techzuno"}
                className="h-full w-full object-cover border border-white/10 grayscale transition duration-300 hover:grayscale-0 rounded-full hover:scale-120"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
