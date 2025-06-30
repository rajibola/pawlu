import ChevronDown from "@/assets/images/svgs/ChevronDown";
import InterText from "@/shared/InterText";
import React, { useEffect, useRef, useState } from "react";

interface DropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  name?: string;
  error?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onChange,
  name,
  error,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const errorId = error
    ? `${name || label.replace(/\s+/g, "-").toLowerCase()}-error`
    : undefined;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative mb-2">
      <InterText className="block text-sm font-medium text-[#344054] mb-2">
        {label}
      </InterText>
      <button
        type="button"
        className={`border rounded-lg z-30 h-[44px] px-[14px] w-full text-base text-[#344054] bg-white flex flex-row items-center justify-between border-[#D0D5DD] focus:outline-none focus:ring-2 focus:ring-blue-500`}
        style={{ boxShadow: "0px 1px 2px 0px #1018280D" }}
        onClick={() => setOpen((prev) => !prev)}
        aria-describedby={errorId}
      >
        <InterText
          className={`text-base text-[#344054] ${!value ? "text-[#98A2B3]" : ""}`}
        >
          {value || `Select ${label.toLowerCase()}`}
        </InterText>
        <ChevronDown />
      </button>
      {open && (
        <div className="absolute z-40 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg max-h-60 overflow-y-auto shadow-lg">
          {options.map((item) => (
            <button
              key={item}
              type="button"
              className="block w-full text-left h-[44px] px-[14px] text-base text-[#344054] hover:bg-gray-100"
              onClick={() => {
                onChange(item);
                setOpen(false);
              }}
            >
              <InterText className="text-base text-[#344054]">{item}</InterText>
            </button>
          ))}
        </div>
      )}
      {error && (
        <InterText
          className="text-xs text-red-600 mt-1 block"
          id={errorId}
          role="alert"
        >
          {error}
        </InterText>
      )}
    </div>
  );
};

export default Dropdown;
