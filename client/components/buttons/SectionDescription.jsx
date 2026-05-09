import React from "react";

const SectionDescription = ({ description, className = "" }) => {
  return (
    <p className={`text-white/80 mb-6 md:mb-8 text-[15px] sm:text-[13px] leading-[1.3] max-w-full md:max-w-[75%] lg:max-w-[90%] ${className} `}>
      {description}
    </p>
  );
};

export default SectionDescription;
