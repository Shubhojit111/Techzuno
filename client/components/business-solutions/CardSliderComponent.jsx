import { Icon } from "@iconify/react";
import Image from "next/image";
import React from "react";

const CardSliderComponent = ({ index, title, description, icon, image }) => {
  const numericIndex = Number.parseInt(index, 10);
  const isEven = Number.isFinite(numericIndex) && numericIndex % 2 === 0;

  return (
    <div className={`w-full flex ${
          isEven ? " justify-end"  : "justify-start"
        }`}  
    >
      <div
        className={`h-full sm:h-70 w-full flex flex-col sm:flex-row  gap-6 lg:gap-10 md:max-w-[85%] lg:max-w-[80%]  ${
          isEven ? "sm:flex-row-reverse " : ""
        }`}
      >
        <div className="textCard min-h-64 h-full w-full sm:w-[45%] lg:w-[35%] px-6 py-8  rounded-xl card-bg-gradient flex flex-col justify-between  ">
          <div className="flex justify-between">
            <Icon icon={icon} className="highlightedTextColor h-9 w-9 md:h-10 md:w-10 lg:w-13 lg:h-13" />
            <span className="text-[36px] md:text-[40px] lg:text-[52px] highlightedTextColor leading-none font-bold font-montserrat">
              {index}
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="text-white font-bold tracking-wider text-[22px] sm:text-[17px]">
              {title}
            </p>
            <p className="text-white/60  lg:max-w-[87%] text-[14px] md:text-[12px] lg:text-[13px] leading-[1.2] ">
              {description}
            </p>
          </div>
        </div>
        <div className="imageCard card-bg-gradient h-full w-full sm:w-[55%] lg:w-[65%] rounded-xl overflow-hidden">
          <Image
            src={image}
            alt={title || "Card Image"}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default CardSliderComponent;
