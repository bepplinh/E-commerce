"use client";
import React, { useState } from "react";

const MIN_LIMIT = 0;
const MAX_LIMIT = 1000;
const STEP = 10;

const sliderThumbClasses = `
  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto 
  [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full 
  [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black [&::-webkit-slider-thumb]:cursor-pointer
  [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:pointer-events-auto 
  [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full 
  [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-black [&::-moz-range-thumb]:cursor-pointer
`;

function PriceCategory() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - STEP);
    setMinPrice(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + STEP);
    setMaxPrice(value);
  };

  return (
    <div className="w-full">
      <div className="relative h-6 flex items-center px-2">
        <div className="absolute left-0 right-0 h-1 bg-gray-200 rounded-full" />

        <div
          className="absolute h-1 bg-black rounded-full"
          style={{
            left: `${(minPrice / MAX_LIMIT) * 100}%`,
            right: `${100 - (maxPrice / MAX_LIMIT) * 100}%`,
          }}
        />

        <input
          type="range"
          min={MIN_LIMIT}
          max={MAX_LIMIT}
          step={STEP}
          value={minPrice}
          onChange={handleMinChange}
          className={`absolute left-0 w-full appearance-none bg-transparent pointer-events-none z-20 ${sliderThumbClasses}`}
        />

        <input
          type="range"
          min={MIN_LIMIT}
          max={MAX_LIMIT}
          step={STEP}
          value={maxPrice}
          onChange={handleMaxChange}
          className={`absolute left-0 w-full appearance-none bg-transparent pointer-events-none z-10 ${sliderThumbClasses}`}
        />
      </div>

      <div className="flex items-center justify-between mt-6">
        <p className="text-[14px] font-normal">
          <span className="text-gray-500">MinPrice:</span>{" "}
          <span className="font-normal">${minPrice}</span>
        </p>

        <p className="text-[14px] font-normal">
          <span className="text-gray-500">MaxPrice:</span>{" "}
          <span className="font-normal">${maxPrice}</span>
        </p>
      </div>
    </div>
  );
}

export default PriceCategory;
