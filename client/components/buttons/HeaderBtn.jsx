import React from "react";

const HeaderBtn = ({ text, className }) => {
  return (
    <p className={`text-[#B8FAFF] text-center font-medium tracking-[0.2em]  sm:tracking-[0.25em] text-[14px] sm:text-lg mb-2 uppercase ${className}`}>
      {text}
    </p>
  );
};

export default HeaderBtn;