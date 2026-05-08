import React from "react";

const HeaderBtn = ({ text, className }) => {
  return (
    <p className={`text-[#B8FAFF] font-medium tracking-[0.25em] text-lg uppercase ${className? className : "mb-4"}`}>
      {text}
    </p>
  );
};

export default HeaderBtn;
