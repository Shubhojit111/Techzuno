"use client";

import Assets from "@/Assets/Assets";
import Image from "next/image";
import HeaderBtn from "../buttons/HeaderBtn";
import SectionTitle from "../buttons/SectionTitle";
import GlowBtn from "../buttons/GlowBtn";
import { useState } from "react";
import {
  X,
  Check,
  ArrowRight,
  Loader2,
  Briefcase,
  Code2,
  Smartphone,
  Palette,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import { showCustomToast } from "../common/CustomToast";

const CTA_OPTIONS = [
  { label: "Career", icon: Briefcase },
  { label: "Web Development", icon: Code2 },
  { label: "App Development", icon: Smartphone },
  { label: "UI/UX Design", icon: Palette },
  { label: "Ecommerce Integration", icon: ShoppingCart },
  { label: "SEO & Performance Optimization", icon: TrendingUp },
];

function FloatField({
  label,
  value,
  onChange,
  type = "text",
  as = "input",
  required,
  rows,
}) {
  const Tag = as;
  return (
    <div className="relative">
      <Tag
        type={as === "input" ? type : undefined}
        rows={rows}
        required={required}
        placeholder=" "
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`peer w-full rounded-[4px] border border-[#c4c8cc] bg-white max-sm:px-3 max-sm:pb-2 max-sm:pt-3 max-sm:text-[15px] px-4 pb-2.5 pt-4 text-[16px] text-black shadow-sm outline-none transition-colors focus:border-[#03B8B8] ${
          as === "textarea" ? "resize-none" : ""
        }`}
      />
      <label className="pointer-events-none absolute max-sm:left-3 max-sm:top-3 max-sm:text-[15px] max-sm:peer-focus:top-[-8px] max-sm:peer-focus:text-[11px] max-sm:peer-[&:not(:placeholder-shown)]:top-[-8px] max-sm:peer-[&:not(:placeholder-shown)]:text-[11px] left-4 top-4 text-[16px] text-[#7a6685] transition-all duration-200 peer-focus:top-[-9px] peer-focus:bg-[#f6f8fa] peer-focus:px-1 peer-focus:text-[12px] peer-focus:text-[#03B8B8] peer-[&:not(:placeholder-shown)]:top-[-9px] peer-[&:not(:placeholder-shown)]:bg-[#f6f8fa] peer-[&:not(:placeholder-shown)]:px-1 peer-[&:not(:placeholder-shown)]:text-[12px]">
        {label}
      </label>
    </div>
  );
}

