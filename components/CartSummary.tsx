import { useCart } from "@/context/CartContext";
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
    <View className="bg-white p-6 shadow rounded-lg border border-gray-200 mt-4">
      <Text className="text-xl font-bold mb-4">Summary</Text>
      <InfoRow label="Subtotal" value={`€${subtotal.toFixed(2)}`} />
      <InfoRow label="Shipping estimate" value={`€${shipping.toFixed(2)}`} />
      <InfoRow label="Tax estimate" value={`€${tax.toFixed(2)}`} />
      <View className="border-t border-gray-200 my-4" />
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold">Total</Text>
        <Text className="text-lg font-bold">€{total.toFixed(2)}</Text>
      </View>
      <TouchableOpacity
        disabled={subtotal === 0}
        className={`p-4 rounded-lg items-center ${subtotal === 0 ? "bg-gray-400" : "bg-blue-600"}`}
        accessibilityRole="button"
        accessibilityLabel="Proceed to checkout"
        accessibilityState={{ disabled: subtotal === 0 }}
      >
        <Text className="text-white font-bold text-lg">Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}
