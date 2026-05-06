import React from "react";

const SectionDescription = ({ children, className = "" }) => {
  return (
    <p className={`text-white/80 mb-6 md:mb-8 text-[15px] sm:text-[14px] leading-[1.3] max-w-full md:max-w-[75%] lg:max-w-[99%] ${className}`}>
      {children}
    </p>
  );
};

export default SectionDescription;
