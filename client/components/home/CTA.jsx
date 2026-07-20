"use client";

import Assets from "@/Assets/Assets";
import Image from "next/image";
import HeaderBtn from "../buttons/HeaderBtn";
import SectionTitle from "../buttons/SectionTitle";
import GlowBtn from "../buttons/GlowBtn";
import { useState } from "react";
import { X } from "lucide-react";
import { showCustomToast } from "../common/CustomToast";

const CTA_OPTIONS = [
  "Career",
  "Web Development",
  "App Development",
  "UI/UX Design",
  "Ecommerce Integration",
  "SEO & Performance Optimization",
];

export default function CTA() {
  const [formState, setFormState] = useState("hidden"); // "hidden", "entering", "visible", "exiting"
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  
  const [form, setForm] = useState({
    service: CTA_OPTIONS[0],
    name: "",
    email: "",
    message: "",
  });

  const handleOpen = () => {
    setStep(1);
    setFormState("entering");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFormState("visible");
      });
    });
  };

  const handleClose = () => {
    setFormState("exiting");
    setTimeout(() => {
      setFormState("hidden");
      setStatus({ type: "", message: "" });
      setStep(1);
    }, 700);
  };

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "CTA Inline Form",
          inquiry: "Services",
          service: form.service,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to send message right now.");
      }

      showCustomToast("Message sent successful", "We will contact you soon.", "success");
      setForm({
        service: CTA_OPTIONS[0],
        name: "",
        email: "",
        message: "",
      });
      
      setTimeout(() => {
        handleClose();
      }, 3000);
      
    } catch (error) {
      showCustomToast("Sending failed", error.message || "Unable to send message right now.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="h-[450px] md:h-[550px] lg:h-[600px] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Image
          src={Assets.CTABG}
          alt="image"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-6 sm:px-10 lg:px-62 mx-auto flex flex-col md:flex-row items-end h-full justify-center gap-6 md:gap-12 relative z-10 w-full">
        <div className="h-full border-0 w-full p-4 sm:p-6 lg:p-10 absolute top-0 left-0 flex justify-center items-start lg:items-start">
          <Image
            src={Assets.CTAImage}
            alt="Comma"
            className="object-contain w-full h-[60%] sm:h-[70%] lg:h-[80%]"
          />
        </div>

        <div className="textarea grid grid-cols-1 grid-rows-1 place-items-center mt-50 mb-10 sm:mb-16 lg:mb-20 z-40 w-full relative">
          
          {/* CTA Text Content */}
          <div 
            className={`col-start-1 row-start-1 flex flex-col items-center text-center w-full transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
              formState === "hidden" 
                ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" 
                : "opacity-0 -translate-y-12 scale-95 pointer-events-none"
            }`}
          >
            <HeaderBtn text="Let's make great things" />
            <SectionTitle
              title={
                <>
                  Have a project? Speak
                  <br className="hidden md:block" />
                  With our <span className="text-[#03B8B8]">experts</span>
                </>
              }
              className="uppercase text-center mt-0 md:mt-4 lg:mt-0"
            />
            <p className="text-[14px] sm:text-[18px] lg:text-[26px] mt-4 lg:mt-6 leading-tight text-center">
              Leave Your Contact Details To Get A Free
              <br />
              Consultation With A Techzuno Expert.
            </p>
            <GlowBtn
              text="Get Started"
              className="mt-6 lg:mt-10"
              href={null}
              onClick={handleOpen}
            />
          </div>

          {/* Inline Form */}
          <div 
            className={`col-start-1 row-start-1 w-full max-w-[550px] transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
              formState === "hidden" ? "opacity-0 -translate-x-[120%] pointer-events-none" :
              formState === "entering" ? "opacity-0 -translate-x-[120%] pointer-events-none" :
              formState === "visible" ? "opacity-100 translate-x-0 pointer-events-auto" :
              formState === "exiting" ? "opacity-0 translate-x-[120%] pointer-events-none" : ""
            }`}
          >
            <div className="bg-[#f6f8fa] p-8 md:px-8 md:py-8 rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,.35)] text-left relative w-full border border-[#e5e7eb]">
              <button
                type="button"
                onClick={handleClose}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#30233d] shadow transition-colors hover:bg-[#e9eeee] cursor-pointer z-10"
              >
                <X className="h-5 w-5" />
              </button>

              <div key={step} className="modal-step">
                {step === 1 ? (
                  <div className="pr-0 md:pr-4">
                    <h2 className="text-[18px] font-bold uppercase tracking-wide text-[#3b254a]">
                      <span className="text-[#bbb8c5]">#1.</span> What Are You Looking To Work On?
                    </h2>

                    <div className="mt-8">
                      <label className="mb-3 block text-[16px] font-medium text-[#7a6685]">
                        Select Services
                      </label>
                      <select
                        value={form.service}
                        onChange={(e) => updateField("service", e.target.value)}
                        className="w-full rounded-[4px] border border-[#03B8B8] bg-white px-4 py-4 text-[17px] text-black shadow-sm outline-none transition-colors focus:border-[#029595] cursor-pointer"
                      >
                        {CTA_OPTIONS.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mt-10 flex items-center gap-8">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="rounded-[4px] bg-[#0aa7a7] px-14 py-4 text-[18px] font-bold text-white transition-colors hover:bg-[#078f8f] cursor-pointer"
                      >
                        Next
                      </button>
                      <button
                        type="button"
                        onClick={handleClose}
                        className="text-[18px] font-medium text-[#2f3a3d] underline underline-offset-4 transition-colors hover:text-[#03B8B8] cursor-pointer"
                      >
                        Back
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="pr-0 md:pr-4">
                    <h2 className="text-[18px] font-bold uppercase tracking-wide text-[#3b254a]">
                      <span className="text-[#bbb8c5]">#2.</span> Your Information
                    </h2>

                    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-[16px] font-medium text-[#7a6685]">
                          Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => updateField("name", e.target.value)}
                          className="w-full rounded-[4px] border border-[#c4c8cc] bg-white px-4 py-4 text-black shadow-sm outline-none transition-colors focus:border-[#03B8B8]"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-[16px] font-medium text-[#7a6685]">
                          E-mail *
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          className="w-full rounded-[4px] border border-[#c4c8cc] bg-white px-6 py-4 text-black shadow-sm outline-none transition-colors focus:border-[#03B8B8]"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="mb-1.5 block text-[16px] font-medium text-[#7a6685]">
                        Message
                      </label>
                      <textarea
                        rows="3"
                        value={form.message}
                        onChange={(e) => updateField("message", e.target.value)}
                        className="w-full rounded-[4px] border border-[#c4c8cc] bg-white px-6 py-4 text-black shadow-sm outline-none transition-colors focus:border-[#03B8B8] resize-none"
                      />
                    </div>

                    <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-9">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-[4px] bg-[#e62b24] px-14 py-4 text-[16px] font-bold text-white transition-colors hover:bg-[#ca211b] disabled:opacity-60 cursor-pointer"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-left text-[18px] font-medium text-[#2f3a3d] underline underline-offset-4 transition-colors hover:text-[#03B8B8] cursor-pointer"
                      >
                        Back
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
