import { Text, View } from "react-native";
import Cart from "../assets/images/svgs/Cart";
import Logo from "../assets/images/svgs/Logo";

export function Header() {
  return (
    <View className="flex-row justify-between items-center h-16 bg-white px-12 w-full border-b border-gray-200">
      <Text className="text-base text-black">Products</Text>
      <Logo width={134.41} height={45.37} />
      <View className="relative">
        <Cart />
        <View className="absolute -top-1 -right-1 bg-yellow-400 rounded-full w-4 h-4 items-center justify-center border border-white">
          <Text className="text-xs font-bold text-black">1</Text>
        </View>
      </View>
    </View>
  );
}
