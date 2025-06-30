import { InterText } from "@/shared";
import React from "react";
import { Image, ImageSourcePropType, View } from "react-native";
import { Heart, ShoppingBag } from "../assets/images/svgs";

interface ProductCardProps {
  image: ImageSourcePropType | string;
  name: string;
  price: string;
}

export const ProductCard = ({ image, name, price }: ProductCardProps) => {
  return (
    <View
      className="bg-white rounded-xl items-center min-w-[286px]"
      accessible={true}
      accessibilityLabel={`Product: ${name}, Price: ${price}`}
      accessibilityHint="Double tap to view product details"
      accessibilityRole="button"
    >
      <View className="bg-white rounded-xl border-[2.21px] border-[#F2F4F7] px-[22px] py-[53px] mb-5 w-full h-[286px] items-center justify-center">
        <Image
          source={typeof image === "string" ? { uri: image } : image}
          className="w-full h-full object-cover"
          resizeMode="contain"
          accessible={true}
          accessibilityLabel={`Product image for ${name}`}
        />
        <View className="absolute top-[18px] right-[18px] flex-col gap-[20px]">
          <Heart />
          <ShoppingBag />
        </View>
      </View>
      <View className="w-full px-2">
        <InterText className="text-sm font-semibold text-[#101828] mb-2">
          {name}
        </InterText>
        <InterText className="text-sm font-sm text-[#2E439C] font-bold">
          {price}
        </InterText>
      </View>
    </View>
  );
};
