import { ProductMedia } from "@/types";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

type ProductImageGalleryProps = {
  images: ProductMedia[];
};

export const ProductImageGallery = ({ images }: ProductImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(images[0]?.url);
  const { width } = useWindowDimensions();
  const isWeb = width > 768;

  if (!images || images.length === 0) {
    return (
      <View className="w-full h-64 bg-gray-200 justify-center items-center">
        <Image
          source={require("@/assets/images/logo.png")}
          className="w-32 h-32 opacity-50"
          resizeMode="contain"
        />
      </View>
    );
  }

  return (
    <View className={`w-full ${isWeb ? "p-4" : ""}`}>
      <View className="mb-4 border border-gray-200 rounded-xl px-[49px] py-[66px]">
        <Image
          source={{ uri: selectedImage }}
          className="h-64 rounded-lg"
          resizeMode="contain"
          accessibilityLabel="Main product image"
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        accessibilityLabel="Product image thumbnails"
        contentContainerStyle={{ paddingHorizontal: 6 }}
      >
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedImage(image.url)}
            className={`w-20 h-20 rounded-xl mr-2 border ${
              selectedImage === image.url
                ? "border-[#FFD36C]"
                : "border-gray-200"
            }`}
            accessibilityLabel={`Product image thumbnail ${index + 1}`}
            accessibilityHint="Select to view this image as the main image"
          >
            <Image
              source={{ uri: image.url }}
              className="w-full h-full rounded-xl"
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
