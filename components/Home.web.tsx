import { useError } from "@/context/ErrorContext";
import { ErrorMessage, Footer, InterText } from "@/shared";
import { Product } from "@/types";
import { Link } from "expo-router";
import React from "react";
import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";
import useProducts from "../hooks/useProducts";
import { formatProductForDisplay } from "../services/productService";

import Pagination from "./Pagination.web";
import ProductCard from "./ProductCard.web";

export default function Home() {
  const { products, loading, meta, handlePageChange, apiUrl } = useProducts();
  const { error: globalError, clearError } = useError();

  // Retry handler for ErrorMessage
  const handleRetry = () => {
    clearError();
    handlePageChange(null); // reload first page
  };

  if (loading) {
    return (
      <View className="flex-1 flex-col w-screen">
        <ErrorMessage onRetry={handleRetry} />
        <ActivityIndicator
          size="large"
          color="#101828"
          className="mt-40 flex-1"
        />
      </View>
    );
  }

  return (
    <View className="flex-1 flex-col w-screen">
      <ErrorMessage onRetry={handleRetry} />
      {!globalError && (
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
      )}
    </View>
  );
}
