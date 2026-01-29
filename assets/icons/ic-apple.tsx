import * as React from "react"
import { RFValue } from "react-native-responsive-fontsize";
import Svg, { Path } from "react-native-svg"
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width = RFValue(20), height = RFValue(23) }: IconProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 21 24"
      fill="none"
    >
      <Path
        d="M15.655 21.84c-1.151 1.128-2.407.95-3.617.415-1.28-.546-2.454-.57-3.805 0-1.69.737-2.583.523-3.593-.416C-1.09 15.862-.245 6.76 6.26 6.427c1.586.083 2.69.879 3.617.95 1.386-.285 2.713-1.105 4.192-.998 1.773.143 3.112.856 3.993 2.14-3.664 2.221-2.795 7.105.563 8.472-.669 1.782-1.538 3.553-2.982 4.86l.012-.012zM9.76 6.354c-.176-2.65 1.95-4.836 4.392-5.05.34 3.066-2.748 5.347-4.392 5.05z"
        fill="#F5F5F5"
      />
    </Svg>
  )
}

export default SvgComponent