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
  title: "IT Business Solutions | Custom ERP, CRM & SaaS Development - Techzuno",
  description: "Techzuno builds custom ERP, CRM, LMS, and SaaS solutions tailored to your business setup and budget — your local IT specialist in Kolkata.",
  url: "https://techzuno.com/business-solutions",
};


export default function BusinessSolutionsPage() {
  return (
    <main className="flex flex-col bg-black min-h-screen text-white overflow-">
      <BusinessHero
        headerbtn={"IT BUSINESS SOLUTIONS"}
        title={
          <>
            YOUR{" "}
            <span className="highlightedTextColor">
              LOCAL
              <br />
              IT
            </span>{" "}
            SPECIALIST
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
