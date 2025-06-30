import React from "react";
import ChevronDown from "../assets/images/svgs/ChevronDown";
import ChevronUp from "../assets/images/svgs/ChevronUp";

interface QuantityInputProps {
  quantity: number;
  setQuantity: (q: number) => void;
  max?: number;
}

export const QuantityInput = ({
  quantity,
  setQuantity,
  max = 20,
}: QuantityInputProps) => {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-2 py-4 min-w-[62px] h-[36px]">
      <span className="flex-1 text-center text-sm text-[#344054] font-semibold select-none">
        {quantity}
      </span>
      <div className="flex flex-col ml-4 gap-[8px]">
        <button
          type="button"
          aria-label="Increase quantity"
          className="hover:text-blue-600 focus:outline-none"
          onClick={() => setQuantity(Math.min(max, quantity + 1))}
          disabled={quantity >= max}
        >
          <ChevronUp />
        </button>
        <button
          type="button"
          aria-label="Decrease quantity"
          className="hover:text-blue-600 focus:outline-none"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
        >
          <ChevronDown />
        </button>
      </div>
    </div>
  );
};
