"use client";

import { useRef } from "react";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TechStack() {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);

  const techs = [
    { name: "React.js", icon: "logos:react" },
    { name: "React Native", icon: "logos:react" },
    { name: "Next.js", icon: "logos:nextjs-icon" },
    { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
    { name: "Node.js", icon: "logos:nodejs-icon" },
    { name: "Express.js", icon: "skill-icons:expressjs-dark" },
    { name: "MySQL", icon: "logos:mysql-icon" },
    { name: "JavaScript", icon: "logos:javascript" },
    { name: "Python", icon: "logos:python" },
    { name: "WordPress", icon: "logos:wordpress-icon" },
    { name: "PHP", icon: "logos:php" },
    { name: "Laravel", icon: "logos:laravel" },
    { name: "Figma", icon: "logos:figma" },
    { name: "Git", icon: "logos:git-icon" },
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

      const slider = sliderRef.current;
      const wrapper = sectionRef.current?.querySelector(".tech-slider-wrapper");
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!slider || !wrapper || reduceMotion) return;

      const marquee = gsap.to(slider, {
        xPercent: -20,
        duration: 56,
        ease: "none",
        repeat: -1,
      });

      const slowDown = () => {
        gsap.to(marquee, {
          timeScale: 0.32,
          duration: 0.45,
          ease: "power2.out",
          overwrite: true,
        });
      };

      const speedUp = () => {
        gsap.to(marquee, {
          timeScale: 1,
          duration: 0.45,
          ease: "power2.out",
          overwrite: true,
        });
      };

      wrapper.addEventListener("mouseenter", slowDown);
      wrapper.addEventListener("mouseleave", speedUp);

      return () => {
        wrapper.removeEventListener("mouseenter", slowDown);
        wrapper.removeEventListener("mouseleave", speedUp);
        marquee.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="bg-black py-16">
      <div className="mx-auto flex flex-col items-center justify-between gap-10 px-6 sm:px-10 md:flex-row md:px-12 lg:px-62">
        <h3 className="w-full text-center text-[16px] font-normal tracking-wide text-white/70 md:w-auto md:text-left md:text-[14px] lg:text-[18px]">
          Tools We Master To Build Digital Excellence
        </h3>
        <div className="tech-slider-wrapper w-full md:max-w-[50%]">
          <div ref={sliderRef} className="tech-slider" aria-label="Technologies we use">
            {[0, 1].map((group) => (
              <div
                key={group}
                className="tech-slider-group"
                aria-hidden={group === 1}
              >
                {sliderTechs.map((tech, index) => (
                  <div
                    key={`${group}-${tech.name}-${index}`}
                    className="tech-logo flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden md:h-12 md:w-12 lg:h-16 lg:w-16"
                  >
                    <Icon
                      icon={tech.icon}
                      aria-label={group === 0 ? tech.name : undefined}
                      aria-hidden={group === 1}
                      className="h-full w-full rounded-full border border-white/10 object-cover p-2 grayscale transition-all duration-300 hover:scale-110 hover:grayscale-0"
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