import Facebook from "@/assets/images/svgs/Facebook";
import Instagram from "@/assets/images/svgs/Instagram";
import { Image, View } from "react-native";
import InterText from "./InterText";

export function Footer() {
  return (
    <View className="bg-[#2E439C] px-4 pt-[42px]">
      <View className="flex-row items-center gap-4 mb-[52px]">
        <Facebook />
        <Instagram />
      </View>
      <InterText className="text-sm font-bold text-white mb-2">
        Contacts
      </InterText>
      <InterText className="text-sm text-white mb-[77px]">
        Email: sales@pawlus.mt
      </InterText>
      <InterText className="text-xs text-white mb-4 font-medium">
        Privacy Policy
      </InterText>
      <InterText className="text-xs text-white mb-4 font-medium">
        Terms of Service
      </InterText>
      <InterText className="text-xs text-white font-medium">
        Cookie Policy
      </InterText>

      <View className="border-t border-[#334AAD] mt-[35px] h-[83px]">
        <Image
          source={require("../assets/images/twine.png")}
          className="h-[34px] object-contain w-[150px] mt-[24px] mb-[25px]"
        />
      </View>
    </View>
  );
}
