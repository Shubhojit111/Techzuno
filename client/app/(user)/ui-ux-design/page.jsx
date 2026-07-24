"use client";

import React from "react";
import BusinessHero from "@/components/business-solutions/BusinessHero";
import ServicesGrid from "@/components/business-solutions/ServicesGrid";
import WhatYouGet from "@/components/business-solutions/WhatYouGet";
import WhyChoose from "@/components/business-solutions/WhyChoose";
import ClientSuccess from "@/components/business-solutions/ClientSuccess";
import FAQ from "@/components/pricing/FAQ";
import CTA from "@/components/home/CTA";
import Assets from "@/Assets/Assets";
import TechStack from "@/components/home/TechStack";

export const metadata = {
  title: "UI/UX Design Services | Techzuno",
  description: "Research-led UI/UX design from Techzuno — wireframes, prototypes, and interfaces built around how your users actually behave, not guesswork.",
  url: "https://techzuno.com/ui-ux-design",
};


export default function UiUxDesignPage() {
  return (
    <main className="flex flex-col bg-black min-h-screen text-white overflow-">
      <BusinessHero
        headerbtn={"Ui/UX Design"}
        title={  
          <>
            Designing{" "}
            <span className="highlightedTextColor">
              Ideas 
              <br />
              into
            </span>{" "}
             Possibilities
          </>
        }
        image={Assets.UIUX1}
      />

      {/*
       */}
      <TechStack />
      <ServicesGrid />
      <WhatYouGet />
      <WhyChoose cardImage1={Assets.UIUX2} cardImage2={Assets.UIUX3} cardImage3={Assets.UIUX4}/>
      <FAQ />
      <ClientSuccess />
      <CTA />
      {/*
       */}
    </main>
  );
}