export default function CTA() {
  const [formState, setFormState] = useState("hidden"); // "hidden", "entering", "visible", "exiting"
  const [step, setStep] = useState(1); // 1, 2, 3 = success
  const [direction, setDirection] = useState(1); // 1 forward, -1 back
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const [form, setForm] = useState({
    service: CTA_OPTIONS[0].label,
    name: "",
    email: "",
    message: "",
  });

  const goToStep = (n) => {
    setDirection(n > step ? 1 : -1);
    setStep(n);
  };

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

      showCustomToast(
        "Message sent successful",
        "We will contact you soon.",
        "success",
      );

      goToStep(3); // inline success screen
      setForm({
        service: CTA_OPTIONS[0].label,
        name: "",
        email: "",
        message: "",
      });

      setTimeout(() => {
        handleClose();
      }, 2400);
    } catch (error) {
      showCustomToast(
        "Sending failed",
        error.message || "Unable to send message right now.",
        "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="h-[450px] md:h-[550px] lg:h-[600px] relative overflow-hidden pb-10 sm:pb-0">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Image
          src={Assets.CTABG}
          alt="image"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-6 sm:px-10  lg:px-62 mx-auto flex flex-col md:flex-row items-end h-full justify-center gap-6 md:gap-12 relative z-10 w-full">
        <div className="h-full border-0 w-full p-4 sm:p-6 lg:p-10 absolute top-0 left-0 flex justify-center items-start lg:items-start">
          <Image
            src={Assets.CTAImage}
            alt="Comma"
            className="object-contain w-full h-[60%] sm:h-[70%] lg:h-[90%]"
          />
        </div>

        <div className="textarea grid grid-cols-1 grid-rows-1 place-items-center sm:place-items-end  mt-50 mb-10 sm:mb-16 lg:mb-20 z-40 w-fit relative">
          {/* CTA Text Content */}
          <div
            className={`col-start-1 row-start-1 flex flex-col items-center text-center w-full transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
              formState === "hidden"
                ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                : "opacity-0 -translate-y-12 scale-95 pointer-events-none"
            }`}
          >
            <HeaderBtn text="Let's Make Great Things" />
            <SectionTitle
              title={
                <>
                  Have A Project? Speak <br className="hidden md:block" />
                  With Our <span className="text-[#03B8B8]">Experts</span>
                </>
              }
              className="uppercase text-center mt-0 md:mt-4 lg:mt-0"
            />
            <p className="text-[14px] sm:text-[18px] lg:text-[26px] mt-4 lg:mt-6 leading-tight text-center">
              Leave your contact details to get a free
              <br />
              consultation with a Techzuno expert.
            </p>
            <GlowBtn
              text="Get Started"
              className="mt-6 lg:mt-10"
              href={null}
              onClick={handleOpen}
            />
          </div>

          {/* Inline Form wrapper — unchanged */}
          <div
            className={`col-start-1  mx-auto row-start-1 w-full max-sm:max-w-full max-w-[550px] transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
              formState === "hidden"
                ? "opacity-0 -translate-x-[120%] pointer-events-none"
                : formState === "entering"
                  ? "opacity-0 -translate-x-[120%] pointer-events-none"
                  : formState === "visible"
                    ? "opacity-100 translate-x-0 pointer-events-auto"
                    : formState === "exiting"
                      ? "opacity-0 translate-x-[120%] pointer-events-none"
                      : ""
            }`}
          >
            {/* ====== The form ====== */}
            <div className="relative bg-[#f6f8fa] max-sm:p-4 max-sm:rounded-2xl p-8 md:px-8 md:py-8 rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,.35)] text-left w-full border border-[#e5e7eb]">
              <style jsx global>{`
                @keyframes formStepIn {
                  from {
                    opacity: 0;
                    transform: translateX(calc(28px * var(--dir, 1)));
                  }
                  to {
                    opacity: 1;
                    transform: translateX(0);
                  }
                }
                .form-step-anim {
                  animation: formStepIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
                }

                @keyframes formCheckPop {
                  0% {
                    transform: scale(0) rotate(-20deg);
                    opacity: 0;
                  }
                  60% {
                    transform: scale(1.15) rotate(4deg);
                    opacity: 1;
                  }
                  100% {
                    transform: scale(1) rotate(0);
                    opacity: 1;
                  }
                }
                .form-check-pop {
                  animation: formCheckPop 0.55s cubic-bezier(0.22, 1, 0.36, 1)
                    both;
                }

                @keyframes formGlowBreathe {
                  0%,
                  100% {
                    opacity: 0.35;
                    transform: scale(1);
                  }
                  50% {
                    opacity: 0.6;
                    transform: scale(1.03);
                  }
                }
                .form-glow-breathe {
                  animation: formGlowBreathe 4.5s ease-in-out infinite;
                }

                @media (prefers-reduced-motion: reduce) {
                  .form-step-anim,
                  .form-check-pop,
                  .form-glow-breathe {
                    animation: none !important;
                  }
                }
              `}</style>

              <span className="pointer-events-none max-sm:-inset-2 max-sm:blur-xl absolute -inset-3 -z-10 rounded-[2rem] bg-[#03B8B8]/25 form-glow-breathe blur-2xl" />

              <button
                type="button"
                onClick={handleClose}
                className="absolute max-sm:right-3 max-sm:top-3 max-sm:h-8 max-sm:w-8 right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#30233d] shadow transition-colors hover:bg-[#e9eeee] cursor-pointer z-10"
              >
                <X className="h-5 w-5 max-sm:h-4 max-sm:w-4" />
              </button>

              {step !== 3 && (
                <div className="max-sm:mb-5 max-sm:pr-12 mb-7 flex items-center gap-3 pr-8">
                  {[1, 2].map((n, i) => (
                    <div key={n} className="flex flex-1 items-center max-sm:gap-2 gap-3">
                      <div
                        className={`flex max-sm:h-7 max-sm:w-7 max-sm:text-[12px] h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-bold transition-all duration-500 ${
                          step > n
                            ? "bg-[#0aa7a7] text-white"
                            : step === n
                              ? "bg-[#0aa7a7] text-white max-sm:ring-2 ring-4 ring-[#0aa7a7]/25"
                              : "bg-[#e5e7eb] text-[#9a93a3]"
                        }`}
                      >
                        {step > n ? <Check className="h-4 w-4 max-sm:h-3.5 max-sm:w-3.5" /> : n}
                      </div>
                      {i === 0 && (
                        <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-[#e5e7eb]">
                          <div
                            className="h-full rounded-full bg-[#0aa7a7] transition-all duration-500"
                            style={{ width: step > 1 ? "100%" : "0%" }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {step === 1 ? (
                <div
                  key={1}
                  style={{ "--dir": direction }}
                  className="form-step-anim pr-0 md:pr-4"
                >
                  <h2 className="max-sm:text-[15px] max-sm:leading-snug text-[18px] font-bold uppercase tracking-wide text-[#3b254a]">
                    <span className="text-[#bbb8c5]">#1.</span> What Are You
                    Looking To Work On?
                  </h2>

                  {/* sm+: card grid */}
                  <div className="max-sm:hidden mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {CTA_OPTIONS.map(({ label, icon: Icon }) => {
                      const active = form.service === label;
                      return (
                        <button
                          key={label}
                          type="button"
                          onClick={() => updateField("service", label)}
                          className={`relative flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border px-3 py-4 text-center text-[12px] font-semibold leading-tight transition-all duration-300 ${
                            active
                              ? "border-[#0aa7a7] bg-[#0aa7a7] text-white shadow-md scale-[1.03]"
                              : "border-[#e2e5e9] bg-white text-[#5c5566] hover:border-[#0aa7a7]/50 hover:-translate-y-0.5"
                          }`}
                        >
                          {active && (
                            <span className="form-check-pop absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#0aa7a7] shadow">
                              <Check className="h-3 w-3" strokeWidth={3} />
                            </span>
                          )}
                          <Icon className="h-5 w-5" strokeWidth={1.75} />
                          {label}
                        </button>
                      );
                    })}
                  </div>

                  <div className="hidden max-sm:block max-sm:mt-5">
                    <label className="mb-2 block text-[13px] font-medium text-[#7a6685]">
                      Select a service
                    </label>
                    <div className="relative">
                      <select
                        value={form.service}
                        onChange={(e) => updateField("service", e.target.value)}
                        className="w-full appearance-none rounded-xl border border-[#0aa7a7]/50 bg-white px-4 py-3 pr-11 text-[14px] font-semibold text-[#30233d] shadow-sm outline-none transition-colors focus:border-[#0aa7a7] focus:ring-4 focus:ring-[#0aa7a7]/15 cursor-pointer"
                      >
                        {CTA_OPTIONS.map(({ label }) => (
                          <option key={label} value={label}>
                            {label}
                          </option>
                        ))}
                      </select>
                      <svg
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#0aa7a7]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <div className="max-sm:mt-6 max-sm:flex-col max-sm:items-stretch max-sm:gap-3 mt-10 flex items-center gap-8">
                    <button
                      type="button"
                      onClick={() => goToStep(2)}
                      className="max-sm:py-2.5 max-sm:px-6 max-sm:text-[14px] max-sm:w-full flex items-center justify-center gap-2 rounded-[4px] bg-[#0aa7a7] px-14 py-4 text-[18px] font-bold text-white transition-all hover:scale-[1.02] hover:bg-[#078f8f] cursor-pointer"
                    >
                      Next <ArrowRight className="max-sm:h-3.5 max-sm:w-3.5 h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="max-sm:text-[14px] max-sm:text-center text-[18px] font-medium text-[#2f3a3d] underline underline-offset-4 transition-colors hover:text-[#03B8B8] cursor-pointer"
                    >
                      Back
                    </button>
                  </div>
                </div>
              ) : step === 2 ? (
                <form
                  key={2}
                  style={{ "--dir": direction }}
                  className="form-step-anim pr-0 md:pr-4"
                  onSubmit={handleSubmit}
                >
                  <h2 className="max-sm:text-[15px] max-sm:leading-snug text-[18px] font-bold uppercase tracking-wide text-[#3b254a]">
                    <span className="text-[#bbb8c5]">#2.</span> Your Information
                  </h2>

                  <div className="max-sm:mt-4 max-sm:gap-3 mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FloatField
                      label="Name *"
                      value={form.name}
                      onChange={(v) => updateField("name", v)}
                      required
                    />
                    <FloatField
                      label="E-mail *"
                      type="email"
                      value={form.email}
                      onChange={(v) => updateField("email", v)}
                      required
                    />
                  </div>

                  <div className="max-sm:mt-4 mt-6">
                    <FloatField
                      as="textarea"
                      rows={3}
                      label="Message"
                      value={form.message}
                      onChange={(v) => updateField("message", v)}
                    />
                  </div>

                  <div className="max-sm:mt-5 max-sm:gap-3 mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-9">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="max-sm:py-2.5 max-sm:px-6 max-sm:text-[14px] max-sm:w-full flex items-center justify-center gap-2 rounded-[4px] bg-[#e62b24] px-14 py-4 text-[16px] font-bold text-white transition-all hover:scale-[1.02] hover:bg-[#ca211b] disabled:opacity-60 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="max-sm:h-3.5 max-sm:w-3.5 h-4 w-4 animate-spin" />{" "}
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => goToStep(1)}
                      className="max-sm:text-[14px] max-sm:text-center text-left text-[18px] font-medium text-[#2f3a3d] underline underline-offset-4 transition-colors hover:text-[#03B8B8] cursor-pointer"
                    >
                      Back
                    </button>
                  </div>
                </form>
              ) : (
                <div
                  key={3}
                  className="form-step-anim flex flex-col items-center py-6 text-center"
                >
                  <span className="form-check-pop max-sm:h-14 max-sm:w-14 flex h-16 w-16 items-center justify-center rounded-full bg-[#0aa7a7]/15 text-[#0aa7a7]">
                    <Check className="max-sm:h-7 max-sm:w-7 h-8 w-8" strokeWidth={2.5} />
                  </span>
                  <h3 className="mt-5 max-sm:text-[17px] text-[19px] font-bold text-[#3b254a]">
                    Message Sent
                  </h3>
                  <p className="mt-2 max-sm:text-[13px] max-w-[320px] text-[14px] text-[#7a6685]">
                    Thanks{form.name ? `, ${form.name}` : ""} — we&apos;ll be in
                    touch soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
