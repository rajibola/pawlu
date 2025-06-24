import { Cart } from "@/assets/images/svgs";
import { useCart } from "@/context/CartContext";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export function Header() {
  const { cart } = useCart();
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View className="flex-row justify-between items-center h-12 bg-white px-4">
      <Image
        source={require("../assets/images/logo.png")}
        className="h-[25px] w-[75px]"
      />
      <Link href="/cart" asChild>
        <TouchableOpacity
          className="relative"
          accessibilityRole="button"
          accessibilityLabel="Go to cart"
        >
          <Cart />
          {cartItemCount > 0 && (
            <View className="absolute px-1 -top-1 -right-1 bg-yellow-400 rounded-full min-w-3 h-3 items-center justify-center">
              <Text className="text-[8px] font-bold text-black">
                {cartItemCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </Link>
    </View>
  );
}
