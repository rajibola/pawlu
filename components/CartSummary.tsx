import Button from "@/components/Button";
import { useCart } from "@/context/CartContext";
import InterText from "@/shared/InterText";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-row justify-between items-center mb-2">
    <Text className="text-gray-600">{label}</Text>
    <Text className="font-semibold">{value}</Text>
  </View>
);

export function CartSummary({ isCheckout = false }: { isCheckout?: boolean }) {
  const { getCartTotal } = useCart();
  const router = useRouter();

  const subtotal = getCartTotal();
  const shipping = 2.5;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    if (typeof window !== "undefined" && router) {
      router.push("/checkout");
    }
  };

  return (
    <View className="bg-[#F9FAFB] p-8 rounded-lg mt-4">
      {!isCheckout && (
        <InterText className="text-xl font-semibold mb-7">Summary</InterText>
      )}
      <View className="flex flex-col gap-7">
        <InfoRow label="Subtotal" value={`€${subtotal.toFixed(2)}`} />
        <InfoRow label="Shipping estimate" value={`€${shipping.toFixed(2)}`} />
        <InfoRow label="Tax estimate" value={`€${tax.toFixed(2)}`} />
      </View>
      <View className="border-t border-gray-200 mt-11" />
      <View
        className={`flex-row justify-between items-center py-8 border-[#EAECF0] ${isCheckout ? "mb-0 border-b-0 pb-0" : "mb-8 border-b"}`}
      >
        <InterText className="text-base font-medium text-[#101828]">
          Total
        </InterText>
        <InterText className="text-base font-medium text-[#101828]">
          €{total.toFixed(2)}
        </InterText>
      </View>
      {!isCheckout && (
        <Button
          onPress={subtotal > 0 ? handleCheckout : () => {}}
          disabled={subtotal === 0}
          fullWidth
          accessibilityRole="button"
          accessibilityLabel="Proceed to checkout"
          accessibilityHint="Go to checkout page"
          className="mt-0"
        >
          Checkout
        </Button>
      )}
    </View>
  );
}
