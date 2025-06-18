import React from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import useProducts from "../hooks/useProducts";
import { Footer } from "./Footer";
import InterText from "./InterText";

export default function Home() {
  const { products, loading, renderPagination, renderProduct } = useProducts();

  return (
    <View className="flex-1 flex-col">
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#101828"
          className="mt-40 flex-1"
        />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={renderProduct}
          columnWrapperStyle={{
            justifyContent: "center",
            gap: 16,
            paddingHorizontal: 16,
          }}
          contentContainerStyle={{
            gap: 27,
          }}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <View className="flex-1 flex-col gap-[54px]">
              {renderPagination && renderPagination()}
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
      )}
    </View>
  );
}
