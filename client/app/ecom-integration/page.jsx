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




export default function EcomIntegrationPage() {
  return (
    <main className="flex flex-col bg-black min-h-screen text-white overflow-">
      <BusinessHero
        headerbtn={"Ecommerce Integration"}
        title={
          <>
            Make{" "}
            <span className="highlightedTextColor">
              Data-
              <br />
              Driven
            </span>{" "}
            And
            <br />
            Drives Hi
          </>
        }
        description={
          "We provide a fully customised service, designed to meet your specific IT requirements, business set up and budget."
        }
        image={Assets.Ecom1}
        buttonText={"Let's Discuss Your Needs"}
      />

      <TechStack />
      <ServicesGrid />
      <WhatYouGet />
      <WhyChoose cardImage1={Assets.Ecom2} cardImage2={Assets.Ecom3} cardImage3={Assets.Ecom4}/>
      <FAQ  />
      <ClientSuccess />
      <CTA />
      {/*

      <h1 className="mx-auto text-center text-7xl mt-32">Ecommerce Integration Page</h1>
       */}
       
    </main>
  );
}
