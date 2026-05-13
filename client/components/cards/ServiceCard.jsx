import Image from "next/image";
import { Icon } from "@iconify/react";
import Assets from "@/Assets/Assets";

export default function ServiceCard({
  icon,
  title,
  description,
  linkText,
}) {
  return (
    <div className="group h-auto lg:h-[400px] w-full flex flex-col items-center justify-center relative rounded-[10px] transition-all duration-300 overflow-hidden text-center">
      <div className="w-full h-full absolute top-0 left-0">
        <Image
          src={Assets.Group491}
          alt="Group 491"
          className=" w-full object-cover"
        />
      </div>
      <div className="h-full w-full flex flex-col items-center justify-center text-center px-6 sm:px-8 py-10 md:py-8 lg:py-10 ">
        <div className="pop-icon w-14 h-14 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white rounded-full flex items-center justify-center text-4xl mb-4 md:mb-3 lg:mb-4 relative">
          <Icon
            icon={icon}
            className="text-[#03B8B8] w-8 h-8 sm:w-8 sm:h-8 lg:w-10 lg:h-10  "
          />
        </div>

        <h3 className="text-[22px] sm:text-[16px] lg:text-[24px] font-bold text-[#38FFF2] mb-3 md:mb-2 lg:mb-3 relative z-10">
          {title}
        </h3>
        <p className="text-[#E5E5E5] leading-tight text-[14px] sm:text-[12px] lg:text-[14px] relative z-10 md:max-w-[280px]">
          {description}
        </p>

        <button className="text-[#38FFF2] font-medium mt-10 md:mt-6 lg:mt-10 text-[14px] sm:text-[12px] lg:text-[14px] tracking-wider group-hover:text-cyan-300 relative cursor-pointer z-10 flex items-center justify-center w-full gap-2">
          {linkText} <span>→</span>
        </button>
      </div>
    </div>
  );
}
