import Image from "next/image";
import { Icon } from "@iconify/react";
import Assets from "@/Assets/Assets";
import Link from "next/link";

export default function ServiceCard({
  icon,
  title,
  description,
  linkText,
  url,
}) {
  return (
    <div
      className="group card-shine mb-4 h-auto lg:h-[400px] w-full flex flex-col items-center justify-center relative rounded-[10px] transition-all duration-500 ease-out hover:-translate-y-2 overflow-hidden"
      tabIndex={0}
    >
      <div className="w-full h-full absolute top-0 left-0">
        <Image
          src={Assets.Group491}
          alt="Group 491"
          className=" w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#03B8B8]/0 via-transparent to-[#03B8B8]/0 group-hover:from-[#03B8B8]/10 group-hover:to-[#0aa7a7]/5 transition-all duration-700 pointer-events-none" />
      <div className="h-full w-full flex flex-col items-center justify-center text-center px-6 sm:px-8 py-10 md:py-8 lg:py-10 relative z-10">
        <div className="pop-icon w-14 h-14 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white rounded-full flex items-center justify-center text-4xl mb-4 md:mb-3 lg:mb-4 relative shadow-[0_0_0_0_rgba(3,184,184,0)] transition-all duration-500 group-hover:scale-104 group-hover:rotate-12 group-hover:shadow-[0_0_0_4px_rgba(3,184,184,0.12)]">
          <Icon
            icon={icon}
            className="text-[#03B8B8] w-8 h-8 sm:w-8 sm:h-8 lg:w-10 lg:h-10 transition-transform group-hover:scale-110"
          />
        </div>

        <h3 className="text-[22px] sm:text-[16px] lg:text-[24px] font-bold text-[#38FFF2] mb-3 md:mb-2 lg:mb-3 relative z-10">
          {title}
        </h3>
        <p className="text-[#E5E5E5] leading-tight text-[14px] sm:text-[12px] lg:text-[13px] relative z-10 md:w-[260px] ">
          {description}
        </p>

        <Link 
        href={url} 
        className="text-[#38FFF2] font-medium mt-10 md:mt-6 lg:mt-10 text-[14px] sm:text-[12px] lg:text-[14px] tracking-wider group-hover:text-cyan-300 relative cursor-pointer z-10 flex items-center justify-center w-full gap-2">
          {linkText} <span className="transition-transform duration-300 group-hover:translate-x-1.5 group-hover:scale-125 inline-block">→</span>
        </Link>
      </div>
    </div>
  );
}
