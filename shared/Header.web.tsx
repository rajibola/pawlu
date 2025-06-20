import { Cart, Logo } from "@/assets/images/svgs";
import { useCart } from "@/context/CartContext";
import { Text, View } from "react-native";

export function Header() {
  const { cart } = useCart();
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View className="flex-row justify-between items-center h-16 bg-white px-12 w-full">
      <Text className="text-base text-black">Products</Text>
      <Logo width={134.41} height={45.37} />
      <View className="relative">
        <Cart />
        {cartItemCount > 0 && (
          <View className="absolute -top-[2px] -right-[3px] min-w-3 h-3 px-1 bg-yellow-400 rounded-full  items-center justify-center">
            <Text className="text-[8px] font-bold text-black">
              {cartItemCount}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
