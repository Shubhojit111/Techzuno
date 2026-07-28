import React from "react";

const SectionTitleSmall = ({ title, className }) => {
  return (
    <h2 className={`text-[28px] sm:text-[34px] md:text-[34px] lg:text-[46px] font-semibold  tracking-[0.07em] leading-[1.15] text-center ${className}`}>
      {title}
    </h2>
  );
};

export default SectionTitleSmall;
