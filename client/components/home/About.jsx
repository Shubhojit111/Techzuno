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

export default function About({image, title,  description, buttonText}) {
  const containerRef = useRef(null);



  return (
    <section
      className="py-16 md:py-22 lg:py-36 w-full relative overflow-x-clip z-20 bg-black"
      ref={containerRef}
    >
      <div className="px-6 sm:px-10 lg:px-62 w-full mx-auto flex flex-col lg:flex-row justify-center gap-6 md:gap-10 lg:gap-18 items-end relative  h-[500px]">
        <div className="about-bg-text  absolute top-2 z-40 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-[56px] sm:text-4xl md:text-[105px] font-montserrat font-black tracking-wider uppercase mb-6 opacity-80 leading-tight bg-linear-to-r from-[#2e3330] to-[#171717] bg-clip-text text-transparent">
            Techzuno
          </h2>
        </div>

        <div className="about-image w-full md:w-2/3 lg:w-1/2  relative">
          <Image
            src={image || Assets.RoboticHead}
            alt="Techzuno Robotic Head"
            className="lg:max-w-[450px] h-full object-cover"
          />
        </div>

        <div className="about-content-wrapper  w-full lg:w-1/2 z-40">
          <HeaderBtn text="OUR COMPANY" className="mb-4 md:mb-2" />
          <SectionTitle className="mb-4 md:mb-6" title={title} />
          <SectionDescription description={description || "Searching for the top web development company in Kolkata? Our expert team delivers modern, responsive and user-friendly websites tailored to your business needs. From e-commerce stores to corporate sites, we provide complete website design services in Kolkata that boost your brand presence. Partner with us today to build a powerful online identity and reach more customers."} />

          <KnowMoreBtn text={buttonText || "Find More About Techzuno"} />
        </div>
      </div>
     
    </section>
  );
}
