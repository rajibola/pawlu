import { Product } from "@/types";
import { Link } from "expo-router";
import React from "react";
import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";
import useProducts from "../hooks/useProducts";
import { formatProductForDisplay } from "../services/productService";
import { Footer } from "../shared/Footer.web";
import InterText from "../shared/InterText";
import Pagination from "./Pagination.web";
import ProductCard from "./ProductCard.web";

export default function Home() {
  const { products, loading, error, meta, handlePageChange, apiUrl } =
    useProducts();

  if (loading) {
    return (
      <View className="flex-1 flex-col w-screen">
        <ActivityIndicator
          size="large"
          color="#101828"
          className="mt-40 flex-1"
        />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 flex-col w-screen justify-center items-center px-4">
        <InterText className="text-lg font-semibold text-red-600 mb-2 text-center">
          Error Loading Products
        </InterText>
        <InterText className="text-sm text-gray-600 text-center">
          {error}
        </InterText>
      </View>
    );
  }

  return (
    <View className="flex-1 flex-col w-screen">
      <ScrollView showsVerticalScrollIndicator={false} className="w-full">
        {/* Header */}
        <View className="px-11 mb-14">
          <InterText className="font-semibold text-4xl mt-[72px] text-[#101828] text-center">
            Rentals
          </InterText>
        </View>

        {/* Product Grid */}
        <View className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 px-11">
          {products.map((item: Product) => {
            const formattedProduct = formatProductForDisplay(item);
            return (
              <Link href={`/product/${item.slug}`} key={item.id} asChild>
                <Pressable style={{ minWidth: 286 }}>
                  <ProductCard
                    image={formattedProduct.image}
                    name={formattedProduct.title}
                    price={formattedProduct.price}
                  />
                </Pressable>
              </Link>
            );
          })}
        </View>

        {/* Footer (Pagination) */}
        <View className="flex-1 flex-col gap-[54px]">
          <Pagination
            meta={meta}
            onPageChange={handlePageChange}
            apiUrl={apiUrl || ""}
          />
          <Footer />
        </View>
      </ScrollView>
    </View>
  );
}
