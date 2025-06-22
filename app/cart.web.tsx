import { CartListItem } from "@/components/CartListItem";
import { CartSummary } from "@/components/CartSummary";
import { CartItem, useCart } from "@/context/CartContext";
import { Footer } from "@/shared/Footer";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreenWeb() {
  const { cart, loading } = useCart();

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-gray-50">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView>
      <View className="container mx-auto p-4 lg:p-8">
        <Text className="text-3xl font-bold mb-6">My Cart</Text>
        {cart.length > 0 ? (
          <View className="flex-row gap-8 items-start">
            {/* Left Column: Cart Items */}
            <View className="w-2/3">
              <View className="bg-white p-6 shadow rounded-lg">
                {/* Table Header */}
                <View className="flex-row pb-4 border-b border-gray-200">
                  <Text className="w-1/2 font-semibold text-gray-600">
                    Product
                  </Text>
                  <Text className="w-1/4 font-semibold text-gray-600">
                    Quantity
                  </Text>
                  <Text className="w-1/4 font-semibold text-gray-600">
                    Subtotal
                  </Text>
                </View>
                {cart.map((item: CartItem) => (
                  <CartListItem key={item.variant.id} item={item} />
                ))}
              </View>
            </View>

            {/* Right Column: Summary */}
            <View className="w-1/3">
              <CartSummary />
            </View>
          </View>
        ) : (
          <View className="bg-white p-12 shadow rounded-lg items-center">
            <Text className="text-xl text-gray-600">Your cart is empty.</Text>
          </View>
        )}
      </View>
      <Footer />
    </ScrollView>
  );
}
