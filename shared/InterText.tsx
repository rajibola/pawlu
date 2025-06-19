import { Text, TextProps } from "react-native";

export default function InterText({ children, ...props }: TextProps) {
  return (
    <Text style={{ fontFamily: "Inter" }} {...props}>
      {children}
    </Text>
  );
}
