"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import SectionTitle from "../buttons/SectionTitle";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const data = [
    {
      question: "How long does it take to complete a project?",
      answer:
        "The timeline depends on the scope and complexity of the project. A standard website might take 2-4 weeks, while complex applications can take several months. We will provide a detailed timeline during the consultation.",
    },
    {
      question: "Do you provide post-launch support and maintenance?",
      answer:
        "Yes, we offer comprehensive post-launch support and maintenance packages to ensure your digital product remains secure, updated, and performs optimally over time.",
    },
    {
      question: "Can I customize my package or combine multiple services?",
      answer:
        "Absolutely! We understand that every business has unique needs. You can mix and match services to create a custom package that perfectly aligns with your goals.",
    },
    {
      question: "Can I customize my package or combine multiple services?",
      answer:
        "Absolutely! We understand that every business has unique needs. You can mix and match services to create a custom package that perfectly aligns with your goals.",
    },
  ];

  return (
    <section className="w-full relative z-10 pb-20 px-6 md:px-10 lg:px-62 mx-auto">
      <div className="flex flex-col items-center mb-16 text-center">
        <SectionTitle
          title={
            <>
              FREQUENTLY <span className="highlightedTextColor">ASKED</span>
              <br />
              <span className="text-[#03B8B8]">QUESTIONS</span> ABOUT PRICES
            </>
          }
        />
      </div>

      <div className="relative w-full max-w-4xl mx-auto">
        {/* Top Bracket Corners */}
        <div className="absolute top-0 left-0 w-8 h-4 border-t border-l border-white/30 rounded-tl-xl"></div>
        <div className="absolute top-0 right-0 w-8 h-4 border-t border-r border-white/30 rounded-tr-xl"></div>

        <div className="py-2 px-2 md:px-6">
          {data.map((faq, index) => (
            <div
              key={index}
              className={`border-b border-white/10 ${
                index === 0 ? "border-t border-white/10" : ""
              }`}
            >
              <button
                onClick={() => toggleOpen(index)}
                className="w-full flex items-center justify-between py-6 text-left focus:outline-none cursor-pointer"
              >
                <span className="text-white font-medium text-[15px] md:text-[16px] lg:text-[18px]">
                  {faq.question}
                </span>
                <span className="text-white/60 ml-4 shrink-0">
                  {openIndex === index ? (
                    <Minus size={20} />
                  ) : (
                    <Plus size={20} />
                  )}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 pb-6 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-white/60 text-sm md:text-base leading-relaxed pr-8">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bracket Corners */}
        <div className="absolute bottom-0 left-0 w-8 h-4 border-b border-l border-white/30 rounded-bl-xl"></div>
        <div className="absolute bottom-0 right-0 w-8 h-4 border-b border-r border-white/30 rounded-br-xl"></div>
      </div>
    </section>
  );
}

