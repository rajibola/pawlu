import React, { type ReactNode } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import { Edge, SafeAreaView } from "react-native-safe-area-context";

export const isIOS = (): boolean => Platform.OS === "ios";

export interface ScreenContainerProps extends ScrollViewProps {
  children?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  // Add control for padding
  withPadding?: boolean;
  paddingHorizontal?: number;
  paddingVertical?: number;
  // Add control for edges
  edges?: Edge[];
  // Add control for status bar
  statusBarStyle?: "light-content" | "dark-content";
  hideStatusBar?: boolean;
  // Add control for background color
  backgroundColor?: string;
  // Add loading state
  isLoading?: boolean;
  // Add scroll capability flag
  scrollable?: boolean;
  // Add keyboard handling
  keyboardShouldAvoidView?: boolean;
}

export const edgesHorizontal = ["left", "right"] as Edge[];
export const edgesVertical = ["top", "bottom"] as Edge[];

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  containerStyle,
  contentStyle,
  contentContainerStyle,
  withPadding = true,
  paddingHorizontal = 14,
  paddingVertical = 0,
  edges = ["left", "right", "top"],
  isLoading = false,
  scrollable = false,
  keyboardShouldAvoidView = false,
  bounces = true,
  showsVerticalScrollIndicator = true,
  ...rest
}) => {
  // Calculate padding based on props and insets
  const padding = {
    paddingHorizontal: withPadding ? paddingHorizontal : 0,
    paddingVertical: withPadding ? paddingVertical : 0,
  };

  // Determine the content component based on scrollable prop
  const ContentWrapper = scrollable ? ScrollView : View;

  // Keyboard avoiding view for iOS
  const KeyboardWrapper =
    keyboardShouldAvoidView && Platform.OS === "ios"
      ? KeyboardAvoidingView
      : View;

  return (
    <SafeAreaView
      className="flex-1 bg-[#f5f5f5]"
      style={containerStyle}
      edges={edges}
    >
      <KeyboardWrapper
        className="flex-1"
        behavior={isIOS() ? "padding" : undefined}
      >
        <ContentWrapper
          className="flex-1"
          style={[padding, contentStyle]}
          contentContainerStyle={[
            { flexGrow: 1 },
            scrollable ? contentContainerStyle : {},
          ]}
          bounces={bounces}
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          {...(scrollable ? rest : {})}
        >
          {children}
        </ContentWrapper>
      </KeyboardWrapper>

      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#4472C4" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ScreenContainer;
