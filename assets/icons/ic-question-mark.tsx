import * as React from "react"
import Svg, { Path } from "react-native-svg"
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, strokeColor}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.5 16a8 8 0 100-16 8 8 0 000 16zm.36-6.435c.004-.28.027-.486.069-.618.066-.21.2-.393.403-.55l.371-.288c.377-.293.632-.534.765-.722.227-.31.34-.693.34-1.147 0-.74-.262-1.298-.785-1.675C9.503 4.188 8.848 4 8.06 4c-.6 0-1.106.133-1.518.398-.653.415-1 1.12-1.042 2.115h1.513c0-.29.084-.57.251-.838.171-.269.459-.403.864-.403.412 0 .694.11.848.33.157.216.235.457.235.722 0 .23-.07.442-.209.634a1.335 1.335 0 01-.304.308l-.382.299c-.377.293-.61.553-.701.78-.09.223-.147.63-.168 1.22h1.414zm-1.45 2.23h1.56v-1.513H7.41v1.512z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
