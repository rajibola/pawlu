import InterText from "@/shared/InterText";
import React from "react";
import {
  AccessibilityRole,
  ActivityIndicator,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: AccessibilityRole;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-[#2E439C] text-white",
  secondary: "bg-[#FFF4DC] text-[#2E439C]",
  outline: "bg-white border border-[#2E439C] text-[#2E439C]",
  ghost: "bg-transparent text-[#2E439C]",
};

const disabledStyles: Record<ButtonVariant, string> = {
  primary: "bg-gray-400 text-white",
  secondary: "bg-gray-200 text-gray-400",
  outline: "bg-white border border-gray-300 text-gray-400",
  ghost: "bg-transparent text-gray-400",
};

export default function Button({
  children,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  fullWidth = true,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = "button",
  className = "",
  style,
}: ButtonProps) {
  const base =
    "rounded-lg h-14 flex flex-row items-center justify-center font-semibold text-lg " +
    (fullWidth ? "w-full " : " ");
  const isDisabled = disabled || loading;
  const variantClass = isDisabled
    ? disabledStyles[variant]
    : variantStyles[variant];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      className={`${base} ${variantClass} ${isDisabled ? "opacity-50" : ""} ${className}`}
      style={style}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? "#fff" : "#2E439C"} />
      ) : typeof children === "string" ? (
        <InterText
          className={`font-semibold ${variantClass.split(" ").find((c) => c.startsWith("text-")) || "text-white"}`}
        >
          {children}
        </InterText>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}
