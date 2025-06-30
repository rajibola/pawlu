import { useError } from "@/context/ErrorContext";
import { ErrorMessage, Footer, InterText } from "@/shared";
import React from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import useProducts from "../hooks/useProducts";
import Pagination from "./Pagination";

export default function Home() {
  const { products, loading, meta, handlePageChange, renderProduct, apiUrl } =
    useProducts();
  const { error: globalError, clearError } = useError();

  // Retry handler for ErrorMessage
  const handleRetry = () => {
    clearError();
    handlePageChange(null); // reload first page
  };

  return (
    <View className="flex-1 flex-col">
      <ErrorMessage onRetry={handleRetry} />
      {!globalError &&
        (loading ? (
          <ActivityIndicator
            size="large"
            color="#101828"
            className="mt-40 flex-1"
          />
        ) : products.length === 0 ? (
          <InterText className="text-lg font-semibold text-gray-600 text-center mt-10">
            No products found.
          </InterText>
        ) : (
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
        ))}
    </View>
  );
}
