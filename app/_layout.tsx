import { CartProvider } from "@/context/CartContext";
import { ErrorProvider } from "@/context/ErrorContext";
import { Header } from "@/shared/Header";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require("../assets/fonts/Inter-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ErrorProvider>
      <CartProvider>
        <SafeAreaView edges={["top"]} className="flex-1 bg-white">
          <Header />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: "white",
              },
            }}
          />
        </SafeAreaView>
      </CartProvider>
    </ErrorProvider>
  );
}
