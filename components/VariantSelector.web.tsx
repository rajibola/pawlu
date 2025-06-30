import { InterText } from "@/shared";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Option, OptionValue } from "../types";

interface VariantSelectorProps {
  options: Option[];
  selectedOptions: Record<string, number>;
  onOptionSelect: (optionId: number, valueId: number) => void;
}

const VariantSelector: React.FC<VariantSelectorProps> = ({
  options,
  selectedOptions,
  onOptionSelect,
}) => {
  return (
    <View className="gap-11">
      {options.map((option) => {
        const isColorOption = option.name?.toLowerCase() === "color";
        return (
          <View key={option.id}>
            <InterText className="text-base font-medium text-[#667085] mb-3">
              {option.name}
            </InterText>
            <View className="flex-row flex-wrap gap-3">
              {option.option_values.map((value: OptionValue) => {
                const isSelected = selectedOptions[option.id] === value.id;
                if (isColorOption) {
                  return (
                    <TouchableOpacity
                      key={value.id}
                      onPress={() => onOptionSelect(option.id, value.id)}
                      className={`w-9 h-9 p-1 rounded-full border justify-center items-center ${isSelected ? "border-black" : "border-transparent"}`}
                      accessible={true}
                      accessibilityLabel={`${option.name} option: ${value.name}`}
                      accessibilityHint={
                        isSelected ? "Selected" : "Double tap to select"
                      }
                      accessibilityRole="button"
                      accessibilityState={{ selected: isSelected }}
                    >
                      <View
                        className="w-full h-full rounded-full"
                        style={{ backgroundColor: value.value.toLowerCase() }}
                      />
                    </TouchableOpacity>
                  );
                }
                return (
                  <TouchableOpacity
                    key={value.id}
                    onPress={() => onOptionSelect(option.id, value.id)}
                    className={`w-[80px] h-[48px] flex items-center justify-center rounded-[4px] border ${isSelected ? "bg-[#FFCA4E] border-[#FFCA4E]" : "bg-white border-gray-300"}`}
                    accessible={true}
                    accessibilityLabel={`${option.name} option: ${value.name}`}
                    accessibilityHint={
                      isSelected ? "Selected" : "Double tap to select"
                    }
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                  >
                    <InterText
                      className={`text-sm font-medium ${isSelected ? "text-[#1F2D68]" : "text-[#101828]"}`}
                    >
                      {value.name}
                    </InterText>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default VariantSelector;
