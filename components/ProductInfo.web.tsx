import { InterText } from "@/shared";
import React from "react";
import { View } from "react-native";
import { Product } from "../types";

interface ProductInfoProps {
  product: Product;
  price: string;
}

export const ProductInfo = ({ product, price }: ProductInfoProps) => {
  return (
    <View>
      <InterText className="text-2xl font-semibold text-[#101828]">
        {product.title}
      </InterText>
      <InterText className="text-2xl font-semibold text-[#2E439C] mt-2">
        {price}
      </InterText>
      <InterText className="text-base text-[#344054] leading-relaxed mb-12">
        {product.description}
      </InterText>
    </View>
  );
};
