"use client";

import React, { useMemo, useState } from "react";
import HeaderBtn from "@/components/buttons/HeaderBtn";
import SectionTitle from "@/components/buttons/SectionTitle";
import { Icon } from "@iconify/react";
import { FAQData } from "@/data/FAQData";

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return FAQData;

    return FAQData.filter((faq) =>
      `${faq.question} ${faq.answer}`.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const faqColumns = useMemo(
    () => [
      filteredFaqs.filter((_, index) => index % 2 === 0),
      filteredFaqs.filter((_, index) => index % 2 !== 0),
    ],
    [filteredFaqs],
  );

  const toggleAccordion = (question) => {
    setOpenQuestion((currentQuestion) =>
      currentQuestion === question ? null : question,
    );
  };

  const renderFaqCard = (faq) => {
    const isOpen = openQuestion === faq.question;

    return (
      <div
        key={faq.question}
        className={`rounded-xl border border-white/5 overflow-hidden transition-colors duration-300 bg-linear-to-b ${
          isOpen ? "from-[#222222] to-[#111111]" : "from-[#1a1a1a] to-[#0f0f0f]"
        }`}
      >
        <button
          type="button"
          onClick={() => toggleAccordion(faq.question)}
          className="w-full flex min-h-[100px] items-center justify-between p-5 md:p-6 text-left group cursor-pointer"
          aria-expanded={isOpen}
        >
          <h3 className="text-white font-medium text-[16px] md:text-[20px] leading-snug pr-4">
            {faq.question}
          </h3>
          <Icon
            icon={isOpen ? "mdi:minus" : "mdi:plus"}
            className="text-white text-2xl shrink-0 transition-colors"
          />
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-5 md:px-6 pb-6 max-w-[95%] text-white/80 text-[14px] md:text-[14px] leading-relaxed mx-0">
            {faq.answer}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-black py-20 min-h-screen pt-20 md:pt-18 lg:mt-26">
      <div className="w-full mx-auto px-6 sm:px-10 lg:px-62">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <h1 className="text-white text-[70px] md:text-[72px] lg:text-[96px] font-bold tracking-widest">
            FAQS
          </h1>
          <p className="text-white/70 text-xl lg:text-xs mx-auto mb-16">
            An FAQ Page Is A Webpage Of The Questions Most Often Asked{" "}
            <span className="">
              By Your <br /> Prospective And Current Customers
            </span>
          </p>

          {/* Search Bar */}
          <form
            className="w-full mb-12 flex flex-col md:block gap-4"
            onSubmit={(event) => event.preventDefault()}
          >
            <div
              className="relative w-full p-2 md:p-3 bg-[#121919] rounded-full
             border-linear-to-b from-white/30 md:from-[#0be4e4] to-transparent border-2"
            >
              <div className="flex items-center w-full bg-linear-to-b from-[#2F4545] to-[#282C2C] border border-white/10 rounded-full py-3 md:py-0">
                <div className="w-full flex items-center justify-center pl-6 md:pl-8 ">
                  <Icon icon="mdi:magnify" className="text-white/50 h-6 w-6" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search"
                    className="w-full bg-transparent border-none outline-none text-white text-lg px-2 placeholder-white/50"
                  />
                </div>
                <button className="hidden md:block bg-[#03B8B8] hover:bg-cyan-400 transition-colors text-white px-12 py-4 rounded-full text-xl tracking-widest font-medium shrink-0">
                  Search
                </button>
              </div>
            </div>

            <button className="md:hidden w-full bg-[#03B8B8] hover:bg-cyan-400 transition-colors text-white py-3.5 rounded-full text-xl tracking-widest font-bold">
              Search
            </button>
          </form>

          <p className="text-white/60 text-xs">
            Please Call Our Office At{" "}
            <a
              href="tel:+916291815773"
              className="underline underline-offset-2"
            >
              +91 6291815773
            </a>{" "}
            Or{" "}
            <a
              href="mailto:info@techzuno.com"
              className="underline underline-offset-2"
            >
              Email Us
            </a>{" "}
            With Your Question
          </p>
        </div>

        {/* Section Title */}
        <div className="flex flex-col items-center text-left lg:text-center mb-12">
          <HeaderBtn text="FREQUENTLY ASKED QUESTIONS" className="mb-0" />
          <SectionTitle
            className="mt-2"
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
        {filteredFaqs.length > 0 ? (
          <>
            <div className="flex flex-col gap-4 mb-16 w-full md:hidden">
              {filteredFaqs.map(renderFaqCard)}
            </div>

            <div className="hidden md:grid md:grid-cols-2 gap-4 lg:gap-6 mb-16 w-full mx-auto items-start">
              {faqColumns.map((columnFaqs, columnIndex) => (
                <div key={columnIndex} className="flex flex-col gap-4 lg:gap-6">
                  {columnFaqs.map(renderFaqCard)}
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="py-12 text-center text-sm uppercase tracking-[0.25em] text-white/50">
            No FAQs found
          </p>
        )}

        {/* Bottom Contact Text */}
        <div className="text-center text-white/60 text-xs pb-20">
          Please Call Our Office At{" "}
          <a href="tel:+916291815773" className="underline underline-offset-2">
            +91 6291815773
          </a>{" "}
          Or{" "}
          <a
            href="mailto:info@techzuno.com"
            className="underline underline-offset-2"
          >
            Email Us
          </a>{" "}
          With Your Question
        </div>
      </div>
    </section>
  );
};

export default FAQ;
