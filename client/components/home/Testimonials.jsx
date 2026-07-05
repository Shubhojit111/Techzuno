"use client";

import { Icon } from "@iconify/react";
import HeaderBtn from "../buttons/HeaderBtn";
import Assets from "@/Assets/Assets";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionArrowBtn from "../buttons/SectionArrowBtn";
import SectionTitle from "../buttons/SectionTitle";
import SectionDescription from "../buttons/SectionDescription";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Testimonials() {
  const triggerRef = useRef(null);
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const mobileSliderRef = useRef(null);

  const testimonials = [
    {
      name: "Tina Bohme",
      role: "Founder, Enzee",
      image: Assets.Human1,
      content:
        "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been",
      rating: 5,
    },
    {
      name: "Tina Bohme",
      role: "Founder, Enzee",
      image: Assets.Human1,
      content:
        "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been",
      rating: 5,
    },
    {
      name: "Tina Bohme",
      role: "Founder, Enzee",
      image: Assets.Human1,
      content:
        "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been",
      rating: 5,
    },
    {
      name: "Tina Bohme",
      role: "Founder, Enzee",
      image: Assets.Human1,
      content:
        "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been",
      rating: 5,
    },
    {
      name: "Tina Bohme",
      role: "Founder, Enzee",
      image: Assets.Human1,
      content:
        "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been",
      rating: 5,
    },
    // {
    //   name: "Tina Bohme",
    //   role: "Founder, Enzee",
    //   image:Assets.Human1,
    //   content: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been",
    //   rating: 5
    // },
    // {
    //   name: "Tina Bohme",
    //   role: "Founder, Enzee",
    //   image:Assets.Human1,
    //   content: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been",
    //   rating: 5
    // }
  ];

  useGSAP(
    () => {
      const container = cardsContainerRef.current;

      const mm = gsap.matchMedia();

      // Tablet View (768px - 1023px)
      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        const getScrollAmount = () => {
          const scrollWidth = container.scrollWidth;
          return -Math.max(0, scrollWidth - window.innerWidth);
        };

        const tween = gsap.to(container, {
          x: getScrollAmount,
          ease: "none",
        });

        ScrollTrigger.create({
          trigger: triggerRef.current,
          pin: sectionRef.current,
          start: "top 30%", // Pin lower on tablet
          // markers: true,
          end: () =>
            `+=${Math.max(0, container.scrollWidth - window.innerWidth)}`,
          animation: tween,
          scrub: 1,
          invalidateOnRefresh: true,
        });
      });

      // Desktop View (1024px and up)
      mm.add("(min-width: 1024px)", () => {
        const getScrollAmount = () => {
          const scrollWidth = container.scrollWidth;
          return -Math.max(0, scrollWidth - window.innerWidth);
        };

        const tween = gsap.to(container, {
          x: getScrollAmount,
          ease: "none",
        });

        ScrollTrigger.create({
          trigger: triggerRef.current,
          pin: sectionRef.current,
          start: "top 6%", // Pinned a little lower for desktop
          // markers: true,
          end: () =>
            `+=${Math.max(0, container.scrollWidth - window.innerWidth)}`,
          animation: tween,
          scrub: 1,
          invalidateOnRefresh: true,
        });
      });
    },
    { scope: triggerRef },
  );

  return (
    <div ref={triggerRef} className="w-full shrink-0 ">
      <section
        className="bg-black overflow-hidden w-full relative my-6 md:my-16 lg:my-24"
        ref={sectionRef}
      >
        <div className="mx-auto px-6 md:px-10 lg:px-62  relative z-[60]">
          <div className="max-w-full md:max-w-[70%] lg:max-w-[60%]">
            <HeaderBtn text="CLIENT TESTIMONIALS" />
            <SectionTitle className="mb-4 md:mb-6" title={<>
              WHAT OUR CLIENT <br /> SAY ABOUT{" "}
              <span className="text-[#38FFF2]">TECHZUNO</span>
            </>} />
            <SectionDescription description={<>
              We Go Beyond Maintaining Operations We Empower Businesses With
              Data, Insights, And Best Practices To Stay Ahead In An
              Ever-Evolving Digital Landscape.
            </>} />
          </div>
        </div>

        {/* Cards Container */}
        <div className="overflow-hidden  w-full relative z-10 ">
          <SectionArrowBtn sliderRef={mobileSliderRef} />
          <div
            ref={mobileSliderRef}
            className="overflow-x-auto md:overflow-visible scrollbar-hide scroll-smooth snap-x snap-mandatory"
          >
            <div
              ref={cardsContainerRef}
              className="flex gap-4 md:gap-6 w-max pb-8 pr-6 md:pr-10 lg:pr-62 transition-transform duration-300 ease-out pl-6 md:pl-0"
            >
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className={`snap-center bg-[#daf2f8] border rounded-[16px] p-6 md:p-8 pb-8 md:pb-10 relative overflow-hidden flex flex-col justify-between h-[380px] md:h-[420px] w-[calc(100vw-48px)] md:w-[500px] lg:w-[440px] shrink-0 shadow-lg ${idx === 0 ? "md:ml-10 lg:ml-62" : ""}`}
              >
                <div className="absolute top-0 left-0 h-full w-full">
                  <Image
                    src={Assets.Group492}
                    alt="Group 492"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="relative z-10 flex-1">
                  <div className="mb-6 md:mb-8">
                    {/* Custom 99 Quotes SVG */}
                    <Image
                      src={Assets.CommaIcon}
                      alt="ef"
                      className="h-8 md:h-10 w-auto"
                    />
                  </div>

                  <p className="text-[#00aeb6] w-[75%] md:w-[65%] text-[16px] md:text-[20px] font-medium italic leading-[22px] md:leading-[24px] mb-4 md:pr-8">
                    {testimonial.content}
                  </p>

                  <div className="flex text-[#ffb800] mb-8 md:mb-14 gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 md:w-5 md:h-5 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <h4 className="font-bold text-[#1e293b] tracking-wide text-[14px] md:text-[15px]">
                    {testimonial.name}
                  </h4>
                  <p className="text-[#475569] tracking-wide text-xs mt-1">
                    {testimonial.role}
                  </p>
                </div>

                {/* Large Circular Profile Image */}
                <div className="absolute overflow-hidden z-10 bottom-0 right-0 h-48 md:h-56 w-[200px] sm:w-[250px] md:w-[auto]">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name || "Testimonials"}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>
    </div>
  );
}
