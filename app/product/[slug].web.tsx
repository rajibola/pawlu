import ProductActions from "@/components/ProductActions.web";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductInfo from "@/components/ProductInfo.web";
import QuantitySelector from "@/components/QuantitySelector.web";
import VariantSelector from "@/components/VariantSelector.web";
import { useProductPage } from "@/hooks/useProductPage";
import { Footer } from "@/shared/Footer.web";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

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
    price,
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

  return (
    <View className="flex-1 bg-white">
      <ScrollView>
        <View className="flex-1 flex-row px-[47px] gap-[58px] mb-[86px] mt-[76px]">
          <View className="w-[484px]">
            <ProductImageGallery images={product.media} />
          </View>
          <View className="max-w-[542px]">
            <ProductInfo product={product} price={price} />
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
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}
