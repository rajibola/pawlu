import { useError } from "@/context/ErrorContext";
import { InterText } from "@/shared";
import React from "react";
import { TouchableOpacity, View } from "react-native";

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
}) => {
  const { error, clearError } = useError();
  const displayMessage = message || error;

  if (!displayMessage) return null;

  return (
    <View
      className="bg-[#FEE2E2] p-4 rounded-lg my-2"
      accessible={true}
      accessibilityRole="alert"
      accessibilityLabel="Error message"
    >
      <InterText className="text-red-600 font-bold mb-2">
        {displayMessage}
      </InterText>
      <View className="flex-row gap-2">
        {onRetry && (
          <TouchableOpacity
            onPress={onRetry}
            accessibilityRole="button"
            accessibilityLabel="Retry"
            className="bg-[#F87171] p-2 rounded-md mr-2"
          >
            <InterText className="text-white font-bold">Retry</InterText>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={clearError}
          accessibilityRole="button"
          accessibilityLabel="Dismiss error"
          className="bg-[#F3F4F6] p-2 rounded-md"
        >
          <InterText className="text-[#374151]">Dismiss</InterText>
        </TouchableOpacity>
      </View>
    </View>
  );
};
