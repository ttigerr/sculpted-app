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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 1.639a7.362 7.362 0 100 14.723A7.362 7.362 0 009 1.639zM.3 9a8.7 8.7 0 1117.4 0A8.7 8.7 0 01.3 9z"
        fill="#FDDF38"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.562 6.762a.298.298 0 010 .42l-4.514 4.515a.298.298 0 01-.421 0L5.344 9.413a.297.297 0 010-.42l.525-.526a.297.297 0 01.421 0l1.547 1.547 3.778-3.778a.298.298 0 01.42 0l.527.526z"
        fill="#FDDF38"
      />
    </Svg>
  )
}

export default SvgComponent