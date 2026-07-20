"use client";

import Assets from "@/Assets/Assets";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { SERVICE_OPTIONS } from "@/data/serviceOptions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { showCustomToast } from "../common/CustomToast";

const initialForm = {
  inquiry: "General Information Request",
  service: SERVICE_OPTIONS[0],
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
  consent: true,
};

export default function ContactFormSection() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const service = searchParams.get("service");
    const inquiry = searchParams.get("inquiry");

    if (service) {
      setForm((current) => ({
        ...current,
        inquiry: "Services",
        service: SERVICE_OPTIONS.includes(service) ? service : current.service,
      }));
      return;
    }

    if (inquiry) {
      setForm((current) => ({ ...current, inquiry }));
    }
  }, [searchParams]);

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
          source: "Contact page",
          inquiry: form.inquiry,
          service: form.inquiry === "Services" ? form.service : "",
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          message: form.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to send message right now.");
      }

      showCustomToast("Message sent successful", "We will contact you soon.", "success");
      setForm(initialForm);
    } catch (error) {
      showCustomToast("Sending failed", error.message || "Unable to send message right now.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full pt-20 pb-10 md:pt-32 md:pb-16 lg:pt-40 lg:pb-20 bg-black overflow-hidden">
      {/* Background Text */}
      <div className="about-bg-text absolute top-12 lg:top-20 z-0 w-full mx-auto text-center pointer-events-none">
        <h2 className="text-[48px] sm:text-4xl md:text-[105px] font-montserrat font-black tracking-wider uppercase mb-6 opacity-80 leading-tight bg-linear-to-r from-[#2e3330] to-[#171717] bg-clip-text text-transparent">
          Techzuno
        </h2>
      </div>

      <div className="px-6 sm:px-10 lg:px-62 mx-auto relative z-10 w-full mt-6">
        <div className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-10">
          {/* Right Half (Now top in flex-col): Image and Texts */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between h-full">
            <div className="w-full h-[200px] md:h-[400px] lg:h-[300px] rounded-2xl overflow-hidden mb-6">
              <Image src={Assets.ContactFormRight} alt="Contact Person" className="w-full h-full object-cover" />
            </div>

            <div className="flex flex-col gap-5 w-full md:w-[60%]">
              <div>
                <h3 className="text-white text-[20px] font-bold mb-2">Thank You For Reaching Out!</h3>
                <p className="text-white/70 text-[13px] leading-tight mb-3">
                  Please Fill Out The Form On The Left, And Our Team Will Get Back To You As Soon As Possible.
                </p>
                <p className="text-white/70 text-[13px] leading-tight">
                  If You&apos;d Prefer To Connect With Us Directly, Feel Free To Reach Out Via:
                </p>
              </div>

              <div>
                <h4 className="text-white text-[16px] font-medium mb-3">Owner: Techzuno Solutions OPC PVT LTD</h4>
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-start gap-3">
                    <Icon icon="mdi:map-marker-outline" className="text-[#03B8B8] text-xl shrink-0 mt-0.5" />
                    <p className="text-white/70 text-[13px] leading-relaxed">
                      12/1A/3D Chowbagha Road<br />
                      Bidhan Nagar South Kolkata - 700039
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon icon="mdi:phone-outline" className="text-[#03B8B8] text-xl shrink-0" />
                    <p className="text-white/70 text-[13px]">
                      P: <a href="tel:+916290340824" className="underline hover:text-[#03B8B8] transition-colors">+91 6290340824</a>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon icon="mdi:email-outline" className="text-[#03B8B8] text-xl shrink-0" />
                    <p className="text-white/70 text-[13px]">
                      M: <a href="mailto:info@techzuno.com" className="underline hover:text-[#03B8B8] transition-colors">Info@Techzuno.Com</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-1">
                <h4 className="text-white text-[15px] font-bold mb-2">Discover How Techzuno Can Elevate Your Business.</h4>
                <p className="text-white/70 text-[13px] leading-tight">
                  We&apos;re Here To Explore Opportunities And Would Be Delighted To Discuss How Our Solutions Can Support Your Growth At A Time That Works Best For You.
                </p>
              </div>
            </div>
          </div>

          {/* Left Half: Form */}
          <div className="w-full lg:w-1/2">
            <div className="bg-gradient-to-b from-[#1a2121] to-[#121414] rounded-[16px] p-6 md:px-20 md:py-16 lg:px-8 lg:py-14 border border-[#2f3b3b] shadow-2xl h-full flex flex-col">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 h-full">
                <div className="flex flex-col gap-2">
                  <label className="text-white/80 text-[13px] md:text-[14px]">What Is Your Inquiry About? *</label>
                  <div className="relative">
                    <select
                      value={form.inquiry}
                      onChange={(event) => updateField("inquiry", event.target.value)}
                      className="w-full bg-[#181d1d] text-white/90 border border-[#2f3b3b] rounded-[6px] px-4 py-3.5 appearance-none outline-none focus:border-[#03B8B8] transition-colors text-[13px] cursor-pointer"
                    >
                      <option className="bg-[#111414]" value="General Information Request">General Information Request</option>
                      <option className="bg-[#111414]" value="Services">Services</option>
                      <option className="bg-[#111414]" value="Support">Support</option>
                      <option className="bg-[#111414]" value="Partnership">Partnership</option>
                    </select>
                    <Icon icon="mdi:chevron-down" className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 text-xl pointer-events-none" />
                  </div>
                </div>

                {form.inquiry === "Services" ? (
                  <div className="flex flex-col gap-2">
                    <label className="text-white/80 text-[13px] md:text-[14px]">Services *</label>
                    <div className="relative">
                      <select
                        value={form.service}
                        onChange={(event) => updateField("service", event.target.value)}
                        className="w-full bg-[#181d1d] text-white/90 border border-[#2f3b3b] rounded-[6px] px-4 py-3.5 appearance-none outline-none focus:border-[#03B8B8] transition-colors text-[13px] cursor-pointer"
                      >
                        {SERVICE_OPTIONS.map((service) => (
                          <option key={service} value={service} className="bg-[#111414]">
                            {service}
                          </option>
                        ))}
                      </select>
                      <Icon icon="mdi:chevron-down" className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 text-xl pointer-events-none" />
                    </div>
                  </div>
                ) : null}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-white/80 text-[13px] md:text-[14px]">Name *</label>
                    <input type="text" required value={form.name} onChange={(event) => updateField("name", event.target.value)} placeholder="Eg: John Doe" className="w-full bg-[#181d1d] text-white/90 border border-[#2f3b3b] rounded-[6px] px-4 py-3.5 outline-none focus:border-[#03B8B8] transition-colors text-[13px] placeholder-white/50" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-white/80 text-[13px] md:text-[14px]">E-Mail *</label>
                    <input type="email" required value={form.email} onChange={(event) => updateField("email", event.target.value)} placeholder="Eg: johndoe88@Gmail.Com" className="w-full bg-[#181d1d] text-white/90 border border-[#2f3b3b] rounded-[6px] px-4 py-3.5 outline-none focus:border-[#03B8B8] transition-colors text-[13px] placeholder-white/50" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-white/80 text-[13px] md:text-[14px]">Phone Number *</label>
                    <input type="tel" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="Eg: 0123456789" className="w-full bg-[#181d1d] text-white/90 border border-[#2f3b3b] rounded-[6px] px-4 py-3.5 outline-none focus:border-[#03B8B8] transition-colors text-[13px] placeholder-white/50" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-white/80 text-[13px] md:text-[14px]">Company *</label>
                    <input type="text" value={form.company} onChange={(event) => updateField("company", event.target.value)} placeholder="Eg: Envato" className="w-full bg-[#181d1d] text-white/90 border border-[#2f3b3b] rounded-[6px] px-4 py-3.5 outline-none focus:border-[#03B8B8] transition-colors text-[13px] placeholder-white/50" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-white/80 text-[13px] md:text-[14px]">Message</label>
                  <textarea rows="3" value={form.message} onChange={(event) => updateField("message", event.target.value)} placeholder="Enter Message" className="w-full bg-[#181d1d] text-white/90 border border-[#2f3b3b] rounded-[6px] px-4 py-3.5 outline-none focus:border-[#03B8B8] transition-colors text-[13px] placeholder-white/50 resize-none"></textarea>
                </div>

                <div className="flex items-center gap-3 mt-2">
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" checked={form.consent} onChange={(event) => updateField("consent", event.target.checked)} className="w-5 h-5 appearance-none bg-[#03B8B8] rounded-[4px] flex-shrink-0 cursor-pointer checked:bg-[#03B8B8]" />
                    <Icon icon="mdi:check" className="absolute text-white text-[13px] pointer-events-none" />
                  </div>
                  <label className="text-white/60 text-[13px]">I Agree To Receive Communications From Techzuno</label>
                </div>

                <div className="mt-2 w-full">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full border-2 border-white/70 bg-[#03B8B8] px-10 py-2 text-center text-lg font-bold tracking-widest text-white shadow-[0_0_20px_rgba(0,210,255,0.5)] transition-all hover:brightness-110 disabled:opacity-60 cursor-pointer"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
