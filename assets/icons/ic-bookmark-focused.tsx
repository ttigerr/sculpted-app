import * as React from "react"
import Svg, { Path } from "react-native-svg"
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, fill, strokeColor}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        clipRule="evenodd"
        d="M30.474 9.07c0-4.333-2.962-6.07-7.227-6.07H13.232C9.098 3 6 4.618 6 8.78v23.19a1.495 1.495 0 002.226 1.305l10.052-5.639 9.965 5.63a1.496 1.496 0 002.23-1.303V9.069z"
        stroke="#fff"
        strokeWidth={2.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity={0.4}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.23 13.015a.6.6 0 01.6-.6h12.69a.6.6 0 01.6.6v1.5a.6.6 0 01-.6.6H11.83a.6.6 0 01-.6-.6v-1.5z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent