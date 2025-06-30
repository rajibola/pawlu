import { InterText } from "@/shared";
import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { ChevronDown, ChevronUp } from "../assets/images/svgs";

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  setQuantity,
}) => {
  return (
    <View className="mt-11">
      <InterText className="text-base font-medium text-[#667085] mb-3">
        Quantity
      </InterText>
      <View className="flex-row items-center border border-gray-300 rounded-lg w-[208px]">
        <TextInput
          className="flex-1 h-12 text-center text-base text-gray-900"
          value={String(quantity)}
          onChangeText={(text) => {
            const num = parseInt(text.replace(/[^0-9]/g, ""), 10);
            if (!isNaN(num)) {
              setQuantity(num);
            } else if (text === "") {
              setQuantity(0);
            }
          }}
          keyboardType="numeric"
          accessible={true}
          accessibilityLabel="Quantity input"
          accessibilityHint="Enter the quantity you want to add to cart"
          accessibilityRole="text"
        />
        <View className="pr-4 flex items-center justify-between">
          <TouchableOpacity
            onPress={() => setQuantity(quantity + 1)}
            className="p-1"
            accessible={true}
            accessibilityLabel="Increase quantity"
            accessibilityHint="Double tap to increase quantity by 1"
            accessibilityRole="button"
          >
            <ChevronUp />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            className="p-1"
            accessible={true}
            accessibilityLabel="Decrease quantity"
            accessibilityHint="Double tap to decrease quantity by 1"
            accessibilityRole="button"
          >
            <ChevronDown />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default QuantitySelector;
