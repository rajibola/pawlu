import { Path, Svg, SvgProps } from "react-native-svg";

export const Heart = (props: SvgProps) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M21 8.5C21 6.01472 18.9013 4 16.3125 4C14.3769 4 12.7153 5.12628 12 6.73342C11.2847 5.12628 9.62312 4 7.6875 4C5.09867 4 3 6.01472 3 8.5C3 15.7206 12 20.5 12 20.5C12 20.5 21 15.7206 21 8.5Z"
      stroke="#667085"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
