import * as React from "react"
import Svg, { G, Circle, Path, Defs } from "react-native-svg"
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, strokeColor}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G filter="url(#filter0_b_756_3729)">
        <Circle cx={7} cy={7.21436} r={6.375} fill="#fff" fillOpacity={0.32} />
      </G>
      <Path
        d="M7 4.24v5.95M9.975 7.214h-5.95"
        stroke="#fff"
        strokeLinecap="round"
      />
      <Defs></Defs>
    </Svg>
  )
}

export default SvgComponent