import { Path, Svg, SvgProps } from "react-native-svg";

export const Previous = (props: SvgProps) => {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.2324 4.18414C10.4621 4.423 10.4546 4.80282 10.2158 5.0325L7.06557 8L10.2158 10.9675C10.4546 11.1972 10.4621 11.577 10.2324 11.8159C10.0027 12.0547 9.6229 12.0622 9.38404 11.8325L5.78404 8.4325C5.66639 8.31938 5.5999 8.16321 5.5999 8C5.5999 7.83679 5.66639 7.68062 5.78404 7.5675L9.38404 4.1675C9.6229 3.93782 10.0027 3.94527 10.2324 4.18414Z"
        fill="#667085"
      />
    </Svg>
  );
};
