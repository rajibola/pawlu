import { InterText } from "@/shared";
import React from "react";
import { View } from "react-native";
import { Product } from "../types";

interface ProductInfoProps {
  product: Product;
  price: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, price }) => {
  return (
    <View>
      <InterText className="text-xl font-bold text-[#101828]">
        {product.title}
      </InterText>
      <InterText className="text-xl font-medium text-[#2E439C] mt-2">
        {price}
      </InterText>
      <InterText className="text-base text-gray-600 leading-relaxed mb-12">
        {product.description}
      </InterText>
    </View>
  );
};

export default ProductInfo;
