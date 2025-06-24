import { CartListItem } from "@/components/CartListItem";
import { CartSummary } from "@/components/CartSummary";
import { CartItem, useCart } from "@/context/CartContext";
import { Footer } from "@/shared/Footer";
import InterText from "@/shared/InterText";
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
    // <SafeAreaView className="flex-1 bg-gray-50">
    <View className="flex-1">
      {cart.length > 0 ? (
        <>
          <FlatList
            data={cart}
            renderItem={({ item }: { item: CartItem }) => (
              <CartListItem item={item} />
            )}
            keyExtractor={(item) => item.variant.id.toString()}
            ListHeaderComponent={() => (
              <InterText className="text-2xl font-bold mb-4">My Cart</InterText>
            )}
            ListFooterComponent={() => (
              <View className="mt-4">
                <CartSummary />
                <Footer />
              </View>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-4"
            ListFooterComponentStyle={{
              marginTop: 16,
              padding: 0,
              margin: 0,
            }}
          />
        </>
      ) : (
        <View className="flex-1 justify-center items-center">
          <InterText className="text-gray-600">Your cart is empty.</InterText>
        </View>
      )}
    </View>
    // </SafeAreaView>
  );
}
