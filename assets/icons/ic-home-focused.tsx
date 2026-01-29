import * as React from "react"
import { RFValue } from "react-native-responsive-fontsize";
import Svg, { Path } from "react-native-svg"
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 30 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.95 1.325a4.933 4.933 0 016.367 0l9.411 7.951a5.466 5.466 0 011.939 4.176v12.354a5.467 5.467 0 01-5.467 5.466h-4.267A1.733 1.733 0 0118.2 29.54v-7.067h-6.4v7.067c0 .957-.776 1.733-1.733 1.733h-4A5.467 5.467 0 01.6 25.806V13.452c0-1.61.71-3.137 1.939-4.176l9.41-7.951z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
