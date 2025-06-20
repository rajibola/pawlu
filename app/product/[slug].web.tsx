import {
  ChevronDown,
  ChevronUp,
  Facebook,
  Heart,
  Instagram,
} from "@/assets/images/svgs";
import ProductImageGallery from "@/components/ProductImageGallery";
import { useProductPage } from "@/hooks/useProductPage";
import { Footer } from "@/shared/Footer.web";
import InterText from "@/shared/InterText";
import { OptionValue } from "@/types";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
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
    <View className="gap-11">
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
                    className={`w-[80px] h-[48px] flex items-center justify-center rounded-[4px] border ${isSelected ? "bg-[#FFCA4E] border-[#FFCA4E]" : "bg-white border-gray-300"}`}
                  >
                    <InterText
                      className={`text-sm font-medium ${isSelected ? "text-[#1F2D68]" : "text-[#101828]"}`}
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
    <View className="mt-11">
      <InterText className="text-base font-medium text-[#667085] mb-3">
        Quantity
      </InterText>
      <View className="flex-row items-center border border-gray-300 rounded-lg w-[208px]">
        <TextInput
          className="flex-1 h-12 text-center text-base text-gray-900"
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
        />
        <View className="pr-4 flex items-center justify-between">
          <TouchableOpacity
            onPress={() => setQuantity(quantity + 1)}
            className="p-1"
          >
            <ChevronUp />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            className="p-1"
          >
            <ChevronDown />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const ProductInfo = () => (
    <View className="w-full mt-10">
      <View>
        <InterText className="text-2xl font-semibold text-[#101828]">
          {product.title}
        </InterText>
        <InterText className="text-2xl font-semibold text-[#2E439C] mt-2">
          {product.product_variants[0]?.price.formatted}
        </InterText>
      </View>
      <InterText className="text-base text-[#344054] leading-relaxed mb-12">
        {product.description}
      </InterText>
      {options.length > 0 && renderVariantSelectors()}
      {renderQuantitySelector()}
      <View className="flex-row items-center gap-2 mt-[87px]">
        <TouchableOpacity
          onPress={handleAddToCart}
          className="flex-1 bg-[#2E439C] rounded-lg h-14 items-center justify-center max-w-[360px]"
        >
          <InterText className="text-white text-center font-bold text-base">
            Add to bag
          </InterText>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#FFF4DC] rounded-lg h-14 w-14 items-center justify-center">
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
        <View className="flex-1 flex-row px-[47px] gap-[58px] mb-[86px] mt-[76px]">
          <View className="w-[484px]">
            <ProductImageGallery images={product.media} />
          </View>
          <View className="max-w-[542px]">
            <ProductInfo />
          </View>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}
