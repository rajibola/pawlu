import InterText from "@/shared/InterText";
import React from "react";
import { TextInput as RNTextInput, View } from "react-native";

interface TextInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: string) => void;
  name?: string;
  type?: string;
  error?: string;
  onBlur?: () => void;
}

export default function TextInput({
  label,
  placeholder,
  value,
  onChange,
  name,
  type = "text",
  error,
  onBlur,
}: TextInputProps) {
  const errorId = error
    ? `${name || label.replace(/\s+/g, "-").toLowerCase()}-error`
    : undefined;
  return (
    <View>
      <InterText className="block text-sm font-medium text-[#344054] mb-2">
        {label}
      </InterText>
      <RNTextInput
        className={`border rounded-lg h-[44px] py-[10px] px-[14px] w-full text-[#344054] placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-[#D0D5DD]"
        }`}
        style={{ boxShadow: "0px 1px 2px 0px #1018280D" }}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        accessibilityLabel={label}
        aria-describedby={errorId}
        onBlur={onBlur}
      />
      {error && (
        <InterText
          className="text-xs text-red-600 mt-1 block"
          id={errorId}
          role="alert"
        >
          {error}
        </InterText>
      )}
    </View>
  );
}
