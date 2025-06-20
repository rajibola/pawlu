import {
  ChevronDown,
  ChevronUp,
  Facebook,
  Heart,
  Instagram,
} from "@/assets/images/svgs";
import ProductImageGallery from "@/components/ProductImageGallery";
import { useProductPage } from "@/hooks/useProductPage";
import { Footer } from "@/shared/Footer";
import InterText from "@/shared/InterText";
import { OptionValue } from "@/types";
import {
  ActivityIndicator,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProductDetail() {
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
        <InterText className="text-red-500 text-center">{error}</InterText>
      </View>
    );
  }

  if (!product) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <InterText>Product not found.</InterText>
      </View>
    );
  }

  const renderVariantSelectors = () => (
    <View className="space-y-6 gap-8 mb-8">
      {options.map((option) => {
        const isColorOption = option.name?.toLowerCase() === "color";
        return (
          <View key={option.id}>
            <InterText className="text-base font-medium text-[#667085] mb-3">
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
                      className={`w-9 h-9 p-1 rounded-full border justify-center items-center ${isSelected ? "border-black" : "border-transparent"}`}
                      accessible={true}
                      accessibilityLabel={`${option.name} option: ${value.name}`}
                      accessibilityHint={
                        isSelected ? "Selected" : "Double tap to select"
                      }
                      accessibilityRole="button"
                      accessibilityState={{ selected: isSelected }}
                    >
                      <View
                        className="w-full h-full rounded-full"
                        style={{ backgroundColor: value.value.toLowerCase() }}
                      />
                    </TouchableOpacity>
                  );
                }
                return (
                  <TouchableOpacity
                    key={value.id}
                    onPress={() => handleOptionSelect(option.id, value.id)}
                    className={`px-5 py-2.5 rounded-lg border ${
                      isSelected
                        ? "bg-[#FFCA4E] border-[#FFCA4E]"
                        : "bg-white border-gray-300"
                    }`}
                    accessible={true}
                    accessibilityLabel={`${option.name} option: ${value.name}`}
                    accessibilityHint={
                      isSelected ? "Selected" : "Double tap to select"
                    }
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                  >
                    <InterText
                      className={`text-sm font-medium ${
                        isSelected ? "text-[#1F2D68]" : "text-[#101828]"
                      }`}
                    >
                      {value.name}
                    </InterText>
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
      <InterText className="text-base font-medium text-[#667085] mb-3">
        Quantity
      </InterText>
      <View className="flex-row items-center border border-gray-300 rounded-lg w-32">
        <TextInput
          className="flex-1 h-11 text-center text-base text-gray-900"
          value={String(quantity)}
          onChangeText={(text) => {
            const num = parseInt(text.replace(/[^0-9]/g, ""), 10);
            if (!isNaN(num)) {
              setQuantity(num);
            } else if (text === "") {
              setQuantity(0);
            }
          }}
          keyboardType="numeric"
          accessible={true}
          accessibilityLabel="Quantity input"
          accessibilityHint="Enter the quantity you want to add to cart"
          accessibilityRole="text"
        />
        <View className="pr-4">
          <TouchableOpacity
            onPress={() => setQuantity(quantity + 1)}
            className="p-1"
            accessible={true}
            accessibilityLabel="Increase quantity"
            accessibilityHint="Double tap to increase quantity by 1"
            accessibilityRole="button"
          >
            <ChevronUp />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            className="p-1"
            accessible={true}
            accessibilityLabel="Decrease quantity"
            accessibilityHint="Double tap to decrease quantity by 1"
            accessibilityRole="button"
          >
            <ChevronDown />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const ProductInfo = () => (
    <View className="w-full px-[10px] space-y-6 mt-10">
      <View>
        <InterText className="text-xl font-bold text-[#101828]">
          {product.title}
        </InterText>
        <InterText className="text-xl font-medium text-[#2E439C] mt-2">
          {product.product_variants[0]?.price.formatted}
        </InterText>
      </View>
      <InterText className="text-base text-gray-600 leading-relaxed mb-12">
        {product.description}
      </InterText>
      {options.length > 0 && renderVariantSelectors()}
      {renderQuantitySelector()}
      <View className="flex-row space-x-4 items-center mt-12 mr-3 gap-2">
        <TouchableOpacity
          onPress={handleAddToCart}
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
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <ScrollView>
        <View className="w-full px-[10px]">
          <ProductImageGallery images={product.media} />
        </View>
        <View className="w-full mb-10">
          <ProductInfo />
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}
