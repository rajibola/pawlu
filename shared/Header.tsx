import { Cart } from "@/assets/images/svgs";
import { Image, Text, View } from "react-native";

export function Header() {
  return (
    <View className="flex-row justify-between items-center h-12 bg-white px-4">
      <Image
        source={require("../assets/images/logo.png")}
        className="h-[25px] w-[75px]"
      />
      <View className="relative">
        <Cart />
        <View className="absolute -top-1 -right-1 bg-yellow-400 rounded-full w-4 h-4 items-center justify-center border border-white">
          <Text className="text-xs font-bold text-black">1</Text>
        </View>
      </View>
    </View>
  );
}
