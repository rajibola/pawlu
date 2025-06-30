import { Store } from "@/assets/images/svgs/Store";
import { Truck } from "@/assets/images/svgs/Truck";
import { CartSummary } from "@/components/CartSummary";
import Dropdown from "@/components/Dropdown";
import TextInput from "@/components/TextInput";
import { Footer } from "@/shared/Footer";
import InterText from "@/shared/InterText";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

export default function Checkout() {
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

  const [deliveryMethod, setDeliveryMethod] = React.useState<"ship" | "pickup">(
    "ship"
  );
  const [shipToDifferent, setShipToDifferent] = React.useState(false);
  const [form, setForm] = React.useState<FormType>({
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
  const [errors, setErrors] = React.useState<ErrorsType>({});
  const [touched, setTouched] = React.useState<TouchedType>({});
  const [submitAttempted, setSubmitAttempted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const countryOptions = ["Malta", "Italy", "France", "Germany"];
  const stateOptions = ["State", "Gozo", "Valletta", "Mdina"];

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

  React.useEffect(() => {
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
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        const isSuccess = Math.random() > 0.3; // 70% chance of success
        if (isSuccess) {
          setSuccess(true);
          Alert.alert(
            "Order placed!",
            "Your order was submitted successfully."
          );
          // Optionally reset form here
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
      <View className="w-full max-w-[386px] mx-auto px-4">
        <CartSummary isCheckout />
      </View>

      <View className="flex-1 w-full max-w-[386px] mx-auto px-4 mb-10">
        <View className="bg-[#EAECF0] w-full h-[1px] my-10 -z-10" />
        <InterText className="text-2xl font-semibold mb-6">
          Billing Details
        </InterText>

        <View className="flex gap-6">
          <TextInput
            placeholder="Enter your first name"
            label="First name"
            value={form.firstName}
            onChange={(v) => setForm({ ...form, firstName: v })}
            onBlur={() => handleBlur("firstName")}
            error={
              ((touched.firstName || submitAttempted) && errors.firstName) || ""
            }
          />
          <TextInput
            placeholder="Enter your last name"
            label="Last name"
            value={form.lastName}
            onChange={(v) => setForm({ ...form, lastName: v })}
            onBlur={() => handleBlur("lastName")}
            error={
              ((touched.lastName || submitAttempted) && errors.lastName) || ""
            }
          />
          <TextInput
            placeholder="Enter your company name"
            label="Company"
            value={form.company}
            onChange={(v) => setForm({ ...form, company: v })}
          />
          <TextInput
            placeholder="Enter your VAT number"
            label="VAT number"
            value={form.vat}
            onChange={(v) => setForm({ ...form, vat: v })}
          />
          <TextInput
            placeholder="012334455"
            label="Phone number"
            value={form.phone}
            onChange={(v) => setForm({ ...form, phone: v })}
            onBlur={() => handleBlur("phone")}
            error={((touched.phone || submitAttempted) && errors.phone) || ""}
          />
          <Dropdown
            label="Country"
            options={countryOptions}
            value={form.country}
            onChange={(v) => setForm({ ...form, country: v })}
            error={
              ((touched.country || submitAttempted) && errors.country) || ""
            }
          />
          <TextInput
            placeholder="House number and street name"
            label="Address line 1"
            value={form.address1}
            onChange={(v) => setForm({ ...form, address1: v })}
            onBlur={() => handleBlur("address1")}
            error={
              ((touched.address1 || submitAttempted) && errors.address1) || ""
            }
          />
          <TextInput
            placeholder="Address line 2"
            label="Address line 2"
            value={form.address2}
            onChange={(v) => setForm({ ...form, address2: v })}
          />
          <TextInput
            placeholder="City"
            label="City"
            value={form.city}
            onChange={(v) => setForm({ ...form, city: v })}
            onBlur={() => handleBlur("city")}
            error={((touched.city || submitAttempted) && errors.city) || ""}
          />
          <Dropdown
            label="State"
            options={stateOptions}
            value={form.state}
            onChange={(v) => setForm({ ...form, state: v })}
            error={((touched.state || submitAttempted) && errors.state) || ""}
          />
          <TextInput
            placeholder="Zip code"
            label="Zip Code"
            value={form.zip}
            onChange={(v) => setForm({ ...form, zip: v })}
            onBlur={() => handleBlur("zip")}
            error={((touched.zip || submitAttempted) && errors.zip) || ""}
          />
        </View>
        <View className="bg-[#EAECF0] w-full h-[1px] my-10 -z-10" />
        <InterText className="text-xl font-semibold mb-4">Delivery</InterText>
        <View className="border rounded-xl p-6 mb-8 bg-white border-[#D0D5DD] h-[128px] flex flex-col justify-between">
          <TouchableOpacity
            className="flex-row items-center "
            onPress={() => setDeliveryMethod("ship")}
          >
            <View
              className={`w-4 h-4 rounded-full border-2 items-center justify-center mr-4 ${deliveryMethod === "ship" ? "border-[#AA8734]" : "border-[#D0D5DD]"}`}
            >
              {deliveryMethod === "ship" && (
                <View className="w-[6px] h-[6px] rounded-full bg-[#AA8734]" />
              )}
            </View>
            <InterText
              className={`text-base font-semibold mr-auto ${deliveryMethod === "ship" ? "text-[#101828]" : "text-[#667085]"}`}
            >
              Ship
            </InterText>
            <Truck stroke={deliveryMethod === "ship" ? "#101828" : "#98A2B3"} />
          </TouchableOpacity>
          <View className="border-t border-gray-200 m-0" />
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => setDeliveryMethod("pickup")}
          >
            <View
              className={`w-4 h-4 rounded-full border-2 items-center justify-center mr-4 ${deliveryMethod === "pickup" ? "border-[#AA8734]" : "border-[#D0D5DD]"}`}
            >
              {deliveryMethod === "pickup" && (
                <View className="w-[6px] h-[6px] rounded-full bg-[#AA8734]" />
              )}
            </View>
            <InterText
              className={`text-base font-semibold mr-auto ${deliveryMethod === "pickup" ? "text-[#101828]" : "text-[#667085]"}`}
            >
              Pickup in store
            </InterText>
            <Store
              stroke={deliveryMethod === "pickup" ? "#101828" : "#98A2B3"}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => setShipToDifferent((v) => !v)}
        >
          <View
            className={`w-4 h-4 border border-[#D0D5DD] rounded mr-2 bg-white items-center justify-center`}
          >
            {shipToDifferent && (
              <View className="w-2 h-2 bg-[#AA8734] rounded" />
            )}
          </View>
          <InterText className="text-sm font-semibold text-[#344054]">
            Ship to a different address?
          </InterText>
        </TouchableOpacity>
        <TouchableOpacity
          className={`w-full h-14 mt-[60px] rounded-lg ${isValid ? "bg-[#2E439C]" : "bg-gray-200"} text-gray-500 font-semibold text-lg items-center justify-center`}
          disabled={!isValid || loading}
          onPress={handleSubmit}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <InterText className="text-lg font-semibold text-white">
              Pay now
            </InterText>
          )}
        </TouchableOpacity>
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

      <Footer />
    </ScrollView>
  );
}
