"use client";

import { useRef, useState, useEffect } from "react";
import { Icon } from "@iconify/react";

export default function SliderArrowBtn({ children }) {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    setCanScrollLeft(slider.scrollLeft > 5);

    setCanScrollRight(
      slider.scrollLeft + slider.clientWidth < slider.scrollWidth - 5,
    );
  };

  useEffect(() => {
    updateScrollState();

    const slider = sliderRef.current;
    if (!slider) return;

    slider.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);

    return () => {
      slider.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const getScrollAmount = () => {
    const slider = sliderRef.current;
    if (!slider) return 0;

    const firstCard = slider.querySelector("[data-slide]");
    if (!firstCard) return slider.clientWidth;

    const cardStyles = window.getComputedStyle(firstCard);
    const marginRight = parseFloat(cardStyles.marginRight) || 0;

    return firstCard.offsetWidth + marginRight;
  };

  const scroll = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scrollAmount = getScrollAmount();

    slider.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full relative">
      {/* Mobile Only Arrows */}
      <div className="flex md:hidden justify-end gap-3 px-6 mb-6">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`h-11 w-11 rounded-full flex items-center justify-center border transition-all duration-300
            ${
              canScrollLeft
                ? "border-zinc-700 bg-[#111111] text-white"
                : "border-zinc-800 bg-[#111111] text-zinc-600 cursor-not-allowed"
            }`}
        >
          <Icon icon="mdi:chevron-left" className="text-xl" />
        </button>

        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`h-11 w-11 rounded-full flex items-center justify-center border transition-all duration-300
            ${
              canScrollRight
                ? "border-zinc-700 bg-[#111111] text-white"
                : "border-zinc-800 bg-[#111111] text-zinc-600 cursor-not-allowed"
            }`}
        >
          <Icon icon="mdi:chevron-right" className="text-xl" />
        </button>
      </div>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="overflow-x-auto md:overflow-visible scrollbar-hide scroll-smooth"
      >
        {children}
      </div>
    </div>
  );
}