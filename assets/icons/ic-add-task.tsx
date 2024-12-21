import * as React from "react"
import Svg, { Path } from "react-native-svg"
import IconProps from 'src/modules/core/components/icon/types/iconTypes';
import { RFValue } from "react-native-responsive-fontsize";

function SvgComponent({width, height, fill, strokeColor}: IconProps) {
  return (
    <Svg
      width={RFValue(10)}
      height={RFValue(10)}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 0c.92 0 1.667.746 1.667 1.667v11.666a1.667 1.667 0 11-3.334 0V1.667C5.833.747 6.58 0 7.5 0z"
        fill="#fff"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 7.5c0 .92-.746 1.666-1.667 1.666H1.667a1.667 1.667 0 110-3.333h11.666c.92 0 1.667.746 1.667 1.667z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent