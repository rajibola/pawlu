import InterText from "@/shared/InterText";
import React from "react";

interface TextInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  type?: string;
  error?: string;
}

export default function TextInput({
  label,
  placeholder,
  value,
  onChange,
  name,
  type = "text",
  error,
}: TextInputProps) {
  return (
    <div className="mb-4">
      <InterText className="block text-sm font-semibold text-[#344054] mb-2">
        {label}
      </InterText>
      <input
        className={`border rounded-lg p-3 w-full text-[#344054] placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-200"
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        type={type}
        aria-label={label}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <InterText
          id={`${name}-error`}
          className="text-xs text-red-600 mt-1 block"
          role="alert"
        >
          {error}
        </InterText>
      )}
    </div>
  );
}
