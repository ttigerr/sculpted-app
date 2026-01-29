import * as React from "react"
import Svg, { Path } from "react-native-svg"
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, strokeColor}: IconProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.667 5.333A4.667 4.667 0 015.333.667h9.334a4.667 4.667 0 014.666 4.666v9.334a4.667 4.667 0 01-4.666 4.666H5.333a4.667 4.667 0 01-4.666-4.666V5.333zM5.333 2A3.333 3.333 0 002 5.333v9.334A3.333 3.333 0 005.333 18h9.334A3.333 3.333 0 0018 14.667V5.333A3.333 3.333 0 0014.667 2H5.333z"
        fill="#fff"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 6c-.807 0-1.48.574-1.634 1.335-.036.18-.182.332-.366.332h-.667c-.184 0-.335-.15-.315-.333a3 3 0 114.605 2.856c-.283.183-.536.382-.713.593-.175.208-.243.388-.243.55v.334c0 .184-.15.333-.334.333h-.666a.333.333 0 01-.334-.333v-.334c0-.574.253-1.046.555-1.406.3-.357.677-.642 1.013-.858A1.667 1.667 0 0010 6zm-.333 9.333A.333.333 0 019.333 15v-.667c0-.184.15-.333.334-.333h.666c.184 0 .334.15.334.333V15c0 .184-.15.333-.334.333h-.666z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
