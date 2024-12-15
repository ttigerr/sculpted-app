import * as React from "react"
import Svg, { Path } from "react-native-svg"
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, strokeColor}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 15 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M10.822 5.707c2.003 0 3.628 1.589 3.628 3.548v4.197c0 1.96-1.625 3.548-3.628 3.548H3.628C1.625 17 0 15.411 0 13.452V9.255c0-1.96 1.625-3.548 3.628-3.548h7.194zM7.22 9.677a.744.744 0 00-.752.735v1.875c0 .414.337.743.752.743.423 0 .76-.33.76-.743v-1.875a.746.746 0 00-.76-.735z"
        fill="#F4F4F4"
      />
      <Path
        opacity={0.4}
        d="M11.92 4.587v1.25a3.53 3.53 0 00-.95-.127h-.562V4.587c0-1.715-1.425-3.109-3.179-3.109-1.753 0-3.178 1.385-3.187 3.092v1.14H3.49c-.337 0-.657.042-.96.135V4.587C2.54 2.053 4.639 0 7.213 0c2.609 0 4.707 2.053 4.707 4.587z"
        fill="#F4F4F4"
      />
    </Svg>
  )
}

export default SvgComponent