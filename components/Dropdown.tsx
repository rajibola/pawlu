import ChevronDown from "@/assets/images/svgs/ChevronDown";
import { InterText } from "@/shared";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface DropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  name?: string;
  error?: string;
}

export const Dropdown = ({
  label,
  options,
  value,
  onChange,
  name,
  error,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const hint = error ? error : `Dropdown for ${label}`;

  return (
    <View className="mb-2">
      <InterText className="text-sm font-medium text-[#344054] mb-2">
        {label}
      </InterText>
      <TouchableOpacity
        activeOpacity={0.8}
        className="border-[#D0D5DD] border rounded-lg h-[44px] px-4 flex-row items-center justify-between"
        onPress={() => setOpen(true)}
        accessibilityLabel={label}
        accessibilityHint={hint}
      >
        <InterText
          className={`text-base ${!value ? "text-[#98A2B3]" : "text-[#344054]"}`}
        >
          {value || `Select ${label.toLowerCase()}`}
        </InterText>
        <ChevronDown />
      </TouchableOpacity>
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View className="flex-1 bg-black/10" />
        </TouchableWithoutFeedback>
        <View className="absolute left-4 right-4 top-[30%] bg-white border-[#D0D5DD] border-2 rounded-lg max-h-[240px] z-1000 shadow-md shadow-black/15">
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Pressable
                className="h-[44px] justify-center px-4 border-b border-[#F0F0F0]"
                onPress={() => {
                  onChange(item);
                  setOpen(false);
                }}
                accessibilityLabel={item}
              >
                <InterText className="text-base text-[#344054]">
                  {item}
                </InterText>
              </Pressable>
            )}
          />
        </View>
      </Modal>
      {error && (
        <InterText className="text-xs text-red-600 mt-1 block">
          {error}
        </InterText>
      )}
    </View>
  );
};
