import Facebook from "@/assets/images/svgs/Facebook";
import Instagram from "@/assets/images/svgs/Instagram";
import { Image } from "expo-image";
import { View } from "react-native";
import InterText from "./InterText";

export function Footer() {
  return (
    <View className="bg-[#2E439C] px-11">
      <View className="flex-row gap-2 justify-between items-center pt-[75px] pb-[52px]">
        <View>
          <InterText className="text-white text-sm font-bold mb-2">
            Contacts
          </InterText>
          <InterText className="text-white text-sm">
            <InterText>Email</InterText>
            <InterText>info@example.com</InterText>
          </InterText>
        </View>
        <View className="gap-4">
          <Facebook />
          <Instagram />
        </View>
      </View>
      <View className="border-t border-[#334AAD] mt-[35px] h-[83px] flex-row justify-between items-center">
        <View className="flex-row gap-10">
          <InterText className="text-xs text-white font-medium">
            Privacy Policy
          </InterText>
          <InterText className="text-xs text-white font-medium">
            Terms of Service
          </InterText>
          <InterText className="text-xs text-white font-medium">
            Cookie Policy
          </InterText>
        </View>
        <Image
          source={require("../assets/images/twine.png")}
          className="h-[34px] object-contain w-[150px]"
        />
      </View>
    </View>
  );
}
