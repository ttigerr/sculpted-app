import * as React from "react"
import Svg, { Path } from "react-native-svg"
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, strokeColor}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M17 2h-2V1a1 1 0 00-2 0v1H7V1a1 1 0 00-2 0v1H3a3 3 0 00-3 3v12a3 3 0 003 3h14a3 3 0 003-3V5a3 3 0 00-3-3zm1 15a1 1 0 01-1 1H3a1 1 0 01-1-1v-7h16v7zm0-9H2V5a1 1 0 011-1h2v1a1 1 0 002 0V4h6v1a1 1 0 002 0V4h2a1 1 0 011 1v3z"
        fill="#F4F4F4"
      />
    </Svg>
  )
}

export default SvgComponent