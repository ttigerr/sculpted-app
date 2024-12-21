import * as React from "react"
import Svg, { Path } from "react-native-svg"
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, strokeColor}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M2 2.5a.5.5 0 01.5-.5H9V0H2a2 2 0 00-2 2v14a2 2 0 002 2h7v-2H2.5a.5.5 0 01-.5-.5v-13zM18 9l-4-4v3H6v2h8v3l4-4z"
        fill="#F4F4F4"
      />
    </Svg>
  )
}

export default SvgComponent
