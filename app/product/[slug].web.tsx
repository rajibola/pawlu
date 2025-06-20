import { Facebook, Heart, Instagram } from "@/assets/images/svgs";
import ProductImageGallery from "@/components/ProductImageGallery";
import { useProductPage } from "@/hooks/useProductPage";
import { Footer } from "@/shared/Footer.web";
import InterText from "@/shared/InterText";
import { OptionValue } from "@/types";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProductDetailWeb() {
  const {
    product,
    loading,
    error,
    options,
    quantity,
    setQuantity,
    selectedOptions,
    handleOptionSelect,
    handleAddToCart,
  } = useProductPage();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#101828" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4 bg-white">
        <Text className="text-red-500 text-center">{error}</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text>Product not found.</Text>
      </View>
    );
  }

  const renderVariantSelectors = () => (
    <View className="space-y-6">
      {options.map((option) => {
        const isColorOption = option.name.toLowerCase() === "color";
        return (
          <View key={option.id}>
            <InterText className="text-sm font-medium text-gray-800 mb-3">
              {option.name}
            </InterText>
            <View className="flex-row flex-wrap gap-3">
              {option.option_values.map((value: OptionValue) => {
                const isSelected = selectedOptions[option.id] === value.id;
                if (isColorOption) {
                  return (
                    <TouchableOpacity
                      key={value.id}
                      onPress={() => handleOptionSelect(option.id, value.id)}
                      className={`w-8 h-8 rounded-full border-2 justify-center items-center ${
                        isSelected ? "border-amber-400" : "border-transparent"
                      }`}
                      style={{ backgroundColor: value.value }}
                    />
                  );
                }
                return (
                  <TouchableOpacity
                    key={value.id}
                    onPress={() => handleOptionSelect(option.id, value.id)}
                    className={`px-5 py-2.5 rounded-lg border ${
                      isSelected
                        ? "bg-amber-400 border-amber-400"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    <Text
                      className={`text-sm font-medium ${
                        isSelected ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {value.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      })}
    </View>
  );

  const renderQuantitySelector = () => (
    <View>
      <InterText className="text-sm font-medium text-gray-800 mb-3">
        Quantity
      </InterText>
      <View className="flex-row items-center border border-gray-300 rounded-lg self-start">
        <TouchableOpacity
          onPress={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-4 py-3"
        >
          <Text className="text-xl text-gray-500">-</Text>
        </TouchableOpacity>
        <Text className="text-base font-medium text-gray-800 px-4">
          {quantity}
        </Text>
        <TouchableOpacity
          onPress={() => setQuantity((q) => q + 1)}
          className="px-4 py-3"
        >
          <Text className="text-xl text-gray-500">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const ProductInfo = () => (
    <View className="w-full p-8 space-y-6">
      <View>
        <InterText className="text-3xl font-bold text-gray-900">
          {product.title}
        </InterText>
        <InterText className="text-2xl text-gray-700 mt-2">
          {product.product_variants[0]?.price.formatted}
        </InterText>
      </View>
      <InterText className="text-base text-gray-600 leading-relaxed">
        {product.description}
      </InterText>
      {options.length > 0 && renderVariantSelectors()}
      {renderQuantitySelector()}
      <View className="flex-row space-x-4 items-center pt-4">
        <TouchableOpacity
          onPress={handleAddToCart}
          className="flex-1 bg-[#2E439C] py-4 rounded-lg"
        >
          <Text className="text-white text-center font-bold text-base">
            Add to bag
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="p-3 border border-gray-300 rounded-lg">
          <Heart />
        </TouchableOpacity>
      </View>
      <View className="flex-row space-x-4 items-center pt-4">
        <TouchableOpacity>
          <Facebook />
        </TouchableOpacity>
        <TouchableOpacity>
          <Instagram />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <ScrollView>
        <View className="flex-1 flex-row">
          <View className="w-1/2 p-4">
            <ProductImageGallery images={product.media} />
          </View>
          <View className="w-1/2">
            <ProductInfo />
          </View>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}
