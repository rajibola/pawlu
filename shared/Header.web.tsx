import { Cart, Logo } from "@/assets/images/svgs";
import { useCart } from "@/context/CartContext";
import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { InterText } from "./InterText";

export function Header() {
  const { cart } = useCart();
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const router = useRouter();

  return (
    <View className="flex-row justify-between items-center h-16 bg-white px-12 w-full">
      <InterText className="text-base text-black">Products</InterText>
      <Logo width={134.41} height={45.37} />
      <TouchableOpacity
        className="relative"
        onPress={() => router.push("/cart")}
        accessibilityRole="button"
        accessibilityLabel="Go to cart"
      >
        <Cart />
        {cartItemCount > 0 && (
          <View className="absolute -top-[2px] -right-[3px] min-w-3 h-3 px-1 bg-yellow-400 rounded-full  items-center justify-center">
            <InterText className="text-[8px] font-bold text-black">
              {cartItemCount}
            </InterText>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
