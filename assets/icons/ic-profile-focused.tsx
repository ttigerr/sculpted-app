import * as React from "react"
import Svg, { Path } from "react-native-svg"
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, strokeColor}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 30 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.915 24.948c0 4.977-6.824 5.552-11.956 5.552h-.367C8.322 30.492 0 30.285 0 24.918c0-4.874 6.55-5.526 11.643-5.55h.683c3.27.007 11.589.213 11.589 5.58zM11.959.5c4.42 0 8.015 3.596 8.015 8.017 0 4.42-3.594 8.015-8.015 8.015h-.048c-4.412-.013-7.986-3.611-7.97-8.02C3.94 4.096 7.536.5 11.958.5z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent