"use client";
import React, { useState } from "react";
import HeaderBtn from "@/components/buttons/HeaderBtn";
import SectionTitle from "@/components/buttons/SectionTitle";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Assets from "@/Assets/Assets";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How long does it take to complete a project?",
      answer:
        "Yes, We Offer Reliable And Secure Website Hosting Solutions Tailored To Your Business Needs. Our Hosting Includes Regular Backups, High Uptime, And Technical Support To Ensure Your Website Runs Smoothly At All Times.",
    },
    {
      question: "How long does it take to complete a project?",
      answer:
        "Yes, We Offer Reliable And Secure Website Hosting Solutions Tailored To Your Business Needs. Our Hosting Includes Regular Backups, High Uptime, And Technical Support To Ensure Your Website Runs Smoothly At All Times.",
    },
    {
      question: "How long does it take to complete a project?",
      answer:
        "Yes, We Offer Reliable And Secure Website Hosting Solutions Tailored To Your Business Needs. Our Hosting Includes Regular Backups, High Uptime, And Technical Support To Ensure Your Website Runs Smoothly At All Times.",
    },
    {
      question: "How long does it take to complete a project?",
      answer:
        "Yes, We Offer Reliable And Secure Website Hosting Solutions Tailored To Your Business Needs. Our Hosting Includes Regular Backups, High Uptime, And Technical Support To Ensure Your Website Runs Smoothly At All Times.",
    },
    {
      question: "How long does it take to complete a project?",
      answer:
        "Yes, We Offer Reliable And Secure Website Hosting Solutions Tailored To Your Business Needs. Our Hosting Includes Regular Backups, High Uptime, And Technical Support To Ensure Your Website Runs Smoothly At All Times.",
    },
    {
      question: "How long does it take to complete a project?",
      answer:
        "Yes, We Offer Reliable And Secure Website Hosting Solutions Tailored To Your Business Needs. Our Hosting Includes Regular Backups, High Uptime, And Technical Support To Ensure Your Website Runs Smoothly At All Times.",
    },
    {
      question: "How long does it take to complete a project?",
      answer:
        "Yes, We Offer Reliable And Secure Website Hosting Solutions Tailored To Your Business Needs. Our Hosting Includes Regular Backups, High Uptime, And Technical Support To Ensure Your Website Runs Smoothly At All Times.",
    },
    {
      question: "How long does it take to complete a project?",
      answer:
        "Yes, We Offer Reliable And Secure Website Hosting Solutions Tailored To Your Business Needs. Our Hosting Includes Regular Backups, High Uptime, And Technical Support To Ensure Your Website Runs Smoothly At All Times.",
    },
    {
      question: "How long does it take to complete a project?",
      answer:
        "Yes, We Offer Reliable And Secure Website Hosting Solutions Tailored To Your Business Needs. Our Hosting Includes Regular Backups, High Uptime, And Technical Support To Ensure Your Website Runs Smoothly At All Times.",
    },
    {
      question: "How long does it take to complete a project?",
      answer:
        "Yes, We Offer Reliable And Secure Website Hosting Solutions Tailored To Your Business Needs. Our Hosting Includes Regular Backups, High Uptime, And Technical Support To Ensure Your Website Runs Smoothly At All Times.",
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-black py-20 min-h-screen  pt-20 md:pt-34 lg:pt-46">
      <div className="w-full mx-auto px-6 sm:px-10 lg:px-62">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <h1 className="text-white text-5xl md:text-7xl lg:text-[96px] font-bold tracking-widest mb-4">
            FAQS
          </h1>
          <p className="text-white/70 text-xs mx-auto mb-10">
            An FAQ Page Is A Webpage Of The Questions Most Often Asked By Your{" "}
            <br /> Prospective And Current Customers
          </p>

          {/* Search Bar */}
          <div
            className="relative w-full mb-12 p-3 bg-[#121919] rounded-full
           border-linear-to-b from-[#0be4e4] to-transparent border-2"
          >
            <div className="flex items-center w-full bg-linear-to-b from-[#2F4545] to-[#282C2C] border border-white/10 rounded-full ">
              <div className="w-full flex items-center justify-center pl-8 ">
                <Icon icon="mdi:magnify" className="text-white/50 h-6 w-6" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full bg-transparent border-none outline-none text-white text-lg px-2 placeholder-white/50"
                />
              </div>
              <button className="bg-[#03B8B8] hover:bg-cyan-400 transition-colors text-white px-12 py-4 rounded-full text-xl tracking-widest font-medium">
                Search
              </button>
            </div>
          </div>

          <p className="text-white/60 text-xs">
            Please Call Our Office At{" "}
            <a
              href="tel:+916290340824"
              className="underline underline-offset-2"
            >
              +91 6290340824
            </a>{" "}
            Or{" "}
            <a href="#" className="underline underline-offset-2">
              Email Us
            </a>{" "}
            With Your Question
          </p>
        </div>

        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-12">
          <HeaderBtn text="FREQUENTLY ASKED QUESTIONS" />
          <SectionTitle
            className="mt-6"
            title={
              <>
                THE TOP 10 MOST FAQS{" "}
                <span className="text-[#38FFF2]">ABOUT</span>
                <br className="hidden md:block" />
                <span className="text-[#38FFF2]">CUSTOMER</span> EXPERIENCE
              </>
            }
          />
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-16 max-w-6xl mx-auto ">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-[12px] border border-white/5 overflow-hidden transition-all duration-300 bg-gradient-to-b ${
                openIndex === index
                  ? "from-[#222222] to-[#111111]"
                  : "from-[#1a1a1a] to-[#0f0f0f]"
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left group"
              >
                <h3 className="text-white font-medium text-[16px] md:text-[20px] pr-4">
                  {faq.question}
                </h3>
                <Icon
                  icon={openIndex === index ? "mdi:minus" : "mdi:plus"}
                  className={`text-white text-2xl shrink-0 transition-colors`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-5 md:px-6 pb-6 text-white/80 text-[14px] md:text-[16px] leading-relaxed mx-0">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Contact Text */}
        <div className="text-center text-white/60 text-xs pb-20">
          Please Call Our Office At{" "}
          <a href="tel:+916290340824" className="underline underline-offset-2">
            +91 6290340824
          </a>{" "}
          Or{" "}
          <a href="#" className="underline underline-offset-2">
            Email Us
          </a>{" "}
          With Your Question
        </div>
      </div>
    </section>
  );
};

export default FAQ;
