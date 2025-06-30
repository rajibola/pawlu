import { useError } from "@/context/ErrorContext";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  const { error, clearError } = useError();
  const displayMessage = message || error;

  if (!displayMessage) return null;

  return (
    <View
      style={{
        backgroundColor: "#FEE2E2",
        padding: 16,
        borderRadius: 8,
        marginVertical: 8,
      }}
      accessible={true}
      accessibilityRole="alert"
      accessibilityLabel="Error message"
    >
      <Text style={{ color: "#B91C1C", fontWeight: "bold", marginBottom: 8 }}>
        {displayMessage}
      </Text>
      <View style={{ flexDirection: "row", gap: 8 }}>
        {onRetry && (
          <TouchableOpacity
            onPress={onRetry}
            accessibilityRole="button"
            accessibilityLabel="Retry"
            style={{
              backgroundColor: "#F87171",
              padding: 8,
              borderRadius: 4,
              marginRight: 8,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Retry</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={clearError}
          accessibilityRole="button"
          accessibilityLabel="Dismiss error"
          style={{ backgroundColor: "#F3F4F6", padding: 8, borderRadius: 4 }}
        >
          <Text style={{ color: "#374151" }}>Dismiss</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ErrorMessage;
