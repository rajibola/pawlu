import { CartItem, useCart } from "@/context/CartContext";
import { InterText } from "@/shared";
import { getNumericPrice } from "@/utils/price";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { QuantityInput } from "./QuantityInput.web";

const CloseIcon = () => <InterText className="font-bold text-2xl">×</InterText>;

type CartListItemProps = {
  item: CartItem;
};

export const CartListItem = ({ item }: CartListItemProps) => {
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
    <View className="flex flex-row items-center py-6 border-b border-gray-200 last:border-b-0">
      {/* Product */}
      <View className="w-[340px] flex flex-row items-center gap-4 min-w-0">
        <Image
          source={{ uri: image }}
          accessibilityLabel={product.title}
          className="w-[84px] h-[84px] rounded-md object-cover flex-shrink-0"
        />
        <View className="ml-4 min-w-0">
          <InterText
            className="font-medium text-sm max-w-[200px] truncate block"
            numberOfLines={1}
            accessibilityLabel={product.title}
          >
            {product.title}
          </InterText>
          <InterText
            className="text-gray-600 text-sm mt-1 truncate max-w-[120px] block"
            numberOfLines={1}
            accessibilityLabel={variantName}
          >
            {variantName}
          </InterText>
        </View>
      </View>

      {/* Quantity */}
      <View className="w-[120px] flex items-center justify-center">
        <QuantityInput quantity={quantity} setQuantity={handleUpdateQuantity} />
      </View>

      {/* Subtotal */}
      <View className="w-[120px] flex items-center justify-end">
        <InterText className="font-semibold text-base text-blue-900 select-none">
          €{subtotal.toFixed(2)}
        </InterText>
      </View>

      {/* Remove */}
      <View className="w-12 flex items-center justify-end">
        <TouchableOpacity
          onPress={handleRemove}
          accessibilityLabel={`Remove ${product.title} from cart`}
          className="hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        >
          <CloseIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};
