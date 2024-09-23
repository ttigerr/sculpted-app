import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, strokeColor}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Circle cx={9.5} cy={9.5} r={9} stroke="#F4F4F4" />
      <Path
        d="M10.474 11.718H9.197c0-.83.297-1.575.892-2.233.055-.061.23-.243.522-.547.302-.314.499-.532.59-.653.101-.132.21-.33.33-.593.128-.263.192-.517.192-.76 0-.496-.155-.88-.467-1.154-.31-.274-.723-.41-1.235-.41-1.007 0-1.653.49-1.936 1.473L7 6.173c.22-.69.6-1.22 1.14-1.596C8.689 4.192 9.32 4 10.034 4c.806 0 1.502.253 2.087.76.586.496.879 1.2.879 2.112 0 .79-.297 1.514-.892 2.172-.046.05-.188.203-.426.456a6.02 6.02 0 00-.824 1.003 2.11 2.11 0 00-.302.607 2.2 2.2 0 00-.082.608zM9.828 15a.82.82 0 01-.631-.289 1.005 1.005 0 01-.261-.699c0-.273.087-.506.26-.699a.82.82 0 01.632-.288c.257 0 .467.096.632.288.174.193.26.426.26.7 0 .273-.086.506-.26.698a.794.794 0 01-.632.289z"
        fill="#F4F4F4"
      />
    </Svg>
  )
}

export default SvgComponent
