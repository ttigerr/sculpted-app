import * as React from "react"
import Svg, { Path } from "react-native-svg"
import IconProps from 'src/modules/core/components/icon/types/iconTypes';


function SvgComponent({width, height, strokeColor}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 11 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M2 2l7 7-7 7"
        stroke="#F4F4F4"
        strokeOpacity={0.17}
        strokeWidth={2}
        strokeLinecap="square"
      />
    </Svg>
  )
}

export default SvgComponent