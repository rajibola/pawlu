import { CartItem, useCart } from "@/context/CartContext";
import { getNumericPrice } from "@/utils/price";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import QuantitySelector from "./QuantitySelector";

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
  const subtotal = getNumericPrice(variant.price.formatted) * quantity;

  return (
    <View className="flex-row items-center py-4 border-b border-gray-200">
      {/* Product */}
      <View className="w-1/2 flex-row items-center">
        <Image source={{ uri: image }} className="w-20 h-20 rounded-md" />
        <View className="ml-4">
          <Text className="font-bold text-base">{product.title}</Text>
          <Text className="text-gray-600 text-sm">{variantName}</Text>
        </View>
      </View>

      {/* Quantity */}
      <View className="w-1/4 items-start">
        <QuantitySelector
          quantity={quantity}
          setQuantity={handleUpdateQuantity}
          accessibilityLabel={`Quantity for ${product.title}`}
        />
      </View>

      {/* Subtotal */}
      <View className="w-1/4 items-start">
        <Text
          className="font-semibold text-base"
          accessibilityLabel={`Subtotal for ${product.title}`}
        >
          €{subtotal.toFixed(2)}
        </Text>
      </View>

      {/* Remove */}
      <View className="w-12 items-end">
        <TouchableOpacity
          onPress={handleRemove}
          accessibilityRole="button"
          accessibilityLabel="Remove item"
          accessibilityHint={`Removes ${product.title} from your cart`}
        >
          <CloseIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}
