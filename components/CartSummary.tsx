import { useCart } from "@/context/CartContext";
import InterText from "@/shared/InterText";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-row justify-between items-center mb-2">
    <Text className="text-gray-600">{label}</Text>
    <Text className="font-semibold">{value}</Text>
  </View>
);

export function CartSummary() {
  const { getCartTotal } = useCart();

  const subtotal = getCartTotal();
  const shipping = 2.5;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  return (
    <View className="bg-[#F9FAFB] p-8 rounded-lg mt-4">
      <InterText className="text-xl font-semibold mb-7">Summary</InterText>
      <View className="flex flex-col gap-7">
        <InfoRow label="Subtotal" value={`€${subtotal.toFixed(2)}`} />
        <InfoRow label="Shipping estimate" value={`€${shipping.toFixed(2)}`} />
        <InfoRow label="Tax estimate" value={`€${tax.toFixed(2)}`} />
      </View>
      <View className="border-t border-gray-200 mt-11" />
      <View className="flex-row justify-between items-center py-8 border-b border-[#EAECF0] mb-8">
        <InterText className="text-base font-medium text-[#101828]">
          Total
        </InterText>
        <InterText className="text-base font-medium text-[#101828]">
          €{total.toFixed(2)}
        </InterText>
      </View>
      <TouchableOpacity
        disabled={subtotal === 0}
        className={`rounded-lg h-14 flex items-center justify-center ${subtotal === 0 ? "bg-gray-400" : "bg-[#2E439C]"}`}
        accessibilityRole="button"
        accessibilityLabel="Proceed to checkout"
        accessibilityState={{ disabled: subtotal === 0 }}
      >
        <InterText className="text-white font-semibold text-lg">
          Checkout
        </InterText>
      </TouchableOpacity>
    </View>
  );
}
