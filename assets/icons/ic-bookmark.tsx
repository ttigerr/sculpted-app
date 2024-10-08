import * as React from "react"
import Svg, { Path } from "react-native-svg"
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, fill, strokeColor}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 50 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        clipRule="evenodd"
        d="M42.325 12.72c0-6.017-4.114-8.43-10.038-8.43h-13.91c-5.741 0-10.044 2.249-10.044 8.03v32.208c0 1.587 1.709 2.587 3.092 1.811l13.961-7.831 13.84 7.818c1.386.78 3.099-.22 3.099-1.81V12.722z"
        stroke={strokeColor}
        strokeWidth={3.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity={0.4}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.598 18.201c0-.46.373-.833.834-.833h17.623c.46 0 .833.373.833.833v2.083c0 .46-.373.834-.833.834H16.432a.833.833 0 01-.834-.834v-2.083z"
        fill={fill}
      />
    </Svg>
  )
}

export default SvgComponent