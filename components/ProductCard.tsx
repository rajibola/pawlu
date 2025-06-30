import { InterText } from "@/shared";
import React from "react";
import { Image, ImageSourcePropType, View } from "react-native";

interface ProductCardProps {
  image: ImageSourcePropType | string;
  name: string;
  price: string;
}

export const ProductCard = ({ image, name, price }: ProductCardProps) => {
  return (
    <View
      className="bg-white rounded-xl flex-1 items-center"
      accessible={true}
      accessibilityLabel={`Product: ${name}, Price: ${price}`}
      accessibilityHint="Double tap to view product details"
      accessibilityRole="button"
    >
      <View className="bg-white rounded-lg border-[2.21px] border-[#F2F4F7] px-7 py-[24.5px] mb-3 w-full h-[150px] items-center justify-center">
        <Image
          source={typeof image === "string" ? { uri: image } : image}
          className="w-full h-full object-cover"
          resizeMode="contain"
          accessible={true}
          accessibilityLabel={`Product image for ${name}`}
        />
      </View>
      <View className="w-full px-2">
        <InterText className="text-xs font-semibold text-[#101828] mb-1">
          {name}
        </InterText>
        <InterText className="text-xs font-sm text-[##2E439C] font-bold">
          {price}
        </InterText>
      </View>
    </View>
  );
};
