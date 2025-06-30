import { Store } from "@/assets/images/svgs/Store";
import { Truck } from "@/assets/images/svgs/Truck";
import { CartSummary } from "@/components/CartSummary";
import Dropdown from "@/components/Dropdown";
import TextInput from "@/components/TextInput.web";
import { Footer } from "@/shared/Footer";
import InterText from "@/shared/InterText";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function CheckoutWeb() {
  const [deliveryMethod, setDeliveryMethod] = useState<"ship" | "pickup">(
    "ship"
  );
  const [country, setCountry] = useState("Malta");
  const [state, setState] = useState("");
  const countryOptions = ["Malta", "Italy", "France"];
  const stateOptions = ["State 1", "State 2", "State 3"];
  return (
    <ScrollView>
      <View className="flex flex-row gap-[111px] px-11 mt-[84px]">
        <View className="flex-1 mb-[86px] max-w-auto">
          <InterText className="text-xl font-semibold mb-6">
            Billing Details
          </InterText>
          <View className="grid grid-cols-2 gap-6">
            <TextInput
              label="First name"
              placeholder="Enter your first name"
              value=""
              onChange={() => {}}
              name="firstName"
            />
            <TextInput
              label="Last name"
              placeholder="Enter your last name"
              value=""
              onChange={() => {}}
              name="lastName"
            />
          </View>
          <View className="flex flex-col gap-6 mt-6">
            <TextInput
              label="Company"
              placeholder="Enter your company name"
              value=""
              onChange={() => {}}
              name="company"
            />
            <TextInput
              label="VAT number"
              placeholder="Enter your VAT number"
              value=""
              onChange={() => {}}
              name="vatNumber"
            />
            <TextInput
              label="Phone number"
              placeholder="012334455"
              value=""
              onChange={() => {}}
              name="phoneNumber"
            />
            <Dropdown
              label="Country"
              options={countryOptions}
              value={country}
              onChange={setCountry}
              name="country"
            />
            <TextInput
              label="Address line 1"
              placeholder="House number and street name"
              value=""
              onChange={() => {}}
              name="address1"
            />
            <TextInput
              label="Address line 2"
              placeholder="House number and street name"
              value=""
              onChange={() => {}}
              name="address2"
            />
            <View className="grid grid-cols-3 gap-4">
              <TextInput
                label="City"
                placeholder="City"
                value=""
                onChange={() => {}}
                name="city"
              />
              <Dropdown
                label="State"
                options={stateOptions}
                value={state}
                onChange={setState}
                name="state"
              />
              <TextInput
                label="Zip Code"
                placeholder="Zip code"
                value=""
                onChange={() => {}}
                name="zipCode"
              />
            </View>
          </View>
          <View className="bg-[#EAECF0] w-full h-[1px] my-10 -z-10" />
          <InterText className="text-xl font-semibold mb-6">Delivery</InterText>
          <View className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8 px-8">
            <TouchableOpacity
              className="flex-row items-center py-5"
              onPress={() => setDeliveryMethod("ship")}
            >
              <View
                className={`w-4 h-4 rounded-full border-2 items-center justify-center mr-4 ${deliveryMethod === "ship" ? "border-[#AA8734]" : "border-[#D0D5DD]"}`}
              >
                {deliveryMethod === "ship" && (
                  <View className="w-[6px] h-[6px] rounded-full bg-[#AA8734]" />
                )}
              </View>
              <Text
                className={`text-base font-semibold mr-auto ${deliveryMethod === "ship" ? "text-[#101828]" : "text-[#667085]"}`}
              >
                Ship
              </Text>
              <Truck
                stroke={deliveryMethod === "ship" ? "#101828" : "#98A2B3"}
              />
            </TouchableOpacity>
            <View className="border-t border-gray-200 m-0" />
            <TouchableOpacity
              className="flex-row items-center py-5"
              onPress={() => setDeliveryMethod("pickup")}
            >
              <View
                className={`w-4 h-4 rounded-full border-2 items-center justify-center mr-4 ${deliveryMethod === "pickup" ? "border-[#AA8734]" : "border-[#D0D5DD]"}`}
              >
                {deliveryMethod === "pickup" && (
                  <View className="w-[6px] h-[6px] rounded-full bg-[#AA8734]" />
                )}
              </View>
              <Text
                className={`text-base font-semibold mr-auto ${deliveryMethod === "pickup" ? "text-[#101828]" : "text-[#667085]"}`}
              >
                Pickup in store
              </Text>
              <Store
                stroke={deliveryMethod === "pickup" ? "#101828" : "#98A2B3"}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="flex-row items-center mb-[60px]">
            <View className="w-4 h-4 border border-[#D0D5DD] rounded mr-2 bg-white" />
            <InterText className="text-sm font-semibold text-[#344054]">
              Ship to a different address?
            </InterText>
          </TouchableOpacity>
          <TouchableOpacity
            className={`w-full h-14 rounded-lg text-white font-semibold text-base flex items-center justify-center ${true ? "bg-[#D0D5DD]" : "bg-[#2E439C]"}`}
            disabled={true}
          >
            <InterText className="text-white text-base font-semibold">
              Pay now
            </InterText>
          </TouchableOpacity>
        </View>
        <View className="w-[386px]">
          <CartSummary isCheckout />
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}
