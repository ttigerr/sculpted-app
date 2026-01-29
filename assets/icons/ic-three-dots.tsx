import * as React from "react"
import Svg, { Circle } from "react-native-svg"
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, strokeColor}: IconProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={26}
      height={26}
      viewBox="0 0 26 26"
      fill="none"
    >
      <Circle cx={6.7602} cy={12.9999} r={1.56} fill="#9F9B9B" />
      <Circle cx={12.9999} cy={12.9999} r={1.56} fill="#9F9B9B" />
      <Circle cx={19.2402} cy={12.9999} r={1.56} fill="#9F9B9B" />
      <Circle cx={13} cy={13} r={12.5} stroke="#9F9B9B" />
    </Svg>
  )
}

export default SvgComponent