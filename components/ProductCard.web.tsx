import React from "react";
import { Image, ImageSourcePropType, View } from "react-native";
import InterText from "./InterText";

interface ProductCardProps {
  image: ImageSourcePropType | string; // Accept local or remote image
  name: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, name, price }) => {
  return (
    <View className="bg-white rounded-xl items-center min-w-[286px]">
      <View className="bg-white rounded-lg border-[2.21px] border-[#F2F4F7] px-[22px] py-[53px] mb-5 w-full h-[286px] items-center justify-center">
        <Image
          source={typeof image === "string" ? { uri: image } : image}
          className="w-full h-full object-cover"
          resizeMode="contain"
        />
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

export default ProductCard;
