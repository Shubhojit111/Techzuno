"use client";

import { SERVICE_OPTIONS } from "@/data/serviceOptions";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const initialForm = {
  service: SERVICE_OPTIONS[1],
  name: "",
  email: "",
  message: "",
};

export default function InquiryModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsVisible(false);
      return;
    }

    setStep(1);
    setStatus({ type: "", message: "" });
    document.body.style.overflow = "hidden";

    // Trigger entrance animation on next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    });

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

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
          source: "CTA modal",
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

      setStatus({
        type: "success",
        message: "Message sent successfully. We will contact you soon.",
      });
      setForm(initialForm);
      setStep(1);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Unable to send message right now.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex justify-end transition-all duration-300 ${
        isVisible ? "bg-black/70 backdrop-blur-sm" : "bg-black/0 backdrop-blur-none"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`relative h-full w-full max-w-[450px] md:max-w-[500px] bg-[#f3f6f8] p-6 text-[#30233d] shadow-2xl md:p-10 transition-transform duration-500 ease-in-out overflow-y-auto ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#30233d] shadow transition-colors hover:bg-[#e9eeee] cursor-pointer"
          aria-label="Close inquiry modal"
        >
          <X className="h-5 w-5" />
        </button>

        {step === 1 ? (
          <div className="pr-0 md:pr-8">
            <h2 className="text-[18px] font-bold uppercase tracking-wide text-[#3b254a]">
              <span className="text-[#bbb8c5]">#1.</span> What Are You Looking To Work On?
            </h2>

            <div className="mt-8">
              <label className="mb-3 block text-[16px] font-medium text-[#7a6685]">
                Select Services
              </label>
              <select
                value={form.service}
                onChange={(event) => updateField("service", event.target.value)}
                className="w-full rounded-[4px] border border-[#03B8B8] bg-white px-6 py-4 text-[17px] text-black shadow-sm outline-none transition-colors focus:border-[#029595] cursor-pointer"
              >
                {SERVICE_OPTIONS.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            {status.message ? (
              <p
                className={`mt-5 text-sm font-medium ${
                  status.type === "success" ? "text-[#028383]" : "text-red-600"
                }`}
              >
                {status.message}
              </p>
            ) : null}

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
                onClick={onClose}
                className="text-[18px] font-medium text-[#2f3a3d] underline underline-offset-4 transition-colors hover:text-[#03B8B8] cursor-pointer"
              >
                Back
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="pr-0 md:pr-8">
            <h2 className="text-[18px] font-bold uppercase tracking-wide text-[#3b254a]">
              <span className="text-[#bbb8c5]">#2.</span> Your Information
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-3 block text-[16px] font-medium text-[#7a6685]">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  className="w-full rounded-[4px] border border-[#c4c8cc] bg-white px-6 py-4 text-black shadow-sm outline-none transition-colors focus:border-[#03B8B8]"
                />
              </div>
              <div>
                <label className="mb-3 block text-[16px] font-medium text-[#7a6685]">
                  E-mail *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  className="w-full rounded-[4px] border border-[#c4c8cc] bg-white px-6 py-4 text-black shadow-sm outline-none transition-colors focus:border-[#03B8B8]"
                />
              </div>
            </div>

            <div className="mt-8">
              <label className="mb-3 block text-[16px] font-medium text-[#7a6685]">
                Message
              </label>
              <textarea
                rows="3"
                value={form.message}
                onChange={(event) => updateField("message", event.target.value)}
                className="w-full rounded-[4px] border border-[#c4c8cc] bg-white px-6 py-4 text-black shadow-sm outline-none transition-colors focus:border-[#03B8B8]"
              />
            </div>

            {status.message ? (
              <p
                className={`mt-5 text-sm font-medium ${
                  status.type === "success" ? "text-[#028383]" : "text-red-600"
                }`}
              >
                {status.message}
              </p>
            ) : null}

            <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-9">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-[4px] bg-[#e62b24] px-14 py-4 text-[16px] font-bold text-white transition-colors hover:bg-[#ca211b] disabled:opacity-60"
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
  );
}

