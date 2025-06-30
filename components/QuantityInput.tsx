import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
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
    <View className="flex-row items-center justify-between rounded-lg border border-gray-200 bg-white px-2 py-2 min-w-[62px] h-[36px]">
      <Text className="flex-1 text-center text-sm text-[#344054] font-semibold">
        {quantity}
      </Text>
      <View className="flex-col ml-4 gap-2">
        <TouchableOpacity
          accessibilityLabel="Increase quantity"
          className="items-center justify-center"
          onPress={() => setQuantity(Math.min(max, quantity + 1))}
          disabled={quantity >= max}
        >
          <ChevronUp />
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel="Decrease quantity"
          className="items-center justify-center"
          onPress={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
        >
          <ChevronDown />
        </TouchableOpacity>
      </View>
    </View>
  );
};
