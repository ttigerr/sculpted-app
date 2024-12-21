import * as React from "react"
import Svg, { Path } from "react-native-svg"
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, fill ,strokeColor}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M8.911 9.286L5.29 5.66 1.666 9.286l-.809-.808 3.629-3.62L.857 1.236l.81-.808 3.622 3.626L8.91.435l.804.802-3.623 3.62 3.623 3.62-.804.809z"
        fill={fill}
      />
    </Svg>
  )
}

export default SvgComponent