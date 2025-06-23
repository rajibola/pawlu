import CancelIcon from "@/assets/images/svgs/Cancel";
import { CartSummary } from "@/components/CartSummary";
import QuantityInput from "@/components/QuantityInput.web";
import { CartItem, useCart } from "@/context/CartContext";
import { Footer } from "@/shared/Footer";
import InterText from "@/shared/InterText";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreenWeb() {
  const { cart, loading, updateQuantity, removeFromCart } = useCart();

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-gray-50">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView>
      <View className="flex-1 px-11 mt-[54px] mb-[86px]">
        <Text className="text-2xl font-semibold mb-6">My Cart</Text>
        {cart.length > 0 ? (
          <View className="flex-row gap-[17px] items-start">
            {/* Left Column: Cart Items */}
            <div className="border border-gray-200 rounded-xl overflow-hidden w-full flex-1 min-w-[789px]">
              <table className="border-collapse bg-white w-full">
                <thead>
                  <tr>
                    <th className="pl-7 w-[340px] py-3 border-b border-gray-200 text-left">
                      <InterText className="text-sm leading-5 text-[#667085] font-medium">
                        Product
                      </InterText>
                    </th>
                    <th className="w-[120px] py-3 border-b border-gray-200 text-left">
                      <InterText className="text-sm leading-5 text-[#667085] font-medium">
                        Quantity
                      </InterText>
                    </th>
                    <th className="w-[120px] py-3 border-b border-gray-200 text-left">
                      <InterText className="text-sm leading-5 text-[#667085] font-medium">
                        Subtotal
                      </InterText>
                    </th>
                    <th className="w-8 border-b border-gray-200">
                      <InterText className="text-sm leading-5 text-[#667085] font-medium"></InterText>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item: CartItem, idx) => {
                    const { product, variant, quantity } = item;
                    const image =
                      product.media?.find((m) => m.url)?.conversions?.[
                        "medium-square"
                      ] || product.media?.[0]?.url;
                    const variantNames = variant.variant_type_options
                      .map((v) => v.name)
                      .filter(Boolean);
                    const variantName =
                      variantNames.length > 0 ? variantNames.join(" | ") : "";
                    const subtotal =
                      Number(variant.price.formatted.replace(/[^\d.]/g, "")) *
                      quantity;
                    return (
                      <React.Fragment key={variant.id}>
                        <tr className="">
                          {/* Product */}
                          <td className="px-7 py-5">
                            <div className="flex flex-row items-center gap-4 min-w-0">
                              <img
                                src={image}
                                alt={product.title}
                                className="w-[84px] h-[84px] rounded-md object-cover flex-shrink-0"
                              />
                              <div className="ml-4 min-w-0">
                                <InterText className="font-medium text-sm max-w-[268px] truncate block">
                                  {product.title}
                                </InterText>
                                <InterText className="text-[#344054] text-sm font-medium mt-1 block">
                                  {variant.price.formatted}
                                </InterText>
                                {variantName && (
                                  <InterText className="text-gray-600 text-sm mt-1 truncate max-w-[120px] block">
                                    {variantName}
                                  </InterText>
                                )}
                              </div>
                            </div>
                          </td>
                          {/* Quantity */}
                          <td className="py-6">
                            <div className="flex items-center justify-left">
                              <QuantityInput
                                quantity={quantity}
                                setQuantity={(newQuantity: number) =>
                                  updateQuantity(variant.id, newQuantity)
                                }
                              />
                            </div>
                          </td>
                          {/* Subtotal */}
                          <td>
                            <InterText className="font-medium text-base text-blue-900 select-none">
                              €{subtotal.toFixed(2)}
                            </InterText>
                          </td>
                          {/* Remove */}
                          <td className="px-7">
                            <div className="flex items-center justify-end">
                              <button
                                onClick={() => removeFromCart(variant.id)}
                                aria-label={`Remove ${product.title} from cart`}
                                className="font-bold text-2xl hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                              >
                                <CancelIcon />
                              </button>
                            </div>
                          </td>
                        </tr>
                        {/* Insert <hr /> after each row except the last */}
                        {idx < cart.length - 1 && (
                          <tr>
                            <td colSpan={4} className="px-7 py-0">
                              <hr className="border-gray-200 my-0" />
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Right Column: Summary */}
            <View className="w-[386px] ml-8">
              <CartSummary />
            </View>
          </View>
        ) : (
          <View className="items-center justify-center min-h-screen">
            <InterText className="text-xl text-gray-600">
              Your cart is empty.
            </InterText>
          </View>
        )}
      </View>
      <Footer />
    </ScrollView>
  );
}
