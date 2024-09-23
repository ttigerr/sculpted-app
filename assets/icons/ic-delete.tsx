import * as React from "react"
import Svg, { Path } from "react-native-svg"
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, strokeColor}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M11 8.662L7.368 5.216l3.63-3.444L9.133 0 5.5 3.445 1.867 0 0 1.772l3.631 3.444L0 8.661l1.868 1.77L5.5 6.988l3.631 3.445L11 8.662z"
        fill="#FF505A"
      />
    </Svg>
  )
}

export default SvgComponent
