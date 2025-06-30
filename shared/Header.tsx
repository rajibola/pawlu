import { Cart } from "@/assets/images/svgs";
import { useCart } from "@/context/CartContext";
import { Link } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";
import { InterText } from "./InterText";

export function Header() {
  const { cart } = useCart();
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View className="flex-row justify-between items-center h-12 bg-white px-4">
      <Link href="/" asChild>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Go to homepage"
        >
          <Image
            source={require("../assets/images/logo.png")}
            className="h-[25px] w-[75px]"
          />
        </TouchableOpacity>
      </Link>
      <Link href="/cart" asChild>
        <TouchableOpacity
          className="relative"
          accessibilityRole="button"
          accessibilityLabel="Go to cart"
        >
          <Cart />
          {cartItemCount > 0 && (
            <View className="absolute px-1 -top-1 -right-1 bg-yellow-400 rounded-full min-w-3 h-3 items-center justify-center">
              <InterText className="text-[8px] font-bold text-black">
                {cartItemCount}
              </InterText>
            </View>
          )}
        </TouchableOpacity>
      </Link>
    </View>
  );
}
