"use client";

import Link from "next/link";
import Assets from "@/Assets/Assets";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import KnowMoreBtn from "../buttons/KnowMoreBtn";
import HeaderBtn from "../buttons/HeaderBtn";
import SectionTitle from "../buttons/SectionTitle";
import SectionDescription from "../buttons/SectionDescription";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutHome({image, title,  description, buttonText}) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      let mm = gsap.matchMedia();

      // Desktop
      mm.add("(min-width: 1024px)", () => {
        // Background giant text fading in
        gsap.from(".about-bg-text", {
          scale: 0.8,
          opacity: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
        });

        // Left image and text content act together and start late
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 50%",
            end: "top 10%",
            scrub: true,
          },
        });

        tl.from(
          ".about-image",
          {
            x: -150,
            opacity: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 45%",
              end: "top 20%",
              scrub: true,
            },
          },
          0,
        ).from(
          ".about-content-wrapper > *",
          {
            y: 40,
            opacity: 0,
            stagger: 0.15,
            ease: "power3.out",
          },
          0,
        );

        // Floating right image popping up
        gsap.from(".about-floating-img", {
          y: 100,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "top 30%",
            scrub: true,
          },
        });
      });

      // Tablet
      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        // Background giant text fading in
        gsap.from(".about-bg-text", {
          scale: 0.8,
          opacity: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
        });

        // On tablet, the elements are visible together so we synchronize them
        // similar to desktop but adjusting the trigger points for the stacked layout.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 65%",
            end: "top 20%",
            scrub: true,
          },
        });

        tl.from(
          ".about-image",
          {
            x: -150,
            opacity: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
              end: "top 25%",
              scrub: true,
            },
          },
          0,
        ).from(
          ".about-content-wrapper > *",
          {
            y: 40,
            opacity: 0,
            stagger: 0.15,
            ease: "power3.out",
          },
          0,
        );

        // Floating right image popping up
        gsap.from(".about-floating-img", {
          y: 100,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "top 40%",
            scrub: true,
          },
        });
      });

      // Mobile
      mm.add("(max-width: 767px)", () => {
        // Background giant text fading in
        gsap.from(".about-bg-text", {
          scale: 0.8,
          opacity: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            end: "top 40%",
            scrub: true,
          },
        });

        // Left image (stacked on top for mobile)
        gsap.from(".about-image", {
          x: -150,
          opacity: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-image",
            start: "top 85%",
            end: "top 45%",
            scrub: true,
          },
        });

        // Text content (below the image)
        gsap.from(".about-content-wrapper > *", {
          y: 40,
          opacity: 0,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-content-wrapper",
            start: "top 85%",
            end: "top 50%",
            scrub: true,
          },
        });

        // Floating right image popping up (at bottom right)
        gsap.from(".about-floating-img", {
          y: 100,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "bottom 100%",
            end: "bottom 80%",
            scrub: true,
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      className="py-16 md:py-22 w-full relative overflow-x-clip z-20 bg-black"
      ref={containerRef}
    >
      <div className="px-6 sm:px-10 lg:px-62 w-full mx-auto flex flex-col lg:flex-row justify-center gap-6 md:gap-10 lg:gap-24 items-center relative">
        <div className="about-bg-text absolute top-10 z-40 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-[56px] sm:text-4xl md:text-[105px] font-montserrat font-black tracking-wider uppercase mb-6 opacity-80 leading-tight bg-linear-to-r from-[#2e3330] to-[#171717] bg-clip-text text-transparent">
            Techzuno
          </h2>
        </div>

        <div className="about-image w-full md:w-2/3 lg:w-1/2 relative">
          <Image
            src={image || Assets.RoboticHead}
            alt=""
            priority
            className="w-full h-full object-cover"
          />
        </div>

        <div className="about-content-wrapper w-full lg:w-1/2 z-40">
          <HeaderBtn text="OUR COMPANY" />
          <SectionTitle className="mb-4 md:mb-6" title={title} />
          <SectionDescription description={description || "Searching for the top web development company in Kolkata? Our expert team delivers modern, responsive and user-friendly websites tailored to your business needs. From e-commerce stores to corporate sites, we provide complete website design services in Kolkata that boost your brand presence. Partner with us today to build a powerful online identity and reach more customers."}
          />

          <KnowMoreBtn text={buttonText || "Find More About Techzuno"} />
        </div>
      </div>
      <div className="about-floating-img absolute -bottom-30 md:bottom-15 lg:-bottom-20 -right-10 md:-right-10 lg:right-0 z-60 h-[160px] w-[160px] md:h-[240px] md:w-[240px] lg:h-[260px] lg:w-[260px] pointer-events-none">
        <Image
          alt=""
          src={Assets.HomeFigure}
          priority
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
