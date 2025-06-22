import { CartListItem } from "@/components/CartListItem";
import { CartSummary } from "@/components/CartSummary";
import { CartItem, useCart } from "@/context/CartContext";
import { Header } from "@/shared/Header";
import { FlatList, Text, View } from "react-native";
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
    <SafeAreaView className="flex-1 bg-gray-50">
      <Header />
      <View className="p-4 flex-1">
        <Text className="text-2xl font-bold mb-4">My Cart</Text>
        {cart.length > 0 ? (
          <FlatList
            data={cart}
            renderItem={({ item }: { item: CartItem }) => (
              <CartListItem item={item} />
            )}
            keyExtractor={(item) => item.variant.id.toString()}
            ListFooterComponent={<CartSummary />}
            showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-4"
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-600">Your cart is empty.</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
