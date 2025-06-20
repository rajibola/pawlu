import React from "react";
import { SvgXml } from "react-native-svg";

const xml = `
<svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 6L6 1L1 6" stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const ChevronUp = () => <SvgXml xml={xml} />;

export default ChevronUp;
