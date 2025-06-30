import { Store } from "@/assets/images/svgs/Store";
import { Truck } from "@/assets/images/svgs/Truck";
import Button from "@/components/Button";
import { CartSummary } from "@/components/CartSummary";
import Dropdown from "@/components/Dropdown";
import TextInput from "@/components/TextInput.web";
import { Footer } from "@/shared/Footer";
import InterText from "@/shared/InterText";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function CheckoutWeb() {
  type FormType = {
    firstName: string;
    lastName: string;
    company: string;
    vat: string;
    phone: string;
    country: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
  };
  type ErrorsType = Partial<Record<keyof FormType, string>>;
  type TouchedType = Partial<Record<keyof FormType, boolean>>;

  const [deliveryMethod, setDeliveryMethod] = useState<"ship" | "pickup">(
    "ship"
  );
  const [form, setForm] = useState<FormType>({
    firstName: "",
    lastName: "",
    company: "",
    vat: "",
    phone: "",
    country: "Malta",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });
  const [errors, setErrors] = useState<ErrorsType>({});
  const [touched, setTouched] = useState<TouchedType>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const countryOptions = ["Malta", "Italy", "France"];
  const stateOptions = ["State 1", "State 2", "State 3"];
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function validate(form: FormType): ErrorsType {
    const newErrors: ErrorsType = {};
    if (!form.firstName) newErrors.firstName = "First name is required";
    if (!form.lastName) newErrors.lastName = "Last name is required";
    if (!form.phone) newErrors.phone = "Phone number is required";
    if (!form.address1) newErrors.address1 = "Address line 1 is required";
    if (!form.city) newErrors.city = "City is required";
    if (!form.state) newErrors.state = "State is required";
    if (!form.zip) newErrors.zip = "Zip code is required";
    return newErrors;
  }

  useEffect(() => {
    setErrors(validate(form));
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  function handleBlur(field: keyof FormType) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function handleSubmit() {
    setSubmitAttempted(true);
    setTouched({
      firstName: true,
      lastName: true,
      phone: true,
      address1: true,
      city: true,
      state: true,
      zip: true,
    });
    if (isValid) {
      setLoading(true);
      setErrorMsg("");
      setSuccess(false);
      setTimeout(() => {
        setLoading(false);
        const isSuccess = Math.random() > 0.3;
        if (isSuccess) {
          setSuccess(true);
          Alert.alert(
            "Order placed!",
            "Your order was submitted successfully."
          );
        } else {
          setErrorMsg("Order failed. Please try again.");
          Alert.alert(
            "Order failed",
            "There was a problem submitting your order. Please try again."
          );
        }
      }, 1500);
    }
  }

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
              value={form.firstName}
              onChange={(v) => setForm({ ...form, firstName: v })}
              onBlur={() => handleBlur("firstName")}
              error={
                ((touched.firstName || submitAttempted) && errors.firstName) ||
                ""
              }
              name="firstName"
            />
            <TextInput
              label="Last name"
              placeholder="Enter your last name"
              value={form.lastName}
              onChange={(v) => setForm({ ...form, lastName: v })}
              onBlur={() => handleBlur("lastName")}
              error={
                ((touched.lastName || submitAttempted) && errors.lastName) || ""
              }
              name="lastName"
            />
          </View>
          <View className="flex flex-col gap-6 mt-6">
            <TextInput
              label="Company"
              placeholder="Enter your company name"
              value={form.company}
              onChange={(v) => setForm({ ...form, company: v })}
              name="company"
            />
            <TextInput
              label="VAT number"
              placeholder="Enter your VAT number"
              value={form.vat}
              onChange={(v) => setForm({ ...form, vat: v })}
              name="vatNumber"
            />
            <TextInput
              label="Phone number"
              placeholder="012334455"
              value={form.phone}
              onChange={(v) => setForm({ ...form, phone: v })}
              onBlur={() => handleBlur("phone")}
              error={((touched.phone || submitAttempted) && errors.phone) || ""}
              name="phoneNumber"
            />
            <Dropdown
              label="Country"
              options={countryOptions}
              value={form.country}
              onChange={(v) => setForm({ ...form, country: v })}
              error={
                ((touched.country || submitAttempted) && errors.country) || ""
              }
              name="country"
            />
            <TextInput
              label="Address line 1"
              placeholder="House number and street name"
              value={form.address1}
              onChange={(v) => setForm({ ...form, address1: v })}
              onBlur={() => handleBlur("address1")}
              error={
                ((touched.address1 || submitAttempted) && errors.address1) || ""
              }
              name="address1"
            />
            <TextInput
              label="Address line 2"
              placeholder="House number and street name"
              value={form.address2}
              onChange={(v) => setForm({ ...form, address2: v })}
              name="address2"
            />
            <View className="grid grid-cols-3 gap-4">
              <TextInput
                label="City"
                placeholder="City"
                value={form.city}
                onChange={(v) => setForm({ ...form, city: v })}
                onBlur={() => handleBlur("city")}
                error={((touched.city || submitAttempted) && errors.city) || ""}
                name="city"
              />
              <Dropdown
                label="State"
                options={stateOptions}
                value={form.state}
                onChange={(v) => setForm({ ...form, state: v })}
                error={
                  ((touched.state || submitAttempted) && errors.state) || ""
                }
                name="state"
              />
              <TextInput
                label="Zip Code"
                placeholder="Zip code"
                value={form.zip}
                onChange={(v) => setForm({ ...form, zip: v })}
                onBlur={() => handleBlur("zip")}
                error={((touched.zip || submitAttempted) && errors.zip) || ""}
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
          <Button
            onPress={handleSubmit}
            loading={loading}
            disabled={!isValid}
            fullWidth
            accessibilityLabel="Pay now"
            accessibilityHint="Submit your order"
            className="mt-[60px]"
          >
            Pay now
          </Button>
          {success && (
            <InterText className="text-green-700 text-center mt-4">
              Order placed successfully!
            </InterText>
          )}
          {!!errorMsg && (
            <InterText className="text-red-600 text-center mt-4">
              {errorMsg}
            </InterText>
          )}
        </View>
        <View className="w-[386px]">
          <CartSummary isCheckout />
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}
