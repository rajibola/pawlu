import Facebook from "@/assets/images/svgs/Facebook";
import Instagram from "@/assets/images/svgs/Instagram";
import Twine from "@/assets/images/svgs/Twine";
import { View } from "react-native";
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
        <InterText>Email</InterText>
        <InterText>info@example.com</InterText>
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
        <View className="flex-row items-center gap-[6px] h-[34px] border border-[#F1BFC9] w-[150px] px-[13px] mt-[24px] mb-[25px] rounded bg-[#1D2953]">
          <InterText
            style={{ fontFamily: "Inter" }}
            className="text-xs text-[#F1BFC9] font-semibold"
          >
            Powered by
          </InterText>
          <Twine />
        </View>
      </View>
    </View>
  );
}
