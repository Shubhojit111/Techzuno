import Assets from "@/Assets/Assets";
import AboutHeader from "@/components/about/AboutHeader";
import CompanySection from "@/components/about/CompanySection";
import MilestonesSection from "@/components/about/MilestonesSection";
import SliderSection from "@/components/about/SliderSection";
import ValuesSection from "@/components/about/ValuesSection";
import About from "@/components/home/About";
import CTA from "@/components/home/CTA";
import TechStack from "@/components/home/TechStack";
import React from "react";

export default function AboutPage() {
  return (
    <div className="flex flex-col h-full pt-16 md:pt-24 lg:pt-24 ">
      <AboutHeader />
      
      <About
        image={Assets.Aboutimg}
        title={
          <>
            THE INDIA&apos;S <br /> LEADING{" "}
            <span className="text-[#38FFF2]">
              WEB & <br /> APP{" "}
            </span>
            DEVELOPMENT <br /> COMPANY.
          </>
        }
        description={`Founded with a passion for digital innovation, Techzuno delivers high-quality web and mobile app solutions tailored to modern business needs. From startups to scaling enterprises, we help brands build fast, functional, and beautifully designed digital products We specialize in technologies like Next.js, React, Python, WordPress, and Shopify, crafting every solution with precision and care. With a focus on performance, clean design, and scalability, our work is built to grow with you — not around you. At Techzuno, we don&apos;t just write code — we help you turn ideas into impact through smart development and honest collaboration`}
        buttonText="Download Company Profile"
      />
      
      {/* 
      */}
      <CompanySection /> 
      <SliderSection/> 
      <ValuesSection />
      <TechStack />
      
      <MilestonesSection />
      <CTA />
      {/* 
      */}
    </div>
  );
};

