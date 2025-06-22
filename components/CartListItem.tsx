import { CartItem, useCart } from "@/context/CartContext";
import { getNumericPrice } from "@/utils/price";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import QuantitySelector from "./QuantitySelector";
// Assuming you have an 'X' icon component
// import { CloseIcon } from '@/assets/svgs';

const CloseIcon = () => <Text className="font-bold text-lg">X</Text>;

type CartListItemProps = {
  item: CartItem;
};

export function CartListItem({ item }: CartListItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, variant, quantity } = item;

  const handleUpdateQuantity = (newQuantity: number) => {
    updateQuantity(variant.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(variant.id);
  };

  const image =
    product.media?.find((m) => m.url)?.conversions?.["medium-square"] ||
    product.media?.[0]?.url ||
    "https://via.placeholder.com/150";

  const variantName = variant.variant_type_options
    .map((v) => v.name)
    .join(" | ");
  const itemTotal = getNumericPrice(variant.price.formatted) * quantity;

  return (
    <View className="border border-gray-200 rounded-lg p-4 mb-4 bg-white shadow">
      <View className="flex-row items-start">
        <Image source={{ uri: image }} className="w-20 h-20 rounded-md" />
        <View className="ml-4 flex-1">
          <Text className="font-bold text-base">{product.title}</Text>
          <Text className="text-gray-600 text-sm">{variantName}</Text>
          <Text className="font-semibold text-base mt-1">
            {variant.price.formatted}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleRemove}
          accessibilityRole="button"
          accessibilityLabel="Remove item"
          accessibilityHint={`Removes ${product.title} from your cart`}
        >
          <CloseIcon />
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between items-center mt-4">
        <QuantitySelector
          quantity={quantity}
          setQuantity={handleUpdateQuantity}
          accessibilityLabel={`Quantity for ${product.title}`}
        />
        <Text
          className="font-bold text-lg"
          accessibilityLabel={`Total for ${product.title}`}
        >
          €{itemTotal.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}
