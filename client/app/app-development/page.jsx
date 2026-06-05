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


export default function AppDevelopmentPage() {
  return (
    <main className="flex flex-col bg-black min-h-screen text-white overflow-">
      <BusinessHero
        headerbtn={"App Development"}
        title={  
          <>
            Mobile{" "}
            <span className="highlightedTextColor">
              App 
              <br />
              Development
            </span>{" "}
             Company
          </>
        }
        image={Assets.BusinessSolutions1}
      />

      {/*
       */}
      <TechStack />
      <ServicesGrid />
      <WhatYouGet />
      <WhyChoose />
      <FAQ />
      <ClientSuccess />
      <CTA />
      {/*
       */}
    </main>
  );
}
