import React from "react";

const HeaderBtn = ({ text, className }) => {
  return (
    <p className={`text-[#B8FAFF] font-medium tracking-[0.25em] text-lg mb-2 uppercase ${className}`}>
      {text}
    </p>
  );
};

export default HeaderBtn;