import {
  ProductActions,
  ProductImageGallery,
  ProductInfo,
  QuantitySelector,
  VariantSelector,
} from "@/components";
import { useProductPage } from "@/hooks/useProductPage";
import { Footer, InterText } from "@/shared";
import { ActivityIndicator, ScrollView, View } from "react-native";

export default function ProductDetail() {
  const {
    product,
    loading,
    options,
    quantity,
    setQuantity,
    selectedOptions,
    handleOptionSelect,
    handleAddToCart,
    price,
  } = useProductPage();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#101828" />
      </View>
    );
  }

  if (!loading && !product) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <InterText>Product not found.</InterText>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView>
        <View className="w-full px-[10px]">
          <ProductImageGallery images={product!.media} />
        </View>
        <View className="w-full px-[10px] space-y-6 mt-10">
          <ProductInfo product={product!} price={price} />
          {options.length > 0 && (
            <VariantSelector
              options={options}
              selectedOptions={selectedOptions}
              onOptionSelect={handleOptionSelect}
            />
          )}
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
          <ProductActions onAddToCart={handleAddToCart} />
        </View>
        <View className="w-full mb-10">
          <Footer />
        </View>
      </ScrollView>
    </View>
  );
}
