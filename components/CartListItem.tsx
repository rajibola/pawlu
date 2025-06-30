import CancelIcon from "@/assets/images/svgs/Cancel";
import { CartItem, useCart } from "@/context/CartContext";
import { getNumericPrice } from "@/utils/price";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { QuantityInput } from "./QuantityInput";

type CartListItemProps = {
  item: CartItem;
  isLast?: boolean;
};

export const CartListItem = ({ item, isLast }: CartListItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, variant, quantity } = item;

  const handleUpdateQuantity = (newQuantity: number) => {
    updateQuantity(variant.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(variant.id);
  };

  let imageSource: any = null;
  if (product.media && product.media.length > 0) {
    imageSource = product.media[0].conversions?.["medium-square"]
      ? { uri: product.media[0].conversions["medium-square"] }
      : { uri: product.media[0].url };
  } else {
    imageSource = require("@/assets/images/logo.png");
  }

  const variantName = Array.isArray(variant.variant_type_options)
    ? variant.variant_type_options
        .map((v) => v?.name?.trim())
        .filter(Boolean)
        .join(" | ")
    : "";
  const itemTotal = getNumericPrice(variant.price.formatted) * quantity;

  return (
    <View
      className={`rounded-lg mx-4 py-5 bg-white relative ${!isLast ? "border-b border-gray-200" : ""}`}
    >
      <TouchableOpacity
        onPress={handleRemove}
        accessibilityRole="button"
        accessibilityLabel="Remove item"
        accessibilityHint={`Removes ${product.title} from your cart`}
        className="absolute top-2 right-2 z-10 w-6 h-6 items-center justify-center"
      >
        <CancelIcon />
      </TouchableOpacity>

      <View className="flex-row items-center pr-8">
        <Image
          source={imageSource}
          className="w-16 h-16 rounded-md"
          resizeMode="contain"
        />

        <View className="flex-1 px-4">
          <Text className="font-medium text-sm" numberOfLines={2}>
            {product.title}
          </Text>
          <Text className="font-semibold text-sm mt-1">
            {variant.price.formatted}
          </Text>
          {variantName ? (
            <Text className="text-[#667085] text-xs mt-1">{variantName}</Text>
          ) : null}
        </View>
      </View>

      <View className="flex-row justify-between items-center mt-3 pt-2">
        <QuantityInput quantity={quantity} setQuantity={handleUpdateQuantity} />
        <Text
          className="font-bold text-base text-[#2E439C]"
          accessibilityLabel={`Total for ${product.title}`}
        >
          €{itemTotal.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};
