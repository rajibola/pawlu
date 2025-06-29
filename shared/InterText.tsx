import { Text, TextProps } from "react-native";

export default function InterText({
  children,
  ...props
}: TextProps & { className?: string }) {
  return (
    <Text
      style={{ fontFamily: "Inter" }}
      {...props}
      className={`${props.className} text-[#101828]`}
    >
      {children}
    </Text>
  );
}
