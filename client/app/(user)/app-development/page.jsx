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
  title: "Mobile App Development Company | Techzuno",
  description: "Techzuno designs and builds native and cross-platform mobile apps — from first wireframe to App Store launch — for startups and growing businesses.",
  url: "https://techzuno.com/app-development",
};

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
        image={Assets.AppDev1}
      />
      <TechStack />
      <ServicesGrid />
      <WhatYouGet />
      <WhyChoose cardImage1={Assets.AppDev2} cardImage2={Assets.AppDev3} cardImage3={Assets.AppDev4}/>
      <FAQ />
      <ClientSuccess />
      <CTA />
      {/*

      <h1 className="mx-auto text-center text-7xl mt-32">App Development Page</h1>
       */}
    </main>
  );
}
