import { Header } from "@/components/Header";
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
  );
}
