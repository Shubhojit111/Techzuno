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
  title: "SEO & Performance Optimization Services | Techzuno",
  description: "Techzuno's SEO and performance team helps your site rank higher, load faster, and convert more — technical SEO, content, and AEO/GEO readiness included.",
  url: "https://techzuno.com/seo",
};


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
        image={Assets.SEO1}
        buttonText={"Let's Discuss Your Needs"}
      />


      <TechStack />
      <ServicesGrid />
      <WhatYouGet />
      <WhyChoose cardImage1={Assets.SEO2} cardImage2={Assets.SEO3} cardImage3={Assets.SEO4}/>
      <FAQ  />
      <ClientSuccess />
      <CTA />
      {/*

      <h1 className="mx-auto text-center text-7xl mt-32">SEO & Performance Optimization Page</h1>
      */}
    </main>
  );
}
