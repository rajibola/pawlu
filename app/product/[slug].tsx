import ProductActions from "@/components/ProductActions";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductInfo from "@/components/ProductInfo";
import QuantitySelector from "@/components/QuantitySelector";
import VariantSelector from "@/components/VariantSelector";
import { useProductPage } from "@/hooks/useProductPage";
import { Footer } from "@/shared/Footer";
import InterText from "@/shared/InterText";
import { ActivityIndicator, ScrollView, View } from "react-native";

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

  return (
    <View className="flex-1 bg-white">
      <ScrollView>
        <View className="w-full px-[10px]">
          <ProductImageGallery images={product.media} />
        </View>
        <View className="w-full px-[10px] space-y-6 mt-10">
          <ProductInfo product={product} />
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
