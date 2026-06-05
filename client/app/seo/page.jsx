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




export default function SeoPage() {
  return (
    <main className="flex flex-col bg-black min-h-screen text-white overflow-">
      <BusinessHero
        headerbtn={"SEO & Performance Optimization"}
        title={
          <>
            Quality{" "}
            <span className="highlightedTextColor">
              Testing
              <br />
              Included
            </span>{" "}
            In Ev
          </>
        }
        description={
          "We provide a fully customised service, designed to meet your specific IT requirements, business set up and budget."
        }
        image={Assets.BusinessSolutions1}
        buttonText={"Let's Discuss Your Needs"}
      />

      {/*
       */}
      <TechStack />
      <ServicesGrid />
      <WhatYouGet />
      <WhyChoose />
      <FAQ  />
      <ClientSuccess />
      <CTA />
      {/*
       */}
    </main>
  );
}
