import React from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import useProducts from "../hooks/useProducts";
import InterText from "./InterText";
import Pagination from "./Pagination.web";
import ProductCard from "./ProductCard.web";

import type { Product } from "../hooks/useProducts";
import { Footer } from "./Footer.web";

export default function Home() {
  const { products, loading, meta, handlePageChange, apiUrl } = useProducts();

  return (
    <View className="flex-1 flex-col w-screen">
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#101828"
          className="mt-40 flex-1"
        />
      ) : (
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
              const image =
                item.media && item.media.length > 0
                  ? item.media[0].conversions?.["medium-square"] ||
                    item.media[0].url
                  : require("../assets/images/logo.png");
              const price =
                item.product_variants && item.product_variants.length > 0
                  ? item.product_variants[0].price.formatted
                  : "-";
              return (
                <ProductCard
                  key={item.id}
                  image={image}
                  name={item.title}
                  price={price}
                />
              );
            })}
          </View>

          {/* Footer (Pagination) */}
          <View className="flex-1 flex-col gap-[54px]">
            <Pagination
              meta={meta}
              onPageChange={handlePageChange}
              apiUrl={apiUrl}
            />
            <Footer />
          </View>
        </ScrollView>
      )}
    </View>
  );
}
