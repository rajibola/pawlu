import React from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import useProducts from "../hooks/useProducts";
import { Footer } from "../shared/Footer";
import InterText from "../shared/InterText";
import Pagination from "./Pagination";

export default function Home() {
  const {
    products,
    loading,
    error,
    meta,
    handlePageChange,
    renderProduct,
    apiUrl,
  } = useProducts();

  if (loading) {
    return (
      <View className="flex-1 flex-col">
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
      <View className="flex-1 flex-col justify-center items-center px-4">
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
    <View className="flex-1 flex-col">
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={renderProduct}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          paddingHorizontal: 16,
        }}
        contentContainerStyle={{
          gap: 27,
        }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View className="flex-1 flex-col gap-[54px]">
            <Pagination
              meta={meta}
              onPageChange={handlePageChange}
              apiUrl={apiUrl || ""}
            />
            <Footer />
          </View>
        }
        ListHeaderComponent={() => (
          <View className="flex-1 px-4">
            <InterText className="font-semibold text-xl my-[42px] text-[#101828] text-center">
              Products
            </InterText>
          </View>
        )}
      />
    </View>
  );
}
