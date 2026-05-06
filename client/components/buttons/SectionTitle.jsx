import React from "react";

const SectionTitle = ({ children, className = "" }) => {
  return (
    <h2 className={`text-[28px] sm:text-[34px] md:text-[40px] lg:text-[46px] font-bold mb-4 md:mb-6 tracking-wider leading-[1.2] ${className}`}>
      {children}
    </h2>
  );
};

export default SectionTitle;
