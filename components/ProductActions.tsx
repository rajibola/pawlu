import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Facebook, Heart, Instagram } from "../assets/images/svgs";
import InterText from "../shared/InterText";

interface ProductActionsProps {
  onAddToCart: () => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({ onAddToCart }) => {
  return (
    <>
      <View className="flex-row space-x-4 items-center mt-12 mr-3 gap-2">
        <TouchableOpacity
          onPress={onAddToCart}
          className="flex-1 bg-[#2E439C] rounded-lg h-11 items-center justify-center"
          accessible={true}
          accessibilityLabel="Add to bag"
          accessibilityHint="Double tap to add this product to your shopping bag"
          accessibilityRole="button"
        >
          <InterText className="text-white text-center font-bold text-base">
            Add to bag
          </InterText>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#FFF4DC] rounded-lg h-11 w-11 items-center justify-center"
          accessible={true}
          accessibilityLabel="Add to wishlist"
          accessibilityHint="Double tap to add this product to your wishlist"
          accessibilityRole="button"
        >
          <Heart />
        </TouchableOpacity>
      </View>
      <View className="flex-row space-x-4 items-center">
        <TouchableOpacity>
          <Facebook />
        </TouchableOpacity>
        <TouchableOpacity>
          <Instagram />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ProductActions;
