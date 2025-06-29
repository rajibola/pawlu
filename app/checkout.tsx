import { CartSummary } from "@/components/CartSummary";
import { Footer } from "@/shared/Footer";
import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function CheckoutWeb() {
  return (
    <ScrollView>
      <View className="flex-1 px-11 mt-[54px] mb-[86px]">
        <Text className="text-2xl font-semibold mb-6">Billing Details</Text>
        {/* Billing Details Form Placeholder */}
        <View className="grid grid-cols-2 gap-6 mb-8">
          <input
            className="border rounded-lg p-3 w-full"
            placeholder="First name"
          />
          <input
            className="border rounded-lg p-3 w-full"
            placeholder="Last name"
          />
        </View>
        <View className="mb-8">
          <input
            className="border rounded-lg p-3 w-full mb-4"
            placeholder="Company"
          />
          <input
            className="border rounded-lg p-3 w-full mb-4"
            placeholder="VAT number"
          />
          <input
            className="border rounded-lg p-3 w-full mb-4"
            placeholder="Phone number"
          />
          <select className="border rounded-lg p-3 w-full mb-4">
            <option>Malta</option>
          </select>
          <input
            className="border rounded-lg p-3 w-full mb-4"
            placeholder="Address line 1"
          />
          <input
            className="border rounded-lg p-3 w-full mb-4"
            placeholder="Address line 2"
          />
          <div className="grid grid-cols-3 gap-4">
            <input
              className="border rounded-lg p-3 w-full"
              placeholder="City"
            />
            <input
              className="border rounded-lg p-3 w-full"
              placeholder="State"
            />
            <input
              className="border rounded-lg p-3 w-full"
              placeholder="Zip code"
            />
          </div>
        </View>
        <Text className="text-xl font-semibold mb-4">Delivery</Text>
        {/* Delivery Options Placeholder */}
        <View className="border rounded-lg p-6 mb-8">
          <label className="flex items-center mb-2">
            <input
              type="radio"
              name="delivery"
              className="mr-2"
              defaultChecked
            />{" "}
            Ship
          </label>
          <label className="flex items-center mb-2">
            <input type="radio" name="delivery" className="mr-2" /> Pickup in
            store
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Ship to a different
            address?
          </label>
        </View>
        <button
          className="w-full h-14 rounded-lg bg-gray-200 text-gray-500 font-semibold text-lg"
          disabled
        >
          Pay now
        </button>
      </View>
      <View className="absolute top-[54px] right-11 w-[386px]">
        <CartSummary />
      </View>
      <Footer />
    </ScrollView>
  );
}
