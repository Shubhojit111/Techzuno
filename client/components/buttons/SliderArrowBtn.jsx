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

  const scroll = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Get the container that holds the cards (first child of the slider)
    const container = slider.children[0];
    if (!container) return;

    // Get all card elements
    const cards = Array.from(container.children);
    if (cards.length === 0) return;

    const sliderRect = slider.getBoundingClientRect();
    const sliderCenter = sliderRect.left + sliderRect.width / 2;

    // Find the index of the currently centered card
    let closestIdx = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(sliderCenter - cardCenter);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    // Determine the target card to scroll to
    let targetIdx = closestIdx;
    if (direction === "left") {
      targetIdx = Math.max(0, closestIdx - 1);
    } else {
      targetIdx = Math.min(cards.length - 1, closestIdx + 1);
    }

    const targetCard = cards[targetIdx];
    
    // Calculate how much we need to scroll to center the target card
    const targetCardRect = targetCard.getBoundingClientRect();
    const targetCardCenter = targetCardRect.left + targetCardRect.width / 2;
    const scrollDiff = targetCardCenter - sliderCenter;

    slider.scrollBy({
      left: scrollDiff,
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
        className="overflow-x-auto md:overflow-visible scrollbar-hide scroll-smooth snap-x snap-mandatory"
      >
        {children}
      </div>
    </div>
  );
}