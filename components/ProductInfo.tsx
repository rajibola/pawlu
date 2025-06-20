import React from "react";
import { View } from "react-native";
import InterText from "../shared/InterText";
import { Product } from "../types";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <View>
      <InterText className="text-xl font-bold text-[#101828]">
        {product.title}
      </InterText>
      <InterText className="text-xl font-medium text-[#2E439C] mt-2">
        {product.product_variants[0]?.price.formatted}
      </InterText>
      <InterText className="text-base text-gray-600 leading-relaxed mb-12">
        {product.description}
      </InterText>
    </View>
  );
};

export default ProductInfo;
