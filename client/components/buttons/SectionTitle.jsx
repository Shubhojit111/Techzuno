import React from "react";

const SectionTitle = ({ title, className }) => {
  return (
    <h2 className={`text-[27px] sm:text-[34px] md:text-[40px] lg:text-[46px] font-semibold  tracking-[0.07em] leading-[1.2] ${className}`}>
      {title}
    </h2>
  );
};

export default SectionTitle;
