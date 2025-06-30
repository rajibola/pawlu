import { CartListItem, CartSummary } from "@/components";
import { CartItem, useCart } from "@/context/CartContext";
import { Footer, InterText } from "@/shared";
import { FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
  const { cart, loading } = useCart();

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView className="flex-1">
      {cart.length > 0 ? (
        <View>
          <InterText className="text-2xl font-bold mb-[30px] mt-[63px] ml-4">
            My Cart
          </InterText>
          <FlatList
            data={cart}
            contentContainerStyle={{
              marginHorizontal: 16,
              borderWidth: 1,
              borderColor: "#D0D5DD",
              paddingBottom: 16,
              borderRadius: 12,
              flexGrow: 1,
            }}
            renderItem={({
              item,
              index,
            }: {
              item: CartItem;
              index: number;
            }) => (
              <CartListItem item={item} isLast={index === cart.length - 1} />
            )}
            keyExtractor={(item) => item.variant.id.toString()}
            ListHeaderComponent={() => (
              <View className="flex-row justify-between items-center border-b border-[#D0D5DD] p-3 h-11">
                <InterText className="text-sm font-medium text-[#667085]">
                  Product
                </InterText>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />

          <View className="mt-4 relative">
            <View className="m-4 mb-[102px]">
              <CartSummary />
            </View>
            <Footer />
          </View>
        </View>
      ) : (
        <View className="flex-1 justify-center items-center">
          <InterText className="text-gray-600">Your cart is empty.</InterText>
        </View>
      )}
    </ScrollView>
  );
}
