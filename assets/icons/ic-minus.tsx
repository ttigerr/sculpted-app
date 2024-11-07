import * as React from "react"
import Svg, { Path } from "react-native-svg";
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, strokeColor}: IconProps) {
  return (
    <Svg
      width={7}
      height={4}
      viewBox="0 0 7 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path d="M0 .5h6.984v2.592H0V.5z" fill="#B3B3B3" />
    </Svg>
  )
}

export default SvgComponent