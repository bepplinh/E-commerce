"use client";
import React from "react";
import { useFilterParams } from "@/hooks/useFilterParams";

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
  const { searchParams, setFilter } = useFilterParams();
  const minValue = searchParams.get("priceMin");
  const maxValue = searchParams.get("priceMax");

  const minPrice = minValue === null ? MIN_LIMIT : Number(minValue);
  const maxPrice = maxValue === null ? MAX_LIMIT : Number(maxValue);

  const safeMinPrice = Number.isFinite(minPrice) ? minPrice : MIN_LIMIT;
  const safeMaxPrice = Number.isFinite(maxPrice) ? maxPrice : MAX_LIMIT;

  const updatePrice = (nextMin: number, nextMax: number) => {
    setFilter({
      priceMin: nextMin,
      priceMax: nextMax,
    });
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), safeMaxPrice - STEP);
    updatePrice(value, safeMaxPrice);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), safeMinPrice + STEP);
    updatePrice(safeMinPrice, value);
  };

  return (
    <div className="w-full">
      <div className="relative h-6 flex items-center px-2">
        <div className="absolute left-0 right-0 h-1 bg-gray-200 rounded-full" />

        <div
          className="absolute h-1 bg-black rounded-full"
          style={{
            left: `${(safeMinPrice / MAX_LIMIT) * 100}%`,
            right: `${100 - (safeMaxPrice / MAX_LIMIT) * 100}%`,
          }}
        />

        <input
          type="range"
          min={MIN_LIMIT}
          max={MAX_LIMIT}
          step={STEP}
          value={safeMinPrice}
          onChange={handleMinChange}
          className={`absolute left-0 w-full appearance-none bg-transparent pointer-events-none z-20 ${sliderThumbClasses}`}
        />

        <input
          type="range"
          min={MIN_LIMIT}
          max={MAX_LIMIT}
          step={STEP}
          value={safeMaxPrice}
          onChange={handleMaxChange}
          className={`absolute left-0 w-full appearance-none bg-transparent pointer-events-none z-10 ${sliderThumbClasses}`}
        />
      </div>

      <div className="flex items-center justify-between mt-6">
        <p className="text-[14px] font-normal">
          <span className="text-gray-500">MinPrice:</span>{" "}
          <span className="font-normal">${safeMinPrice}</span>
        </p>

        <p className="text-[14px] font-normal">
          <span className="text-gray-500">MaxPrice:</span>{" "}
          <span className="font-normal">${safeMaxPrice}</span>
        </p>
      </div>
    </div>
  );
}

export default PriceCategory;
